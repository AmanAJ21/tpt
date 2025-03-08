<?php
include './config.php';

class UserProfile
{
    private $dbconn;

    public function __construct($dbconn)
    {
        $this->dbconn = $dbconn;
    }

    public function addProfile($data)
    {
        $email = pg_escape_string($data['user']);
        $name = pg_escape_string($data['name'] ?: 'null');
        $cname = pg_escape_string($data['cname'] ?: 'null');
        $mob = pg_escape_string($data['mob'] ?: 'null');
        $add = pg_escape_string($data['add'] ?: 'null');

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql = "UPDATE users SET name = $1, cname = $2, add = $3, num = $4 WHERE email = $5";
            $stmt = pg_prepare($this->dbconn, "update_profile", $sql);
            if ($stmt) {
                $result = pg_execute($this->dbconn, "update_profile", array($name, $cname, $add, $mob, $email));
                return ($result) ? "Profile updated successfully." : "Error updating profile.";
            }
            return "Error preparing statement.";
        }
        return "Invalid email format.";
    }

    
    public function getProfile($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql = "SELECT name, cname, add, num FROM users WHERE email = $1";
            $stmt = pg_prepare($this->dbconn, "get_profile", $sql);
            if ($stmt) {
                $result = pg_execute($this->dbconn, "get_profile", array($email));
                if ($row = pg_fetch_assoc($result)) {
                    return json_encode($row);
                }
                return json_encode([]);
            }
            return json_encode([]);
        }
        return "Invalid email format.";
    }
    

    public function getGraphData($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql = "SELECT TO_CHAR(date_trunc('day', date), 'DD-MM-YYYY') AS day, COUNT(*) AS count 
                    FROM usars WHERE users = $1 GROUP BY day ORDER BY day;";
            $stmt = pg_prepare($this->dbconn, "get_graph_data", $sql);
            if ($stmt) {
                $result = pg_execute($this->dbconn, "get_graph_data", array($email));
                $graphData = [];
                while ($row = pg_fetch_assoc($result)) {
                    $graphData[] = [
                        'x' => $row['day'],
                        'y' => intval($row['count'])
                    ];
                }
                return json_encode(array_slice($graphData, 0, -1)); // Exclude the last entry
            }
            return json_encode([]);
        }
        return "Invalid email format.";
    }

    public function getRemainingBalance($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql = "SELECT SUM(bal) AS total_price FROM usars WHERE rbal='0' AND users=$1";
            $stmt = pg_prepare($this->dbconn, "get_remaining_balance", $sql);
            if ($stmt) {
                $result = pg_execute($this->dbconn, "get_remaining_balance", array($email));
                if ($row = pg_fetch_row($result)) {
                    return intval($row[0]);
                }
                return 0; // No balance found
            }
            return 0; // Error in query
        }
        return "Invalid email format.";
    }

    public function updatePassword($email, $oldPassword, $newPassword)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Check current password
            $stmt = pg_prepare($this->dbconn, "check_password", "SELECT * FROM users WHERE email=$1 AND password=$2");
            if ($stmt) {
                $res = pg_execute($this->dbconn, "check_password", array($email, $oldPassword));
                if (pg_num_rows($res) == 1) {
                    // Update password
                    $stmt = pg_prepare($this->dbconn, "update_password", "UPDATE users SET password=$1 WHERE email=$2");
                    if ($stmt) {
                        pg_execute($this->dbconn, "update_password", array($newPassword, $email));
                        return 'Password updated successfully.';
                    }
                    return "Error preparing password update statement.";
                } else {
                    return "Current password is incorrect.";
                }
            }
            return "Error preparing password check statement.";
        }
        return "Invalid email format.";
    }
}

// Usage example:
$userProfile = new UserProfile($dbconn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($_POST['data']) {
        case 'add':
            echo json_encode($userProfile->addProfile($_POST));
            break;
        case 'update':
            echo json_encode($userProfile->addProfile($_POST));
            break;

        case 'all':
            echo $userProfile->getProfile($_POST['user']);
            break;

        case 'graph':
            echo $userProfile->getGraphData($_POST['user']);
            break;

        case 'remain':
            echo json_encode( $userProfile->getRemainingBalance($_POST['user']));
            break;

        case 'pwd':
            echo json_encode( $userProfile->updatePassword($_POST['user'], $_POST['pwd'], $_POST['npwd']));
            break;

        default:
            echo json_encode(["error" => "Invalid action."]);
            break;
    }
}

pg_close($dbconn);
?>