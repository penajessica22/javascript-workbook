"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];

let playerTurn = "X";

function printBoard() {
  console.log("   0  1  2");
  console.log("0 " + board[0].join(" | "));
  console.log("  ---------");
  console.log("1 " + board[1].join(" | "));
  console.log("  ---------");
  console.log("2 " + board[2].join(" | "));
}

function horizontalWin() {
    // Your code here
    if (
    (board[0][0] === playerTurn && board[0][1] === playerTurn && board[0][2] === playerTurn) ||
    (board[1][0] === playerTurn && board[1][1] === playerTurn && board[1][2] === playerTurn) ||
    (board[2][0] === playerTurn && board[2][1] === playerTurn && board[2][2] === playerTurn)
    )
}

function verticalWin() {
  // Your code here
    if ( 
      (board[0][0] === playerTurn && board[1][0] === playerTurn && board[2][0] === playerTurn) ||
      (board[0][1] === playerTurn && board[1][1] === playerTurn && board[2][1] === playerTurn) ||
      (board[0][2] === playerTurn && board[1][2] === playerTurn && board[2][2] === playerTurn))
}

function diagonalWin() {
  // Your code here
}

function checkForWin() {

  // Your code here
}

function validMove(row, column) {
  if (board[row][column] === " ") {
    return true;
  } else {
    return false;
  }
}

function inputControl(row, column) {
  if (
    (row === 0 || row === 1 || row === 2) &&
    (column === 0 || column === 1 || column === 2)
  ) {
    return true;
  } else {
    return false;
  }
}
function changePlayer() {
  playerTurn === "X" ? (playerTurn = "O") : (playerTurn = "X");
}

function movePlayer(row, column) {
  board[row][column] = playerTurn;
}

function ticTacToe(row, column) {
  if (inputControl(row, column)) {
    if (validMove(row, column)) {
      movePlayer(row, column);
      if(checkForWin()){
        console.log("player" playerTurn + "Wins");
      } else {
        changePlayer();
        getPrompt()
      }

    } else {
      console.log("Spots taken")
    }
  } else {
    console.log("invalid move");
  }
  inputControl(row, column);
  validMove(row, column);
  movePlayer(row, column);
  changePlayer();
}

function placeBoard(row, column) {
  // creates a placement on the board
  board[row][column] = playerTurn;
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question("row: ", row => {
    rl.question("column: ", column => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === "function") {
  describe("#ticTacToe()", () => {
    it("should place mark on the board", () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [
        [" ", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "]
      ]);
    });
    it("should alternate between players", () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [
        ["O", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "]
      ]);
    });
    it("should check for vertical wins", () => {
      board = [[" ", "X", " "], [" ", "X", " "], [" ", "X", " "]];
      assert.equal(verticalWin(), true);
    });
    it("should check for horizontal wins", () => {
      board = [["X", "X", "X"], [" ", " ", " "], [" ", " ", " "]];
      assert.equal(horizontalWin(), true);
    });
    it("should check for diagonal wins", () => {
      board = [["X", " ", " "], [" ", "X", " "], [" ", " ", "X"]];
      assert.equal(diagonalWin(), true);
    });
    it("should detect a win", () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {
  getPrompt();
}
