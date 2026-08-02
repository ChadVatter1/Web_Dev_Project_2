let size = 4;
let board = [];
let moves = 0;
let seconds = 0;
let timer;

let currentTheme = "beach";

let gameStarted = false;
let startingBoard = [];

let audioEnabled = false;

let ambienceAudio;
let difficultyAudio;
let moveAudio;
let successAudio;
let hintAudio;

let magicUses = 3;

const difficultyMusic =
{
    4: "audio/difficulty/normal.mp3",
    5: "audio/difficulty/hard.mp3",
    6: "audio/difficulty/expert.mp3"
};

const settings =
{
    beach:
    {
        image: "beach.jpg"
    },

    coconut:
    {
        image: "coconut.jpg"
    },

    night_beach:
    {
        image: "night_beach.jpg"
    }
};


function changeTheme(theme)
{
    // Updating the selected theme

    currentTheme = theme;

    document.body.className = theme;

    document.getElementById("mode-title").innerText =
        `${theme.replace("_", " ").replace(/\b\w/g, letter => letter.toUpperCase())} - ${size}x${size} Puzzle`;

    render();
}


function changeDifficulty(newSize)
{
    // Updating the puzzle size

    size = Number(newSize);

    document.getElementById("mode-title").innerText =
        `${currentTheme.replace("_", " ").replace(/\b\w/g, letter => letter.toUpperCase())} - ${size}x${size} Puzzle`;

    createBoard();
    shuffle();
}


function createBoard()
{
    board = [];

    for(let i = 1; i < size * size; i++)
    {
        board.push(i);
    }

    board.push("");
}


function shuffle()
{
    // Creating a new solvable puzzle

    do
    {
        for(let i = board.length - 1; i > 0; i--)
        {
            let j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }

    }while(!validPuzzle());


    startingBoard = [...board];

    moves = 0;
    seconds = 0;
    gameStarted = false;
    magicUses = 3;
    updateHintButton();

    stopTimer();
    stopGameAudio();

    if(audioEnabled)
    {
        playAmbience();
    }

    updateStats();
    render();
}


function startGame()
{
    // Starting the current puzzle

    if(gameStarted)
    {
        return;
    }

    gameStarted = true;

    stopAmbience();
    playDifficultyMusic();

    startTimer();
}


function resetGame()
{
    // Resetting the puzzle state

    board = [...startingBoard];

    moves = 0;
    seconds = 0;
    gameStarted = false;

    stopTimer();

    stopGameAudio();

    if(audioEnabled)
    {
        playAmbience();
    }

    updateStats();
    render();
}


function toggleAudio()
{
    // Toggling game audio

    audioEnabled = !audioEnabled;

    let button = document.getElementById("music-toggle");

    if(audioEnabled)
    {
        button.innerText = "🎵 Music: On";

        if(!gameStarted)
        {
            playAmbience();
        }
    }
    else
    {
        button.innerText = "🎵 Music: Off";

        stopAmbience();
        stopGameAudio();

        moveAudio.pause();
        successAudio.pause();
        hintAudio.pause();
    }
}


function playAmbience()
{
    // Playing ambience music

    if(audioEnabled)
    {
        ambienceAudio.play();
    }
}


function stopAmbience()
{
    // Stopping ambience music

    ambienceAudio.pause();
    ambienceAudio.currentTime = 0;
}


function playDifficultyMusic()
{
    // Switching to difficulty music

    if(audioEnabled)
    {
        stopAmbience();

        difficultyAudio.src = difficultyMusic[size];
        difficultyAudio.currentTime = 0;
        difficultyAudio.play();
    }
}


function stopGameAudio()
{
    // Stopping difficulty music

    difficultyAudio.pause();
    difficultyAudio.currentTime = 0;
}


function playMoveSound()
{
    // Playing tile movement sound

    if(audioEnabled)
    {
        moveAudio.currentTime = 0;
        moveAudio.play();
    }
}


function move(index)
{
    if(!gameStarted)
    {
        return;
    }

    let empty = board.indexOf("");

    let row = Math.floor(index / size);
    let col = index % size;

    let emptyRow = Math.floor(empty / size);
    let emptyCol = empty % size;

    let canMove =
        (row === emptyRow && Math.abs(col-emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row-emptyRow) === 1);

    if(canMove)
    {
        playMoveSound();

        [board[index], board[empty]] = [board[empty], board[index]];

        moves++;

        updateStats();
        render();

        if(checkWin())
        {
            win();
        }
    }
}

function useHint()
{
    // Using a magic hint

    if(!gameStarted)
    {
        return;
    }

    if(magicUses <= 0)
    {
        return;
    }

    let hintTile = findHintTile();

    if(hintTile !== -1)
    {
        magicUses--;

        updateHintButton();

        highlightHint(hintTile);

        if(audioEnabled)
        {
            hintAudio.currentTime = 0;
            hintAudio.play();
        }
    }
    else
    {
        highlightHint(findRandomValidMove());
    }
}

function findHintTile()
{
    // Finding the move that improves the puzzle the most

    let empty = board.indexOf("");

    let row = Math.floor(empty / size);
    let col = empty % size;

    let directions =
    [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];

    let possibleMoves = [];


    directions.forEach(direction =>
    {
        let newRow = row + direction[0];
        let newCol = col + direction[1];


        if(
            newRow >= 0 &&
            newRow < size &&
            newCol >= 0 &&
            newCol < size
        )
        {
            possibleMoves.push(newRow * size + newCol);
        }
    });


    let currentDistance = calculateManhattan();

    let bestTile = -1;
    let bestImprovement = 0;


    possibleMoves.forEach(index =>
    {
        [board[index], board[empty]] = 
        [board[empty], board[index]];


        let newDistance = calculateManhattan();


        [board[index], board[empty]] = 
        [board[empty], board[index]];


        let improvement = currentDistance - newDistance;


        if(improvement > bestImprovement)
        {
            bestImprovement = improvement;
            bestTile = index;
        }
    });


    return bestTile;
}

function calculateManhattan()
{
    // Calculating total puzzle distance

    let distance = 0;


    board.forEach((tile,index)=>
    {
        if(tile !== "")
        {
            let currentRow = Math.floor(index / size);
            let currentCol = index % size;


            let target = tile - 1;

            let targetRow = Math.floor(target / size);
            let targetCol = target % size;


            distance +=
                Math.abs(currentRow - targetRow) +
                Math.abs(currentCol - targetCol);
        }
    });


    return distance;
}

function highlightHint(index)
{
    // Highlighting the suggested tile

    let tiles = document.querySelectorAll(".tile");

    tiles[index].classList.add("hint-tile");


    setTimeout(() =>
    {
        tiles[index].classList.remove("hint-tile");

    },3000);
}

function updateHintButton()
{
    // Updating remaining magic uses

    document.getElementById("hint").innerText =
        `✨ Hint (${magicUses})`;
}


function checkWin()
{
    for(let i = 0; i < board.length - 1; i++)
    {
        if(board[i] !== i + 1)
        {
            return false;
        }
    }

    return true;
}


function validPuzzle()
{
    let nums = board.filter(x => x !== "");
    let count = 0;

    for(let i = 0; i < nums.length; i++)
    {
        for(let j = i + 1; j < nums.length; j++)
        {
            if(nums[i] > nums[j])
            {
                count++;
            }
        }
    }

    let blank = board.indexOf("");
    let row = size - Math.floor(blank / size);

    if(size % 2 === 0)
    {
        return row % 2 === 0 ? count % 2 === 1 : count % 2 === 0;
    }

    return count % 2 === 0;
}


function startTimer()
{
    // Starting the game timer

    stopTimer();

    timer = setInterval(() =>
    {
        seconds++;
        updateStats();

    },1000);
}


function stopTimer()
{
    // Stopping the game timer

    clearInterval(timer);
}


function updateStats()
{
    document.getElementById("moves").innerText = moves;
    document.getElementById("timer").innerText = seconds;
}


function win()
{
    clearInterval(timer);

    stopGameAudio();

    if(audioEnabled)
    {
        successAudio.currentTime = 0;
        successAudio.play();
    }

    let name = prompt("Solved! Enter your name:");

    if(name)
    {
        saveScore(name, moves, seconds, currentTheme);
    }

    gameStarted = false;

    if(audioEnabled)
    {
        playAmbience();
    }
}


function render()
{
    let boardDiv = document.getElementById("board");

    boardDiv.style.gridTemplateColumns = `repeat(${size},1fr)`;
    boardDiv.innerHTML = "";

    board.forEach((tile,index)=>
    {
        let block = document.createElement("div");
        block.className = "tile";

        if(tile === "")
        {
            block.classList.add("empty");
        }
        else
        {
            let position = tile - 1;
            let x = position % size;
            let y = Math.floor(position / size);

            block.style.backgroundImage =
            `url(images/themes/${settings[currentTheme].image})`;

            block.style.backgroundSize =
            `${size * 100}% ${size * 100}%`;

            block.style.backgroundPosition =
            `${(x/(size-1))*100}% ${(y/(size-1))*100}%`;

            let number = document.createElement("span");
            number.innerText = tile;

            block.appendChild(number);
        }

        block.onclick = () => move(index);

        boardDiv.appendChild(block);
    });
}


window.onload = () =>
{
    ambienceAudio = document.getElementById("ambience-audio");
    difficultyAudio = document.getElementById("difficulty-audio");
    moveAudio = document.getElementById("move-audio");
    successAudio = document.getElementById("success-audio");
    hintAudio = document.getElementById("hint-audio");

    // Setting audio volume levels

    ambienceAudio.volume = 0.3;
    difficultyAudio.volume = 0.4;
    moveAudio.volume = 0.5;
    successAudio.volume = 0.6;
    hintAudio.volume = 0.5;

    createBoard();
    shuffle();
};