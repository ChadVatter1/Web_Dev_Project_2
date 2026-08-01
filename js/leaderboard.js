let currentTheme = "dawn";

function saveScore(name, moves, time, mode){

    fetch("api/save_score.php", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            moves:moves,
            time:time,
            theme:mode
        })
    })
    .then(res=>res.json())
    .then(()=>{
        loadScores();
    });

}


function loadScores(){

    fetch("api/get_scores.php")
    .then(res=>res.json())
    .then(data=>{

        let table = document.getElementById("scores");

        table.innerHTML = "";

        data.forEach(score=>{

            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${score.player_name}</td>
                <td>${score.theme}</td>
                <td>${score.moves}</td>
                <td>${score.time_seconds}s</td>
            `;

            table.appendChild(row);

        });

    });

}


loadScores();