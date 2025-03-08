<?php
include './config.php';

class Report {
    private $dbconn;

    public function __construct($dbconn) {
        $this->dbconn = $dbconn;
    }

    public function getAllReports($user) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1";
        return $this->executeQuery($sql, array($user));
    }

    public function getPaidReports($user) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1 AND rbal = '1'";
        return $this->executeQuery($sql, array($user));
    }

    public function getNotPaidReports($user) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1 AND rbal = '0'";
        return $this->executeQuery($sql, array($user));
    }

    public function getReportsByOwnerName($user, $oname) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1 AND oname = $2";
        return $this->executeQuery($sql, array($user, $oname));
    }

    public function getReportsBySrNo($user, $srno) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1 AND srno = $2";
        return $this->executeQuery($sql, array($user, $srno));
    }

    public function getReportsByTransportName($user, $tname) {
        $sql = "SELECT srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal 
                FROM usars WHERE users = $1 AND tname = $2";
        return $this->executeQuery($sql, array($user, $tname));
    }

    private function executeQuery($sql, $params) {
        // Prepare and execute the query
        $stmt = pg_prepare($this->dbconn, "report_query", $sql);
        if ($stmt) {
            $result = pg_execute($this->dbconn, "report_query", $params);
            if (pg_num_rows($result) > 0) {
                // Fetch all results
                return json_encode(pg_fetch_all($result));
            } else {
                return "No data found.";
            }
        }
        return "Error preparing statement.";
    }
}

// Usage example:
$report = new Report($dbconn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['data'])) {
        switch ($_POST['data']) {
            case 'all':
                echo $report->getAllReports($_POST['user']);
                break;

            case 'paid':
                echo $report->getPaidReports($_POST['user']);
                break;

            case 'npaid':
                echo $report->getNotPaidReports($_POST['user']);
                break;
            // New cases for searching by input values
            case 'search_srno':
                echo $report->getReportsBySrNo($_POST['user'], $_POST['srno']);
                break;

            case 'search_oname':
                echo $report->getReportsByOwnerName($_POST['user'], $_POST['oname']);
                break;

            case 'search_tname':
                echo $report->getReportsByTransportName($_POST['user'], $_POST['tname']);
                break;
        }
    } else {
        echo "No action specified.";
    }
}

pg_close($dbconn);
?>