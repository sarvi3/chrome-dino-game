// Game variables
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

let score = 0;
let isJumping = false;
let isGameOver = false;
let cactusPosition = 900;
let gravity = -0.9;
let position = 0;
let baseSpeed = 5;
let currentSpeed = baseSpeed;
let speedIncrement = 1.5;

function jump() {
    if (isJumping || isGameOver) return;
    
    isJumping = true;
    position = 0;
    let velocity = 20;
    
    const jumpInterval = setInterval(() => {
        velocity += gravity;
        position += velocity;
        
        if (position <= 0) {
            position = 0;
            isJumping = false;
            clearInterval(jumpInterval);
        }
        
        dino.style.bottom = position + 'px';
    }, 20);
}

// Move cactus
function moveCactus() {
    if (isGameOver) return;
    
    cactusPosition -= currentSpeed;
    cactus.style.right = (900 - cactusPosition) + 'px';
    
    // Reset cactus position when it goes off screen
    if (cactusPosition < 0) {
        cactusPosition = 900;
        score++;
        scoreElement.textContent = score;
        
        // Increase speed every 10 points
        if (score % 10 === 0 && score > 0) {
            currentSpeed += speedIncrement;
        }
    }
    
    if (cactusPosition > 30 && cactusPosition < 130 && position < 80) {
        gameOver();
    }
    
    requestAnimationFrame(moveCactus);
}

// Game over function
function gameOver() {
    isGameOver = true;
    gameOverElement.style.display = 'block';
    cactus.style.animation = 'none';
}

// Reset game
function resetGame() {
    isGameOver = false;
    score = 0;
    scoreElement.textContent = score;
    position = 0;
    cactusPosition = 900;
    currentSpeed = baseSpeed; // Reset speed
    dino.style.bottom = '0px';
    gameOverElement.style.display = 'none';
    moveCactus();
}

// Event listeners
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (isGameOver) {
            resetGame();
        } else {
            jump();
        }
    }
});

// Start the game
moveCactus();
