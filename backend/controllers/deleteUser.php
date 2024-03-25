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

    $query = "DELETE FROM users WHERE userId=?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $_POST['userId']);

    if ($stmt->execute() == false) {
        failure($response, "Error while deleting the user");
        goto end;
    } 
    // question?
    // $result = $stmt->get_result();
    // var_dump($result);
    // if($result == 0){
    //     failure($response, "No User Found");
    //     goto end;
    // }
    $response['message'] = "User Deleted Successfully";
    end:;
} catch (\Throwable $th) {
    failure($response, "Exception Occurred - " . $e->getMessage());
}

echo json_encode($response);
?>