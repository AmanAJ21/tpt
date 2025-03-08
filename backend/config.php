<?php

header("Access-Control-Allow-Origin: *"); // Or "*" for testing
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection parameters
/*
$host = "amanpostgres.postgres.database.azure.com"; // Use the service name defined in docker-compose.yml for the external DB
$port = "5432";
$dbname = "demo";
$user = "aman";
$password = "@Azure_database";
*/

$host = "localhost"; // Use the service name defined in docker-compose.yml for the external DB
$port = "5432";
$dbname = "demo";
$user = "postgres";
$password = "postgres";

// Create connection string
$connection_string = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password}";
// Establish a connection to the PostgreSQL database
$dbconn = pg_connect($connection_string);

// Check if the connection was successful
if (!$dbconn) {
    die("Error: Unable to connect to the database.\n");
}

// Optional: Set the client encoding to UTF8
pg_set_client_encoding($dbconn, "UTF8");


?>