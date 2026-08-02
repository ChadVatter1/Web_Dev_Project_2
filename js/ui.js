document
.getElementById("shuffle")
.onclick = function()
{
    // Shuffling the puzzle

    shuffle();
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