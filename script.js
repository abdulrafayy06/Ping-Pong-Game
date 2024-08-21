// Game variables
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "lightcoral";
const paddleBorder = "black";
const ballColor = "white";
const ballborder = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;

// Score
let player1Score = 0;
let player2Score = 0;

// Paddle objects

// Paddle 1
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
}

// Paddle 2
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100,
}

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

// Game functions

// Start game
function gameStart() {
    createBall();
    nextTick();
};

// Next tick function
function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard();
        drawPadels();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10);
};

// Clear board function
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

// Draw paddles
function drawPadels() {
    ctx.strokeStyle = paddleBorder;

    // Paddle 1
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    // Paddle 2
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

// Create ball function
function createBall() {
    ballSpeed = 1;

    // Randomize ball direction
    ballXDirection = Math.round(Math.random()) === 1 ? 1 : -1;
    ballYDirection = Math.round(Math.random()) === 1 ? 1 : -1;

    // Reset ball position
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

// Move ball function
function moveBall() {
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};

// Draw ball function
function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballborder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
};

function checkCollision() {
    
    // Ball collision

    // Top and bottom collision
    if (ballY >= 0 + ballRadius) {
        ballYDirection *= -1;
    }
    if (ballY >= gameHeight - ballRadius) {
        ballYDirection *= 1;
    }

    // Score
    if (ballX <= 0) {
        player2Score += 1;
        updateScore();
        createBall();
    }
    if (ballX >= gameWidth) {
        player1Score += 1;
        updateScore();
        createBall();
    }

    // Paddle 1 collision
    if (ballX <= (paddle1.x + paddle1.width) + ballRadius) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius; //if the ball stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }

    // Paddle 2 collision
    if (ballX >= paddle2.x - ballRadius) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
};


function changeDirection(event) {
    const keyPressed = event.keyCode;

    // Key codes
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    // Paddle movement
    switch (keyPressed) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            break;
        case (paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
            }
            break;
        case (paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            break;
        case (paddle2Down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed;
            }
            break;
    }
};

function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0,
    }

    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100,
    }
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};