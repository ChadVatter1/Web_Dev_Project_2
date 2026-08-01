let size = 4;
let board = [];
let moves = 0;
let seconds = 0;
let timer;

let currentMode = "dawn";

const settings = {
    dawn: {size:4, image:"Dawn.jpg"},
    dusk: {size:5, image:"Dusk.jpg"},
    night:{size:6, image:"Night.jpg"}
};


function changeMode(mode){
    currentMode = mode;
    size = settings[mode].size;
    document.body.className = mode;
    document.getElementById("mode-title").innerText =
        `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode - ${size}x${size} Puzzle`;
    createBoard();
    shuffle();
}


function createBoard(){
    board = [];

    for(let i = 1; i < size * size; i++){
        board.push(i);
    }

    board.push("");
}


function shuffle(){
    do{
        for(let i = board.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
    }while(!validPuzzle());

    moves = 0;
    seconds = 0;
    updateStats();
    startTimer();
    render();
}


function move(index){
    let empty = board.indexOf("");

    let row = Math.floor(index / size);
    let col = index % size;

    let emptyRow = Math.floor(empty / size);
    let emptyCol = empty % size;

    let canMove =
        (row === emptyRow && Math.abs(col-emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row-emptyRow) === 1);

    if(canMove){
        [board[index], board[empty]] = [board[empty], board[index]];

        moves++;
        updateStats();
        render();

        if(checkWin()){
            win();
        }
    }
}


function checkWin(){
    for(let i = 0; i < board.length - 1; i++){
        if(board[i] !== i + 1){
            return false;
        }
    }

    return true;
}


function validPuzzle(){
    let nums = board.filter(x => x !== "");
    let count = 0;

    for(let i = 0; i < nums.length; i++){
        for(let j = i + 1; j < nums.length; j++){
            if(nums[i] > nums[j]){
                count++;
            }
        }
    }

    let blank = board.indexOf("");
    let row = size - Math.floor(blank / size);

    if(size % 2 === 0){
        return row % 2 === 0 ? count % 2 === 1 : count % 2 === 0;
    }

    return count % 2 === 0;
}


function startTimer(){
    clearInterval(timer);

    timer = setInterval(()=>{
        seconds++;
        updateStats();
    },1000);
}


function updateStats(){
    document.getElementById("moves").innerText = moves;
    document.getElementById("timer").innerText = seconds;
}


function win(){
    clearInterval(timer);

    let name = prompt("Solved! Enter your name:");

    if(name){
        saveScore(name, moves, seconds, currentMode);
    }
}


function render(){
    let boardDiv = document.getElementById("board");

    boardDiv.style.gridTemplateColumns = `repeat(${size},1fr)`;
    boardDiv.innerHTML = "";

    board.forEach((tile,index)=>{

        let block = document.createElement("div");
        block.className = "tile";

        if(tile === ""){
            block.classList.add("empty");
        }
        else{
            let position = tile - 1;
            let x = position % size;
            let y = Math.floor(position / size);

            block.style.backgroundImage =
            `url(images/${currentMode}/${settings[currentMode].image})`;

            block.style.backgroundSize =
            `${size * 100}% ${size * 100}%`;

            block.style.backgroundPosition =
            `${(x/(size-1))*100}% ${(y/(size-1))*100}%`;

            let number = document.createElement("span");
            number.innerText = tile;
            block.appendChild(number);
        }

        block.onclick = ()=>move(index);

        boardDiv.appendChild(block);
    });
}


window.onload = ()=>{
    createBoard();
    shuffle();
};