<?php

header("Content-Type: application/json");


require "db.php";



$data = json_decode(
    file_get_contents("php://input"),
    true
);



if(!$data)
{
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON data"
    ]);

    exit;
}



$name = trim($data["player_name"] ?? "");

$theme = trim($data["theme"] ?? "");

$moves = $data["moves"] ?? -1;

$time = $data["time_seconds"] ?? -1;



if(
    empty($name) ||
    empty($theme) ||
    !is_numeric($moves) ||
    !is_numeric($time)
)
{
    echo json_encode([
        "success" => false,
        "message" => "Invalid score data"
    ]);

    exit;
}



$name = substr($name,0,50);

$moves = intval($moves);

$time = intval($time);



if($moves < 0 || $time < 0)
{
    echo json_encode([
        "success" => false,
        "message" => "Invalid score values"
    ]);

    exit;
}



$allowedThemes =
[
    "beach",
    "coconut",
    "night_beach"
];



if(!in_array($theme,$allowedThemes))
{
    echo json_encode([
        "success" => false,
        "message" => "Invalid theme"
    ]);

    exit;
}



$stmt = $conn->prepare(
    "INSERT INTO leaderboard
    (player_name,moves,time_seconds,theme)
    VALUES (?,?,?,?)"
);



$stmt->bind_param(
    "siis",
    $name,
    $moves,
    $time,
    $theme
);



if($stmt->execute())
{
    echo json_encode([
        "success" => true,
        "message" => "Score saved"
    ]);
}
else
{
    echo json_encode([
        "success" => false,
        "message" => "Database error"
    ]);
}



$stmt->close();

$conn->close();


?>