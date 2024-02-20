let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let scoreX = 0;
let scoreO = 0;
let draws = 0;

function makeMove(cellIndex) {
  if (!gameOver && gameBoard[cellIndex] === "") {
    gameBoard[cellIndex] = currentPlayer;
    document.getElementsByClassName("cell")[cellIndex].innerText =
      currentPlayer;

    if (checkWin(currentPlayer)) {
      displayMessage(currentPlayer + " wins!");
      updateScore(currentPlayer);
      gameOver = true;
    } else if (checkDraw()) {
      displayMessage("It's a draw!");
      updateDraws();
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      displayMessage(currentPlayer + "'s Turn");
    }
  }
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameBoard[a] === player &&
      gameBoard[b] === player &&
      gameBoard[c] === player
    ) {
      highlightWinningCells(combination);
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return (
    gameBoard.every((cell) => cell !== "") && !checkWin("X") && !checkWin("O")
  );
}

function displayMessage(message) {
  document.getElementById("message").innerText = message;
}

function highlightWinningCells(cells) {
  for (let cellIndex of cells) {
    document
      .getElementsByClassName("cell")
      [cellIndex].classList.add("winning-cell");
  }
}

function updateScore(player) {
  if (player === "X") {
    scoreX++;
    document.getElementById("scoreX").innerText = "X's Wins: " + scoreX;
  } else if (player === "O") {
    scoreO++;
    document.getElementById("scoreO").innerText = "O's Wins: " + scoreO;
  }
}

function updateDraws() {
  draws++;
  document.getElementById("draws").innerText = "Draws: " + draws;
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  draws = 0;
  document.getElementById("scoreX").innerText = "X's Wins: 0";
  document.getElementById("scoreO").innerText = "O's Wins: 0";
  document.getElementById("draws").innerText = "Draws: 0";
}

function disableBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.onclick = null;
  }
}

// Reset the game
function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;

  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.innerText = "";
    cell.classList.remove("winning-cell");
    cell.onclick = function () {
      makeMove(Array.from(cells).indexOf(cell));
    };
  }

  displayMessage(currentPlayer + "'s Turn");
}

// Call resetGame() initially to start a new game
resetGame();
