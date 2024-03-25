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

if(!isset($_SESSION)){
    session_start();
}
if(!isset($_SESSION['userId']) || !isset($_SESSION['username']) || !isset($_SESSION['email'])){
    $response["success"] = false;
    $response["error"] = "You are not Logged In";
    $response["login"] = false;
    goto end;
}

$_POST = json_decode(file_get_contents("php://input"), true); 
$response["success"] = true;

try {

    if (!isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['status']) || !isset($_POST['roleId'])) 
    {
        failure($response, "Please fill all the fields");
        goto end;
    }

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $status = $_POST['status'];
    $roleId = (int) $_POST['roleId'];

    $query = "INSERT INTO users (username, email, password, status, roleId) VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssii", $username, $email, $password, $status, $roleId );

    // question? :email should be unique? :username should be unique

    if ($stmt->execute() == false) {
        failure($response, "Error while adding the user");
        goto end;
    } 
    $response['message'] = "User Added Successfully";
    end:;
} catch (\Throwable $th) {
    failure($response, "Exception Occurred - " . $e->getMessage());
}

echo json_encode($response);
?>