const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let score = 0;
let direction = { x: 1, y: 0 };
let gameInterval;
const appleImage = new Image();
const snakeImage = new Image();
const bgMusic = new Audio("resources\\bg_music_1.mp3");

appleImage.src = "resources\\apple.jpg";
snakeImage.src = "resources\\block.jpg";

function placeApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / 20));
    apple.y = Math.floor(Math.random() * (canvas.height / 20));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(appleImage, apple.x * 20, apple.y * 20, 20, 20);
    
    snake.forEach(segment => {
        ctx.drawImage(snakeImage, segment.x * 20, segment.y * 20, 20, 20);
    });
    
    document.getElementById("score").innerText = `Score: ${score}`;
}

function update() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        placeApple();
    } else {
        snake.pop(); 
    }
    
    if (
        newHead.x < 0 || newHead.x >= canvas.width / 20 ||
        newHead.y < 0 || newHead.y >= canvas.height / 20 ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(gameInterval);
        bgMusic.pause();
        alert("Game Over! Your score is: " + score);
        document.getElementById("restartGameButton").style.display = "block"; 
        return;
    }
    
    snake.unshift(newHead); 
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === "ArrowRight" && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    score = 0;
    direction = { x: 1, y: 0 };
    placeApple();
    
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(() => {
        update();
        draw();
    }, 100);

  
    bgMusic.loop = true;
    bgMusic.play();
}


document.getElementById("endGameButton").addEventListener("click", () => {
    clearInterval(gameInterval);
    bgMusic.pause();
    alert("Game ended. Your score is: " + score);
});

document.getElementById("restartGameButton").addEventListener("click", () => {
    document.getElementById("restartGameButton").style.display = "none"; 
    startGame();
});

startGame();
document.addEventListener("keydown", changeDirection);
