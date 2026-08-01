<?php

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$moves = $data["moves"];
$time = $data["time"];
$theme = $data["theme"];


$stmt = $conn->prepare(
    "INSERT INTO leaderboard (player_name,moves,time_seconds,theme)
     VALUES (?,?,?,?)"
);


$stmt->bind_param(
    "siis",
    $name,
    $moves,
    $time,
    $theme
);


if($stmt->execute()){

    echo json_encode([
        "success"=>true
    ]);

}
else{

    echo json_encode([
        "success"=>false,
        "error"=>$stmt->error
    ]);

}


$stmt->close();
$conn->close();

?>