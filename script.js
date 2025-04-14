const { body } = document;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;
const screenWidth = window.screen.width;
const canvasPosition = screenWidth / 2 - width / 2;
const isMobile = window.matchMedia('(max-width: 600px)');
const gameOverEl = document.createElement('div');

// Paddle
const paddleHeight = 12;
const paddleWidth = 100;
const paddleDiff = 50;
let paddleBottomX = 200;
let paddleTopX = 200;
let playerMoved = false;
let paddleContact = false;

// Ball
let ballX = 250;
let ballY = 350;
const ballRadius = 10;

// Speed
let speedY;
let speedX;
let trajectoryX;
let computerSpeed;

// Change Mobile Settings
if (isMobile.matches) {
  speedY = -2;
  speedX = speedY;
  computerSpeed = 4;
} else {
  speedY = -1;
  speedX = speedY;
  computerSpeed = 3;
}

// Score
let playerScore = 0;
let computerScore = 0;
const winningScore = 7;
let isGameOver = true;
let isNewGame = true;

// Render Everything on Canvas
function renderCanvas() {
  // Modern Neon Gradient Background
  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#000428');
  gradient.addColorStop(0.5, '#004e92');
  gradient.addColorStop(1, '#000428');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  // Paddle Styling with Glow
  context.fillStyle = '#0ff';
  context.shadowColor = '#0ff';
  context.shadowBlur = 20;

  // Player Paddle (Bottom)
  context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

  // Computer Paddle (Top)
  context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

  // Center Line with Glow
  context.beginPath();
  context.setLineDash([10]);
  context.moveTo(0, 350);
  context.lineTo(500, 350);
  context.strokeStyle = '#ffffff88';
  context.lineWidth = 2;
  context.stroke();

  // Ball with Cyberpunk Glow
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = '#ff00ff';
  context.shadowColor = '#ff00ff';
  context.shadowBlur = 25;
  context.fill();

  // Score Display
  context.font = '32px Arial';
  context.fillStyle = '#fff';
  context.fillText(playerScore, 20, canvas.height / 2 + 50);
  context.fillText(computerScore, 20, canvas.height / 2 - 30);
}

// Create Canvas Element
function createCanvas() {
  canvas.width = width;
  canvas.height = height;
  body.appendChild(canvas);
  renderCanvas();
}

// Reset Ball to Center
function ballReset() {
  ballX = width / 2;
  ballY = height / 2;
  speedY = -3;
  paddleContact = false;
}

// Adjust Ball Movement
function ballMove() {
  ballY += -speedY;
  if (playerMoved && paddleContact) {
    ballX += speedX;
  }
}

// Ball Collision Detection
function ballBoundaries() {
  if (ballX < 0 && speedX < 0 || ballX > width && speedX > 0) {
    speedX = -speedX;
  }

  if (ballY > height - paddleDiff) {
    if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
      paddleContact = true;
      speedY = -speedY;
      trajectoryX = ballX - (paddleBottomX + paddleDiff);
      speedX = trajectoryX * 0.3;
    } else if (ballY > height) {
      ballReset();
      computerScore++;
    }
  }
  
  if (ballY < paddleDiff) {
    if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
      speedY = -speedY;
    } else if (ballY < 0) {
      ballReset();
      playerScore++;
    }
  }
}

// Computer AI Movement
function computerAI() {
  if (playerMoved) {
    if (paddleTopX + paddleDiff < ballX) {
      paddleTopX += computerSpeed;
    } else {
      paddleTopX -= computerSpeed;
    }
  }
}

function showGameOverEl(winner) {
  canvas.hidden = true;
  gameOverEl.innerHTML = `<div class='game-over' style='text-align:center; color:white; font-family:Arial;'><h1>${winner} Wins!</h1><button onclick='startGame()' style='padding: 10px 20px; font-size: 16px; background: #ff00ff; color: white; border: none; cursor: pointer;'>Play Again</button></div>`;
  gameOverEl.classList.add('game-over-container');
  body.appendChild(gameOverEl);
}

// Check for Winner
function gameOver() {
  if (playerScore === winningScore || computerScore === winningScore) {
    isGameOver = true;
    const winner = playerScore === winningScore ? 'Player' : 'Computer';
    showGameOverEl(winner);
  }
}

// Animation Loop
function animate() {
  renderCanvas();
  ballMove();
  ballBoundaries();
  computerAI();
  gameOver();
  if (!isGameOver) {
    window.requestAnimationFrame(animate);
  }
}

// Start Game
function startGame() {
  if (isGameOver && !isNewGame) {
    body.removeChild(gameOverEl);
    canvas.hidden = false;
  }
  isGameOver = false;
  isNewGame = false;
  playerScore = 0;
  computerScore = 0;
  ballReset();
  createCanvas();
  animate();

  canvas.addEventListener('mousemove', (e) => {
    playerMoved = true;
    paddleBottomX = e.clientX - canvasPosition - paddleDiff;
    paddleBottomX = Math.max(0, Math.min(width - paddleWidth, paddleBottomX));
    canvas.style.cursor = 'none';
  });
}

startGame();
