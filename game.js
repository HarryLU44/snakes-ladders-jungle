let currentPlayer = 0;
let positions = [0, 0];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 60;

function drawBoard() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = j * tileSize;
      const y = i * tileSize;
      ctx.fillStyle = (i + j) % 2 === 0 ? '#6a994e' : '#a7c957';
      ctx.fillRect(x, y, tileSize, tileSize);
      const num = 100 - (i * 10 + (i % 2 === 0 ? j : 9 - j));
      ctx.fillStyle = '#fff';
      ctx.fillText(num, x + 5, y + 15);
    }
  }
}

function drawPlayers() {
  positions.forEach((pos, index) => {
    if (pos <= 0) return;
    const row = Math.floor((pos - 1) / 10);
    const col = (row % 2 === 0) ? (pos - 1) % 10 : 9 - ((pos - 1) % 10);
    const x = col * tileSize + 20 + (index * 10);
    const y = (9 - row) * tileSize + 20;
    ctx.fillStyle = index === 0 ? 'red' : 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawPlayers();
}

function movePlayer() {
  const input = document.getElementById('score');
  const value = parseInt(input.value);
  if (isNaN(value) || value <= 0) {
    alert('Please enter a valid score');
    return;
  }
  positions[currentPlayer] += value;
  if (positions[currentPlayer] > 100) positions[currentPlayer] = 100;
  updateCanvas();
  if (positions[currentPlayer] === 100) {
    alert(`Player ${currentPlayer + 1} wins!`);
    return;
  }
  currentPlayer = 1 - currentPlayer;
  document.getElementById('current-player').innerText = currentPlayer + 1;
  input.value = '';
}

updateCanvas();
