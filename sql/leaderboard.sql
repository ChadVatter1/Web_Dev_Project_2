CREATE DATABASE puzzle_game;

USE puzzle_game;

CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    moves INT NOT NULL,
    time_seconds INT NOT NULL,
    theme VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_score ON leaderboard(time_seconds, moves);