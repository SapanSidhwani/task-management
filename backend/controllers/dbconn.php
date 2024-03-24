<?php
$DB_TYPE = 'mysql'; //Type of database<br>
$DB_HOST = 'localhost'; //Host name<br>
$DB_USER = 'root'; //Host Username<br>
$DB_PASS = ''; //Host Password<br>
$DB_NAME = 'task_management'; //Database name<br><br>

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if(!$conn){
    die('Connection Failed'. mysqli_connect_error());
}   

?>