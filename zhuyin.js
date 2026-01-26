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

/* ---------- symbol logic ---------- */
function showRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  currentSymbol = symbols[randomIndex];
  box.textContent = currentSymbol;

  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgCtx.font = '250px sans-serif';
  bgCtx.fillStyle = 'rgba(0,0,0,0.2)';
  bgCtx.textAlign = 'center';
  bgCtx.textBaseline = 'middle';
  bgCtx.fillText(currentSymbol, bgCanvas.width / 2, bgCanvas.height / 2);
}

btn.addEventListener('click', showRandomSymbol);
showRandomSymbol();

/* ---------- drawing setup ---------- */
ctx.strokeStyle = '#000';
ctx.lineWidth = 4;
ctx.lineCap = 'round';

/* ---------- pointer events (key part) ---------- */
canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault(); // important for mobile
  drawing = true;
  ctx.beginPath();

  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing) return;
  e.preventDefault(); // important for mobile

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
});

canvas.addEventListener('pointerup', () => {
  drawing = false;
});

canvas.addEventListener('pointerleave', () => {
  drawing = false;
});

/* ---------- clear ---------- */
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
