<?php 
include './config.php';

function addEntry($dbconn) {
    // Escape user input
    $user = pg_escape_string($_POST['user']);
    $srno = pg_escape_string($_POST['srno']);
    $from = pg_escape_string($_POST['from'] ?: 'null');
    $tname = pg_escape_string($_POST['tname'] ?: 'null');
    $to = pg_escape_string($_POST['to'] ?: 'null');
    $vnum = pg_escape_string($_POST['vnum'] ?: 'null');
    $rate = pg_escape_string($_POST['rate'] ?: 'null');
    $bal = pg_escape_string($_POST['bal'] ?: '0');
    $date = pg_escape_string($_POST['date'] ?: '01-01-1111');
    $oname = pg_escape_string($_POST['oname'] ?: 'null');
    $size = pg_escape_string($_POST['size'] ?: 'null');
    $adv = pg_escape_string($_POST['adv'] ?: 'null');
    $other = pg_escape_string($_POST['other'] ?: 'null');
    $rbal = isset($_POST['rbal']) && !empty($_POST['rbal']) ? (int) $_POST['rbal'] : 0;
    $dbal = pg_escape_string($_POST['dbal'] ?: 'null');

    // Check for duplicate entry based on srno
    $checkSql = "SELECT COUNT(*) FROM usars WHERE srno = '$srno'";
    $checkResult = pg_query($dbconn, $checkSql);
    
    if (!$checkResult) {
        echo "Error checking for duplicates: " . pg_last_error($dbconn);
        return;
    }

    $rowCount = pg_fetch_result($checkResult, 0, 0);
    
    if ($rowCount > 0) {
        // Duplicate entry found
        echo "duplicate"; // Indicate that the entry already exists
        return;
    }

    // If no duplicates, proceed with insertion
    $sql = "INSERT INTO usars (users, srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal) 
            VALUES ('$user', '$srno', '$from', '$tname', '$to', '$vnum', '$rate', '$bal', '$date', '$oname', '$size', '$adv', '$other', '$rbal', '$dbal')";

    $result = pg_query($dbconn, $sql);
    
    if ($result) {
        echo 1; // Indicate success
    } else {
        echo "Error adding entry: " . pg_last_error($dbconn);
    }
}

function deleteEntry($dbconn) {
    $user = pg_escape_string($_POST['user']);
    $srno = pg_escape_string($_POST['srno']);

    $sql = "DELETE FROM usars WHERE srno = '$srno' AND users = '$user'";
    $result = pg_query($dbconn, $sql);

    if ($result) {
        echo pg_affected_rows($result);
    } else {
        echo "Error deleting entry: " . pg_last_error($dbconn);
    }
}

function searchEntry($dbconn) {
    $user = pg_escape_string($_POST['user']);
    $srno = pg_escape_string($_POST['srno']);

    $sql = "SELECT srno,from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
            FROM usars WHERE srno = '$srno' AND users = '$user'";
    $result = pg_query($dbconn, $sql);

    if ($result) {
        $log = pg_fetch_row($result);
        echo json_encode($log);
    } else {
        echo "Error searching entry: " . pg_last_error($dbconn);
    }
}

function checkSrNo($dbconn) {
    $user = pg_escape_string($_POST['user']);
    $srno = pg_escape_string($_POST['srno']);

    $sql = "SELECT srno FROM usars WHERE srno = '$srno' AND users = '$user'";
    $result = pg_query($dbconn, $sql);

    if ($result) {
        $log = pg_fetch_row($result);
        echo $log ? $log[0] : '0';
    } else {
        echo "Error checking Sr.No: " . pg_last_error($dbconn);
    }
}

function updateEntry($dbconn) {
    $user = pg_escape_string($_POST['user']);
    $srno = pg_escape_string($_POST['srno']);
    $from = pg_escape_string($_POST['from'] ?: 'null');
    $tname = pg_escape_string($_POST['tname'] ?: 'null');
    $to = pg_escape_string($_POST['to'] ?: 'null');
    $vnum = pg_escape_string($_POST['vnum'] ?: 'null');
    $rate = pg_escape_string($_POST['rate'] ?: 'null');
    $bal = pg_escape_string($_POST['bal'] ?: '0');
    $date = pg_escape_string($_POST['date'] ?: '01-01-1111');
    $oname = pg_escape_string($_POST['oname'] ?: 'null');
    $size = pg_escape_string($_POST['size'] ?: 'null');
    $adv = pg_escape_string($_POST['adv'] ?: 'null');
    $other = pg_escape_string($_POST['other'] ?: 'null');
    $rbal = isset($_POST['rbal']) && !empty($_POST['rbal']) ? (int) $_POST['rbal'] : 0;
    $dbal = pg_escape_string($_POST['dbal'] ?: 'null');

    $sql = "UPDATE usars SET from_ = '$from', tname = '$tname', to_ = '$to', vnum = '$vnum', rate = '$rate', 
            bal = '$bal', date = '$date', oname = '$oname', size = '$size', adv = '$adv', other = '$other', 
            rbal = '$rbal', dbal = '$dbal' WHERE srno = '$srno' AND users = '$user'";

    $result = pg_query($dbconn, $sql);
    if ($result) {
        echo pg_affected_rows($result);
    } else {
        echo "Error updating entry: " . pg_last_error($dbconn);
    }
}

// Main logic to handle requests
if (isset($_POST['data'])) {
    switch ($_POST['data']) {
        case 'add':
            addEntry($dbconn);
            break;
        case 'delete':
            deleteEntry($dbconn);
            break;
        case 'sea':
            searchEntry($dbconn);
            break;
        case 'change':
            checkSrNo($dbconn);
            break;
        case 'update':
            updateEntry($dbconn);
            break;
        default:
            echo "Invalid request";
    }
} else {
    echo "No data received";
}

pg_close($dbconn);
?>