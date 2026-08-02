<?php

header("Content-Type: application/json");


require "db.php";



$result = $conn->query(
    "SELECT 
        player_name,
        theme,
        moves,
        time_seconds
     FROM leaderboard
     ORDER BY time_seconds ASC, moves ASC
     LIMIT 10"
);



if(!$result)
{
    echo json_encode([
        "success" => false,
        "message" => "Unable to load leaderboard",
        "scores" => []
    ]);

    exit;
}



$scores = [];



while($row = $result->fetch_assoc())
{
    $scores[] =
    [
        "player_name" => $row["player_name"],
        "theme" => $row["theme"],
        "moves" => intval($row["moves"]),
        "time_seconds" => intval($row["time_seconds"])
    ];
}



echo json_encode([
    "success" => true,
    "scores" => $scores
]);



$result->free();

$conn->close();


?>