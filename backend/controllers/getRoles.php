<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set the CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET"); // Adjust the allowed HTTP methods as needed
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require_once 'dbconn.php';
require_once 'functions.php';

if(!isset($_SESSION)){
    session_start();
}
if(!isset($_SESSION['userId']) || !isset($_SESSION['username']) || !isset($_SESSION['email'])){
    $response["success"] = false;
    $response["error"] = "You are not Logged In";
    $response["login"] = false;
    goto end;
}

$response["success"] = true;
$response["roles"] = [];
try {
    $query = "SELECT rId, rName FROM roles";
    $result = $conn->query($query);
    if ($result->num_rows == 0) {
        failure($response, "No Roles Found");
        goto end;
    }
    while ($row = $result->fetch_assoc()) {
        array_push($response["roles"], $row);
    }
    end:;
} catch (Exception $e) {
    failure($response, "Exception Occurred - " . $e->getMessage());
}

echo json_encode($response);
?>