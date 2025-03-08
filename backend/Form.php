<?php

include "./config.php";
require("PHPMailer/src/PHPMailer.php");
require("PHPMailer/src/SMTP.php");
require("PHPMailer/src/Exception.php");

class UserAuth
{
    private $dbconn;

    public function __construct($dbconn)
    {
        $this->dbconn = $dbconn;
    }

    public function createUser($email, $pwd, $rpwd)
    {
        if ($pwd !== $rpwd || empty($pwd)) {
            return "Passwords do not match.";
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format.";
        }

        // Check if user already exists
        $stmt = pg_prepare($this->dbconn, "check_user", "SELECT * FROM users WHERE email = $1");
        $result = pg_execute($this->dbconn, "check_user", array($email));

        if (pg_num_rows($result) > 0) {
            return "Account already exists.";
        }

        // Insert new user
        $stmt = pg_prepare($this->dbconn, "insert_user", "INSERT INTO users (email, password) VALUES ($1, $2)");
        $data = pg_execute($this->dbconn, "insert_user", array($email, $pwd));

        return ($data) ? "User created successfully." : "Error creating user.";
    }

    public function loginUser($email, $pwd)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format.";
        }

        // Check user credentials
        $stmt = pg_prepare($this->dbconn, "login_user", "SELECT * FROM users WHERE email = $1 AND password = $2");
        $data = pg_execute($this->dbconn, "login_user", array($email, $pwd));

        return (pg_num_rows($data) > 0) ? "Login successful." : "Invalid credentials.";
    }

    public function resetPassword($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return "Invalid email format.";
        }

        // Check if user exists
        $stmt = pg_prepare($this->dbconn, "check_user_reset", "SELECT * FROM users WHERE email = $1");
        $result = pg_execute($this->dbconn, "check_user_reset", array($email));

        if (pg_num_rows($result) === 0) {
            return "No account associated with this email.";
        }

        // Generate new password and send email
        $newPassword = $this->generateRandomString();

        // Send email with new password
        if ($this->sendEmail($email, $newPassword)) {
            // Update password in database
            $stmt = pg_prepare($this->dbconn, "update_password", "UPDATE users SET password = $1 WHERE email = $2");
            pg_execute($this->dbconn, "update_password", array($newPassword, $email));
            return "New password sent to your email.";
        } else {
            return "Failed to send email.";
        }
    }

    private function sendEmail($toEmail, $newPassword)
    {
        $mail = new PHPMailer\PHPMailer\PHPMailer();

        try {
            $mail->isSMTP();
            $mail->SMTPDebug = 0;
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'ssl';
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 465;
            $mail->isHTML(true);
            $mail->Username = '2710amanj@gmail.com'; // Replace with your email
            $mail->Password = 'lcws fmrf ymvz fwjl'; // Replace with your email password
            $mail->setFrom('2710amanj@gmail.com', 'Transport'); // Replace with your name
            $mail->Subject = 'New Password for Transport';
            $mail->Body = "
            <div  style='margin: 0 auto 0 auto;
            padding:20px 5px;
            box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
            border-radius: 20px;
            background-color: whitesmoke;
            backdrop-filter: blur(2px);
            text-align: center;
            height: 40%;
            width: 30%;'>
                    <h2> Your new password for<br> $toEmail<br> is</h2>
                    <h1> $newPassword</h1>
                    <a href='#' style='text-decoration: none;'>Log In</a>
            </div>";
            $mail->addAddress($toEmail);

            return $mail->send();

        } catch (Exception $e) {
            return false;
        }
    }

    private function generateRandomString($length = 10)
    {
        return substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / 62))), 1, $length);
    }
}

// Usage example:
$userAuth = new UserAuth($dbconn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['create'])) {
        echo $userAuth->createUser($_POST['user'], $_POST['pwd'], $_POST['rpwd']);
    } elseif (isset($_POST['login'])) {
        echo $userAuth->loginUser($_POST['user'], $_POST['pwd']);
    } elseif (isset($_POST['reset'])) {
        echo $userAuth->resetPassword($_POST['user']);
    }
}

pg_close($dbconn);
?>