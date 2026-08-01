<?php

require "db.php";


$result = $conn->query(
    "SELECT *
     FROM leaderboard
     ORDER BY time_seconds ASC, moves ASC
     LIMIT 10"
);


$scores=[];


while($row=$result->fetch_assoc()){
    $scores[]=$row;
}


echo json_encode($scores);

?>