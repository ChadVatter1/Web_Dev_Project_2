document
.getElementById("start")
.onclick = function()
{
    // Starting the puzzle

    startGame();
};


document
.getElementById("shuffle")
.onclick = function()
{
    // Shuffling the puzzle

    shuffle();
};


document
.getElementById("reset")
.onclick = function()
{
    // Resetting the puzzle

    resetGame();
};


document
.getElementById("music-toggle")
.onclick = function()
{
    // Toggling game audio

    toggleAudio();
};


document
.querySelectorAll("[data-theme]")
.forEach(function(button)
{
    button.onclick = function()
    {
        // Changing the selected theme

        changeTheme(button.dataset.theme);
    };
});


document
.getElementById("difficulty")
.onchange = function()
{
    // Changing the puzzle difficulty

    changeDifficulty(this.value);
};