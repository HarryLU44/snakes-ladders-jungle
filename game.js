
let currentPlayer = 0;
let positions = [0, 0];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 60;
const snakeSound = document.getElementById('snake-sound');
const ladderSound = document.getElementById('ladder-sound');

const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = j * tileSize;
      const y = i * tileSize;
      ctx.strokeStyle = '#ffffff33';
      ctx.strokeRect(x, y, tileSize, tileSize);
      const num = 100 - (i * 10 + (i % 2 === 0 ? j : 9 - j));
      ctx.fillStyle = '#fff';
      ctx.fillText(num, x + 5, y + 15);
    }
  }

  const overlay = new Image();
  overlay.src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Snakes_and_Ladders_board.svg";
  overlay.onload = () => {
    ctx.drawImage(overlay, 0, 0, 600, 600);
    drawPlayers();
  };
}

function drawPlayers() {
  positions.forEach((pos, index) => {
    if (pos <= 0) return;
    const row = Math.floor((pos - 1) / 10);
    const col = (row % 2 === 0) ? (pos - 1) % 10 : 9 - ((pos - 1) % 10);
    const x = col * tileSize + 30;
    const y = (9 - row) * tileSize + 30;
    ctx.fillStyle = index === 0 ? 'red' : 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateCanvas() {
  drawBoard();
}

function movePlayer() {
  const input = document.getElementById('score');
  const value = parseInt(input.value);
  if (isNaN(value) || value <= 0) {
    alert('Please enter a valid score');
    return;
  }

  let pos = positions[currentPlayer] + value;
  if (pos > 100) pos = 100;

  if (snakes[pos]) {
    pos = snakes[pos];
    snakeSound.play();
  } else if (ladders[pos]) {
    pos = ladders[pos];
    ladderSound.play();
  }

  positions[currentPlayer] = pos;
  updateCanvas();

  if (pos === 100) {
    alert(`Player ${currentPlayer + 1} wins!`);
    return;
  }

  currentPlayer = 1 - currentPlayer;
  document.getElementById('current-player').innerText = currentPlayer + 1;
  input.value = '';
}

updateCanvas();
