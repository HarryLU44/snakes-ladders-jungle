
let currentPlayer = 0;
let positions = [0, 0];
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const tileSize = 60;

const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  overlay.innerHTML = '';

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

  for (let [start, end] of Object.entries(snakes)) drawSnake(Number(start), Number(end));
  for (let [start, end] of Object.entries(ladders)) drawLadder(Number(start), Number(end));
  drawPlayers();
}

function getCellCenter(n) {
  const row = Math.floor((n - 1) / 10);
  const col = (row % 2 === 0) ? (n - 1) % 10 : 9 - ((n - 1) % 10);
  return {
    x: col * tileSize + tileSize / 2,
    y: (9 - row) * tileSize + tileSize / 2
  };
}

function drawSnake(start, end) {
  const s = getCellCenter(start);
  const e = getCellCenter(end);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const midX = (s.x + e.x) / 2 + 30 * Math.sin((s.y - e.y) / 100);
  const midY = (s.y + e.y) / 2 + 30 * Math.cos((s.x - e.x) / 100);
  path.setAttribute("d", `M${s.x},${s.y} Q${midX},${midY} ${e.x},${e.y}`);
  path.setAttribute("stroke", "green");
  path.setAttribute("stroke-width", "5");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");
  overlay.appendChild(path);
}

function drawLadder(start, end) {
  const s = getCellCenter(start);
  const e = getCellCenter(end);
  const ladder = document.createElementNS("http://www.w3.org/2000/svg", "line");
  ladder.setAttribute("x1", s.x);
  ladder.setAttribute("y1", s.y);
  ladder.setAttribute("x2", e.x);
  ladder.setAttribute("y2", e.y);
  ladder.setAttribute("stroke", "#d4af37");
  ladder.setAttribute("stroke-width", "6");
  ladder.setAttribute("stroke-dasharray", "5,5");
  overlay.appendChild(ladder);
}

function drawPlayers() {
  positions.forEach((pos, idx) => {
    if (pos <= 0) return;
    const { x, y } = getCellCenter(pos);
    ctx.fillStyle = idx === 0 ? '#ff9800' : '#03a9f4';
    ctx.beginPath();
    ctx.arc(x + (idx * 12 - 6), y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function movePlayer() {
  const input = document.getElementById('score');
  const score = parseInt(input.value);
  if (isNaN(score) || score <= 0) {
    alert('Enter a valid score!');
    return;
  }

  let next = positions[currentPlayer] + score;
  if (next > 100) next = 100;

  if (snakes[next]) next = snakes[next];
  else if (ladders[next]) next = ladders[next];

  positions[currentPlayer] = next;
  drawBoard();

  if (next === 100) {
    alert(`Player ${currentPlayer + 1} wins!`);
    return;
  }

  currentPlayer = 1 - currentPlayer;
  document.getElementById('current-player').textContent = currentPlayer + 1;
  input.value = '';
}

drawBoard();
