const symbols = ["ㄅ","ㄆ","ㄇ","ㄈ","ㄉ","ㄊ","ㄋ","ㄌ","ㄍ","ㄎ","ㄏ","ㄐ","ㄑ","ㄒ","ㄓ","ㄔ","ㄕ","ㄖ","ㄗ","ㄘ","ㄙ","ㄚ","ㄛ","ㄜ","ㄝ","ㄞ","ㄟ","ㄠ","ㄡ","ㄢ","ㄣ","ㄤ","ㄥ","ㄦ","ㄧ","ㄨ","ㄩ"];

const box = document.getElementById("symbol-box");
const btn = document.getElementById("next-btn");

function showRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  box.textContent = symbols[randomIndex];
}

btn.addEventListener("click", showRandomSymbol);
showRandomSymbol();

// canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clear");

ctx.strokeStyle = "#000";
ctx.lineWidth = 4;
ctx.lineCap = "round";

let drawing = false;

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

// Clear only clears canvas, symbol stays the same
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

