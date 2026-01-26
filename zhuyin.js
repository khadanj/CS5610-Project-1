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

let drawing = false;

// Store CSS size for drawing
let cssWidth = 0;
let cssHeight = 0;

/* ---------- Resize canvas properly ---------- */
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  cssWidth = rect.width;
  cssHeight = rect.height;

  // Set internal pixel size
  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  bgCanvas.width = cssWidth * dpr;
  bgCanvas.height = cssHeight * dpr;

  // Reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  bgCtx.setTransform(1, 0, 0, 1, 0, 0);

  // Scale for DPR
  ctx.scale(dpr, dpr);
  bgCtx.scale(dpr, dpr);

  showRandomSymbol();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

/* ---------- symbol logic ---------- */
function showRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  const currentSymbol = symbols[randomIndex];
  box.textContent = currentSymbol;

  // Clear using CSS size
  bgCtx.clearRect(0, 0, cssWidth, cssHeight);

  const centerX = cssWidth / 2;
  const centerY = cssHeight / 2;

  // Find best font size so it never gets clipped
  let fontSize = Math.min(cssWidth, cssHeight) * 0.75;
  bgCtx.textAlign = "center";
  bgCtx.textBaseline = "middle";

  while (fontSize > 0) {
    bgCtx.font = `${fontSize}px sans-serif`;
    const metrics = bgCtx.measureText(currentSymbol);
    const textWidth = metrics.width;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // If it fits, stop shrinking
    if (textWidth <= cssWidth * 0.92 && textHeight <= cssHeight * 0.92) {
      break;
    }
    fontSize -= 2;
  }

  bgCtx.fillStyle = "rgba(0,0,0,0.2)";
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
  ctx.clearRect(0, 0, cssWidth, cssHeight);
});
