const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.getElementById("info");
const startCells = ["", "", "", "", "", "", "", "", ""];

infoDisplay.innerHTML = "Circle goes first";
infoDisplay.style.fontSize = "x-large";

let turn = "Circle";
let restart = false;

let circleScore = 0;
let xScore = 0;
let drawCount = 0;
let winningCombo = [];

function createBoard() {
  document.getElementById("restart").style.display = "none";

  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", takeTurn);
    gameBoard.appendChild(cellElement);
  });
}

createBoard();

function takeTurn(event) {
  const currentTurn = document.createElement("div");
  const cell = event.currentTarget;

  if (checkItem(cell, turn) && !restart) {
    currentTurn.classList.add(turn);
    cell.append(currentTurn);
     //  Play move sound
  const moveSound = document.getElementById("turnClickSound"); //  Play move sound
  moveSound.currentTime = 0; // reset sound if already playing
  moveSound.play();

    if (checkState(turn)) {
      infoDisplay.innerHTML = turn + " is the winner!";
      restart = true;
      document.getElementById("restart").style.display = "inline";

      if (turn === "Circle") {
        circleScore++;
        document.getElementById("circleScore").textContent = circleScore;
      } else {
        xScore++;
        document.getElementById("xScore").textContent = xScore;
      }
      winningCombo.forEach(index => {
        const square = document.getElementById(index);
        square.classList.add("win-highlight");
        document.getElementById("winSound").play();
      });

      
    } else if (startCells.every((cell) => cell !== "")) {
      drawCount++;
      document.getElementById("drawCount").textContent = drawCount;
      infoDisplay.innerHTML = "It's a draw!";
      restart = true;
      document.getElementById("restart").style.display = "inline";
      document.getElementById("failSound").play();
    } else {
      // Only switch turns if game is still active
      turn = turn === "Circle" ? "X" : "Circle";
      infoDisplay.textContent = "It is now " + turn + "'s turn";
    }
    
  }

}

function checkItem(element, turn) {
  const id = element.id;
  if (startCells[id] == "") {
    startCells[id] = turn;
    return true;
  } else {
    return false;
  }
}

function checkState(turn) {
  retValue = false;
  checkArray = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], //rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], //columns
    [0, 4, 8],[2, 4, 6], //diagonals
  ];
  checkArray.forEach(function (combo) {
    if (
      startCells[combo[0]] == turn &&
      startCells[combo[1]] == turn &&
      startCells[combo[2]] == turn
    ) {
      retValue = true;
      winningCombo = combo;
      document.body.classList.add("confetti-active");;
    }
  });
  return retValue;
}

function resetGame() {
  // Clear the board
  document.body.classList.remove("confetti-active");;
  gameBoard.innerHTML = "";

  // Reset the array and turn
  for (let i = 0; i < startCells.length; i++) {
    startCells[i] = "";
  }

  turn = "Circle";
  restart = false;

  infoDisplay.textContent = "Circle goes first";

  document.querySelectorAll(".win-highlight").forEach(square => {
    square.classList.remove("win-highlight");
  });

  createBoard();

  document.getElementById("restart").style.display = "none";
}
