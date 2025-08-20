const board = document.getElementById("game-board");
const resetButton = document.getElementById("reset");
const resetScoreButton = document.getElementById("reset-score");
const notification = document.getElementById("notification");
const turnInfo = document.getElementById("turn-info");

let cells = [];
let currentPlayer = "X";
let gameOver = false;
let score1 = 0;
let score2 = 0;

// Buat papan
function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent || gameOver) return;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    showNotification(`🎉 Pemain ${currentPlayer === "X" ? "1" : "2"} Menang! 🏆`, "green");
    gameOver = true;
    updateScore();
  } else if (cells.every(c => c.textContent)) {
    showNotification("🤝 Permainan Seri!", "orange");
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnInfo.textContent = `Giliran Pemain ${currentPlayer === "X" ? "1" : "2"}`;
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // baris
    [0,3,6], [1,4,7], [2,5,8], // kolom
    [0,4,8], [2,4,6]           // diagonal
  ];
  return winPatterns.some(pattern => pattern.every(index => cells[index].textContent === player));
}

function showNotification(message, color) {
  notification.textContent = message;
  notification.style.background = color;
  notification.classList.remove("hidden");
}

function updateScore() {
  if (currentPlayer === "X") {
    score1++;
    document.getElementById("score1").textContent = score1;
  } else {
    score2++;
    document.getElementById("score2").textContent = score2;
  }
}

resetButton.addEventListener("click", () => {
  currentPlayer = "X";
  gameOver = false;
  createBoard();
  notification.classList.add("hidden");
  turnInfo.textContent = "Giliran Pemain 1";
});

resetScoreButton.addEventListener("click", () => {
  score1 = 0;
  score2 = 0;
  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;
});

createBoard();
