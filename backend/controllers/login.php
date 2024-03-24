<?php
error_reporting(E_ALL); 
ini_set('display_errors', 1);

// Set the CORS headers to allow requests from any origin
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST"); // Adjust the allowed HTTP methods as needed
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

require_once 'dbconn.php';
require_once 'functions.php';

session_start();

$response["success"] = true;

$_POST = json_decode(file_get_contents("php://input"), true);
try {
    if (!isset($_POST['username']) || !isset($_POST['password'])) {
        failure($response, "Missing username or password");
        goto end;
    }

    $query = "SELECT userId, username, password, email FROM users where username=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $username = $_POST['username'];
    if ($stmt->execute() == false) {
        failure($response, "Error while checking your account");
        goto end;
    }
    $result = $stmt->get_result();
    if (mysqli_num_rows($result) == 0) {
        failure($response, "No Account Found");
        goto end;
    }
    $row = $result->fetch_assoc();
    if ($_POST["password"] != $row["password"]) {
        failure($response, "Authentication Failed");
        goto end;
    }

    $_SESSION["userId"] = $row["userId"];
    $_SESSION["email"] = $row["email"];
    $_SESSION["username"] = $row["username"];

    end:;
} catch (Exception $e) {
    failure($response, "Exception Occurred - " . $e->getMessage());
}

echo json_encode($response);
