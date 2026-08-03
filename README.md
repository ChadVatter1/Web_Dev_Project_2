# Web_Dev_Project_2

AI disclosure: We utilized AI to generate aesthetic ideas and problem solving ideas. For example how to create the magic hint. We also used AI to search through the files to find potential errors or misspells. We also utilized AI to help with more complicated tasks such as breaking an image into multiple parts for the puzzle. It also helped with syntax or code structures we were not familiar with.

Question 1: Explain how your core files are organized and how they interact. Identify where routing, business logic, and rendered output are handled.

-game.js file is the main file that fetches/pulls functions from other files such as leaderboard.js to accomplish tasks. Is a bit of a bulky file, but its used more as a backbone for the web app.

Question 2: Show one player input channel in your puzzle (button click, tile click, keyboard, or touch). Trace the event from input capture to board update in code.

-A move function inside the game.js file will check the current tile against neighboring tiles to find if it is movable, then if it is, the tile is moved. After its moved the game is updated for moves and the board is rerendered with the tile moved.

Question 3: How does your puzzle maintain state across interactions? Describe where board state is initialized, read, updated, and reset.

-The board is initialized in the very beginning of the game.js file as empty. Its read whenever the game is won for the scores and times. The board is updated after each move and is reset when the shuffle or reset button is pressed.

Question 4: Where and how do you validate and sanitize user input in your code? Show specific methods or functions used. save_score.php - Line 97; game.js - Line 583; 

-The user input is validated in both of these places game.js - Line 583; save_score.php - Line 97;. First checks if there is an input and the 2nd checks if the inputs are valid (checks for negative values, etc.)

Question 5: Walk through your HTML file structure and explain your use of semantic elements (<header>, <main>, <section>, <form>, etc.).

-header contains the title and current "version" of the game being played. controls section allows for game theme to be swapped. difficulty section allows for the game difficulty to be swapped. track section allows users to switch between a "normal" and "assisted" version of the game. the following buttons allow the user to start, shuffle, reset, toggle music, or get a hint for the current baord. Stats section tracks moves and time for the current game. Analytics section tracks games completed, average moves made, and average time taken in the current session. Leaderboard tracks the player name, mode played on, moves made in that game, and time taken to beat that game. After that each of the audio files are loaded into the webapp. And finally the js files are loaded. 

Question 6: Demonstrate your responsive layout: resize the browser live and explain how your CSS media queries adapt the design for mobile, tablet, and desktop.

-The metadata in the html file allow us to resize the webapp for mobile and desktop screen sizes. 

Question 7: Describe your planning process: how did your team define goals and prioritize backlog items for each milestone?

-We each had tasks such as building a basic framework and improving it and adding additional features. We checked in every few days to ensure that we were both making progress toward each milestone. 

Question 8: Go through GitHub commits

-First big commit was uploading the basic working project, next was adding the difficulty and theme selection buttons, and another was adding the magic hint utilizing a Manhattan distance algorithm to find next best move.

Question 9: How did your team use Discord, iCollege, or other tools to stay aligned between meetings? What communication pattern worked best?

-With school out during this project we utilized Discord to communicate and coordinate this project.

Question 10: Open your project folder in VS Code and walk through the directory structure. Explain the purpose of each major file and folder.

-Each type of folder is organized into its own folder, php in apis, audio files in audio, stylesheet in css, etc. This is meant to keep the project organized so that if we need to find anything from a specific type of file its easy to find.

Question 11: What does your README contain? Show that it enables a new developer to set up and run your project without your help.

-Our readme includes the questions as documentation for a new developer to more easily jump inito the project. It will help them get a good feel for what and how the project was constructed and give addition information as well. It also include an AI disclosure so that we are clear with what we were able to acomplish.

Questions 12:

1) -Starts with: function move - game.js
-Board state update: move + validPuzzle - game.js
-Score save fetch: function win (saveScore in leaderboard.js) - game.js -> save_score.php
-PHP API validation: variable check in save_score.php - save_score.php
-MySQL write: INSERT - save_score.php
-re-render leaderboard: loadScores: leaderboard.js

2) Magic Hint had issues of how to make it work. We did research utilizing AI to find that a Manhattan distance was most efficient for this task. We then found ways to implement this online and implemented it into our code, fixing the magic hint bug.

3) We chose to change a large single js file into modular and multiple js files. This allows us to more easily track down bugs and it improve readability. It also allows us to reuse some of these files at a later date for another project. 

4) Some edge cases we handle are no name being entered (gets handled in the save score function call), also negative times or moves gets checked in save_score. Also, inside save_score we utilize prepared SQL statements to prevent SQL injections into our database.

5) With so much of the heavy lifting be done by the game.js file, it is very fragile because if anything goes wrong there the entire application goes down. We can break this down into more modular pieces to prevent issues like this in the future.

Me: 1, 3, 5, 6, 8, 11 D1, D3, D4