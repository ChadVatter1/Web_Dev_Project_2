<?php

$host = "codd.cs.gsu.edu";
$user = "cvatter1";
$password = "cvatter1";
$db = "cvatter1";


$conn = new mysqli(
    $host,
    $user,
    $password,
    $db
);


if ($conn->connect_error) {
    die("Database connection failed");
}

?>