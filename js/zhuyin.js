const symbols = ["ㄅ","ㄆ","ㄇ","ㄈ","ㄉ","ㄊ","ㄋ","ㄌ","ㄍ","ㄎ","ㄏ","ㄐ","ㄑ","ㄒ","ㄓ","ㄔ","ㄕ","ㄖ","ㄗ","ㄘ","ㄙ","ㄚ","ㄛ","ㄜ","ㄝ","ㄞ","ㄟ","ㄠ","ㄡ","ㄢ","ㄣ","ㄤ","ㄥ","ㄦ","ㄧ","ㄨ","ㄩ"];

const box = document.getElementById("symbol-box");
const btn = document.getElementById("next-btn");

// Canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear");

ctx.strokeStyle = "#000";
ctx.lineWidth = 4;
ctx.lineCap = "round";

let drawing = false;

// ============ Functions ============

// Draw transparent symbol in canvas
function drawTransparentSymbol(symbol) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.2;
  ctx.font = "200px sans-serif";  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(symbol, canvas.width / 2, canvas.height / 2);

  ctx.globalAlpha = 1;
}


// Show random symbol
function showRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  const selectedSymbol = symbols[randomIndex];

  box.textContent = selectedSymbol;

  drawTransparentSymbol(selectedSymbol); // show in canvas
}

// ============ Mouse Events ============

canvas.addEventListener("mousedown", () => {
  drawing = true;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});

// ============ Touch Events (Mobile) ============

function getTouchPos(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  drawing = true;
  ctx.beginPath();
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!drawing) return;

  const pos = getTouchPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

canvas.addEventListener("touchend", () => {
  drawing = false;
});

// ============ Clear Button ============

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // keep the symbol visible
  showRandomSymbol();
});

// ============ Start ============

btn.addEventListener("click", showRandomSymbol);
showRandomSymbol();

