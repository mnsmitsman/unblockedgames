// Snake Game Logica
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spel instellingen
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Snake en voedsel
let snake = [
  { x: 5 * scale, y: 5 * scale },
  { x: 4 * scale, y: 5 * scale },
  { x: 3 * scale, y: 5 * scale }
];
let food = { x: Math.floor(Math.random() * rows) * scale, y: Math.floor(Math.random() * columns) * scale };

// Richting van de slang
let dx = scale;
let dy = 0;

// Game status
let gameOver = false;
let score = 0;

// Functie om het spel opnieuw te starten
function restartGame() {
  snake = [
    { x: 5 * scale, y: 5 * scale },
    { x: 4 * scale, y: 5 * scale },
    { x: 3 * scale, y: 5 * scale }
  ];
  food = { x: Math.floor(Math.random() * rows) * scale, y: Math.floor(Math.random() * columns) * scale };
  dx = scale;
  dy = 0;
  gameOver = false;
  score = 0;
  document.getElementById('gameOver').style.display = 'none';
  document.getElementById('restartButton').style.display = 'none';
  main();
}

// Functie om het spel te starten
function main() {
  if (gameOver) {
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block';
    return;
  }

  setTimeout(function() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
    main();
  }, 100);
}

// Functie om het canvas schoon te maken
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Functie om de slang te tekenen
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
  }
}

// Functie om het voedsel te tekenen
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, scale, scale);
}

// Functie om de slang te verplaatsen
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Controleer of de slang het voedsel heeft gegeten
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * rows) * scale, y: Math.floor(Math.random() * columns) * scale };
  } else {
    snake.pop();
  }
}

// Functie om te controleren op botsingen
function checkCollision() {
  const head = snake[0];

  // Botsing met de muur
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    gameOver = true;
  }

  // Botsing met zichzelf
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
    }
  }
}

// Functie om de richting van de slang te veranderen
function changeDirection(event) {
  if (event.keyCode === 37 && dx === 0) {
    dx = -scale;
    dy = 0;
  }
  if (event.keyCode === 38 && dy === 0) {
    dy = -scale;
    dx = 0;
  }
  if (event.keyCode === 39 && dx === 0) {
    dx = scale;
    dy = 0;
  }
  if (event.keyCode === 40 && dy === 0) {
    dy = scale;
    dx = 0;
  }
}

// Event listener voor toetsindrukken
document.addEventListener('keydown', changeDirection);

// Start het spel
main();

// Event listener voor opnieuw starten
document.getElementById('restartButton').addEventListener('click', restartGame);
