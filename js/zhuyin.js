const symbols = [
  'ㄅ','ㄆ','ㄇ','ㄈ','ㄉ','ㄊ','ㄋ','ㄌ','ㄍ','ㄎ','ㄏ',
  'ㄐ','ㄑ','ㄒ','ㄓ','ㄔ','ㄕ','ㄖ','ㄗ','ㄘ','ㄙ',
  'ㄚ','ㄛ','ㄜ','ㄝ','ㄞ','ㄟ','ㄠ','ㄡ','ㄢ','ㄣ',
  'ㄤ','ㄥ','ㄦ','ㄧ','ㄨ','ㄩ',
];

const box = document.querySelector('.symbol-box');
const btn = document.querySelector('.next-btn');

const canvas = document.querySelector('.board');
const bgCanvas = document.querySelector('.bg-board');
const clearBtn = document.querySelector('.clear-btn');

const ctx = canvas.getContext('2d');
const bgCtx = bgCanvas.getContext('2d');

let currentSymbol = '';
let drawing = false;

let dpr = window.devicePixelRatio || 1;

/* ---------- Resize canvas properly ---------- */
function resizeCanvas() {
  dpr = window.devicePixelRatio || 1;

  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  // real pixel size
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  bgCanvas.width = width * dpr;
  bgCanvas.height = height * dpr;

  // reset transform so it doesn't stack
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  bgCtx.setTransform(1, 0, 0, 1, 0, 0);

  // scale for DPR
  ctx.scale(dpr, dpr);
  bgCtx.scale(dpr, dpr);

  showRandomSymbol();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ---------- symbol logic ---------- */
function showRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  currentSymbol = symbols[randomIndex];
  box.textContent = currentSymbol;

  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  // use CSS size for drawing
  const centerX = canvas.offsetWidth / 2;
  const centerY = canvas.offsetHeight / 2;

  // font size based on CSS size
  const fontSize = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.65;

  bgCtx.font = `${fontSize}px sans-serif`;
  bgCtx.fillStyle = 'rgba(0,0,0,0.2)';
  bgCtx.textAlign = 'center';
  bgCtx.textBaseline = 'middle';

  bgCtx.fillText(currentSymbol, centerX, centerY);
}

btn.addEventListener('click', showRandomSymbol);
showRandomSymbol();

/* ---------- drawing setup ---------- */
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;
ctx.lineCap = 'round';

/* ---------- pointer events ---------- */
canvas.addEventListener('pointerdown', (e) => {
  drawing = true;
  ctx.beginPath();
  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
});

canvas.addEventListener('pointerup', () => (drawing = false));
canvas.addEventListener('pointerleave', () => (drawing = false));

/* ---------- touch events fallback ---------- */
function touchStart(e) {
  e.preventDefault();
  drawing = true;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  ctx.beginPath();
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function touchMove(e) {
  e.preventDefault();
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
  ctx.stroke();
}

function touchEnd() {
  drawing = false;
}

canvas.addEventListener("touchstart", touchStart, { passive: false });
canvas.addEventListener("touchmove", touchMove, { passive: false });
canvas.addEventListener("touchend", touchEnd, { passive: false });

/* ---------- clear ---------- */
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});