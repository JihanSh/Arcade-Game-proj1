// use the DOM for representing the html
const startText = document.getElementById("startText");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");

let gameRunning = false;
let keysPressed = {};
let paddle1Speed = 0;
let paddle2Speed = 0;
let paddle1Y = 150;
let paddle2Y = 150;
let ballX = 290; // game width divided by 2 minus the ball width
let ballY = 190; // game height divided by 2 minus the ball height
let ballSpeedX = 2;
let ballSpeedY = 2;
let player2Score = 0;
let player1Score = 0;

const paddleAcceleration = 1;
const maxPaddleSpeed = 5;
const paddleDeceleration = 1;
const gameHeight = 400;
const gameWidth = 600;

document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// start the game
function startGame() {
  gameRunning = true;
  startText.style.display = "none";
  // without removing the event listener, the game will keep starting whenever a key is pressed, the game should start once until its finished
  document.removeEventListener("keydown", startGame);
  gameLoop();
}
//  functionality of the game when its running
function gameLoop() {
  if (gameRunning) {
    updatePaddle1();
    updatePaddle2();
    ballMovement();
    console.log("the game is running");
    setTimeout(gameLoop, 8);
  }
}

function handleKeyDown(e) {
  keysPressed[e.key] = true;
}
function handleKeyUp(e) {
  keysPressed[e.key] = false;
}
function updatePaddle1() {
  if (keysPressed["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressed["s"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle1Speed > 0) {
    paddle1Speed = Math.max(paddle1Speed - paddleDeceleration, 0);
  } else if (paddle1Speed < 0) {
    paddle1Speed = Math.min(paddle1Speed + paddleDeceleration, 0);
  }
  paddle1Y += paddle1Speed;
  if (paddle1Y < 0) {
    paddle1Y = 0;
  }

  //   client height is accessed by any dom element and it is the height of the object (paddle height here)
  if (paddle1Y > gameHeight - paddle1.clientHeight) {
    paddle1Y = gameHeight - paddle1.clientHeight;
  }
  paddle1.style.top = paddle1Y + "px";
}
// same for paddle 2
function updatePaddle2() {
  if (keysPressed["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressed["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, maxPaddleSpeed);
  } else if (paddle2Speed > 0) {
    paddle2Speed = Math.max(paddle2Speed - paddleDeceleration, 0);
  } else if (paddle2Speed < 0) {
    paddle2Speed = Math.min(paddle2Speed + paddleDeceleration, 0);
  }
  paddle2Y += paddle2Speed;
  if (paddle2Y < 0) {
    paddle2Y = 0;
  }

  //   client height is accessed by any dom element and it is the height of the object (paddle height here)
  if (paddle2Y > gameHeight - paddle2.clientHeight) {
    paddle2Y = gameHeight - paddle2.clientHeight;
  }
  paddle2.style.top = paddle2Y + "px";
}

function ballMovement() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // the total game width minus the paddle width minus the ball width
  if (ballY >= gameHeight - ball.clientHeight || ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }
  // paddle1 collision
  if (
    ballX <= paddle1.clientWidth &&
    ballY >= paddle1Y &&
    ballY <= paddle1Y + paddle1.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // paddle2 collision
  if (
    ballX >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + paddle2.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
  //collision with the wall
  if (ballX <= 0) {
    player2Score++;
    updateScore();
    resetBall();
    pauseGame();
  } else if (ballX >= gameWidth - ball.clientWidth) {
    player1Score++;
    updateScore();
    resetBall();
    pauseGame();
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

function updateScore() {
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}

function resetBall() {
  ballX = gameWidth / 2 - ball.clientWidth / 2;
  ballY= gameHeight / 2 - ball.clientHeight / 2;
  ballSpeedX = Math.random() > 0.5 ? 2 : -2; //randomize the direction so it doesnt always start in the same direction
  ballSpeedY = Math.random() > 0.5 ? 2 : -2;
}

function pauseGame() {
  gameRunning = false;
  document.addEventListener("keydown", startGame);
}
