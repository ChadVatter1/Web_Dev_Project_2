function saveScore(name, moves, time, mode)
{
    // Saving score data

    let score =
    {
        player_name: name,
        theme: mode,
        moves: moves,
        time_seconds: time,
        date: new Date().toISOString()
    };


    fetch("api/save_score.php",
    {
        method:"POST",

        headers:
        {
            "Content-Type":"application/json"
        },

        body:JSON.stringify(score)

    })

    .then(response =>
    {
        if(!response.ok)
        {
            throw new Error("API unavailable");
        }


        return response.json();

    })

    .then(() =>
    {
        loadScores();
    })

    .catch(() =>
    {
        // Using local storage fallback

        saveLocalScore(score);

        loadScores();
    });
}



function saveLocalScore(score)
{
    // Saving score locally

    let scores =
        JSON.parse(
            localStorage.getItem("puzzleScores")
        ) || [];


    scores.push(score);


    scores.sort(function(a,b)
    {
        if(a.time_seconds !== b.time_seconds)
        {
            return a.time_seconds - b.time_seconds;
        }


        return a.moves - b.moves;
    });


    scores = scores.slice(0,10);


    localStorage.setItem(
        "puzzleScores",
        JSON.stringify(scores)
    );
}



function loadScores()
{
    // Loading leaderboard data

    fetch("api/get_scores.php")

    .then(response =>
    {
        if(!response.ok)
        {
            throw new Error("API unavailable");
        }


        return response.json();

    })

    .then(data =>
    {
        displayScores(data.scores);
    })

    .catch(() =>
    {
        // Loading local scores

        let scores =
            JSON.parse(
                localStorage.getItem("puzzleScores")
            ) || [];


        displayScores(scores);
    });
}



function displayScores(data)
{
    // Displaying leaderboard rows

    let table =
        document.getElementById("scores");


    table.innerHTML = "";


    data.forEach(score =>
    {
        let row =
            document.createElement("tr");


        row.innerHTML =
        `
            <td>${score.player_name}</td>
            <td>${score.theme}</td>
            <td>${score.moves}</td>
            <td>${score.time_seconds}s</td>
        `;


        table.appendChild(row);
    });
}



loadScores();