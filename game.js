let currentPlayer = 0;
let positions = [0, 0];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 60;

const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = j * tileSize;
      const y = i * tileSize;
      ctx.fillStyle = (i + j) % 2 === 0 ? '#3a5a40' : '#588157';
      ctx.fillRect(x, y, tileSize, tileSize);
      const num = 100 - (i * 10 + (i % 2 === 0 ? j : 9 - j));
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.fillText(num, x + 5, y + 15);
    }
  }

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 4;
  for (let [start, end] of Object.entries(snakes)) {
    drawLineBetweenCells(Number(start), Number(end));
  }

  ctx.strokeStyle = 'yellow';
  for (let [start, end] of Object.entries(ladders)) {
    drawLineBetweenCells(Number(start), Number(end));
  }

  drawPlayers();
}

function drawLineBetweenCells(start, end) {
  const { x: x1, y: y1 } = getCellCenter(start);
  const { x: x2, y: y2 } = getCellCenter(end);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function getCellCenter(n) {
  const row = Math.floor((n - 1) / 10);
  const col = (row % 2 === 0) ? (n - 1) % 10 : 9 - ((n - 1) % 10);
  return {
    x: col * tileSize + tileSize / 2,
    y: (9 - row) * tileSize + tileSize / 2
  };
}

function drawPlayers() {
  positions.forEach((pos, index) => {
    if (pos <= 0) return;
    const { x, y } = getCellCenter(pos);
    ctx.fillStyle = index === 0 ? 'red' : 'blue';
    ctx.beginPath();
    ctx.arc(x + (index * 10 - 5), y, 8, 0, Math.PI * 2);
    ctx.fill();
  });
}

function movePlayer() {
  const input = document.getElementById('score');
  const value = parseInt(input.value);
  if (isNaN(value) || value <= 0) {
    alert('Enter a valid score');
    return;
  }

  let pos = positions[currentPlayer] + value;
  if (pos > 100) pos = 100;

  if (snakes[pos]) pos = snakes[pos];
  else if (ladders[pos]) pos = ladders[pos];

  positions[currentPlayer] = pos;
  drawBoard();

  if (pos === 100) {
    alert(`Player ${currentPlayer + 1} wins!`);
    return;
  }

  currentPlayer = 1 - currentPlayer;
  document.getElementById('current-player').innerText = currentPlayer + 1;
  input.value = '';
}

drawBoard();
