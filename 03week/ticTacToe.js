"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// assigns empty multi-dimensional arrays as cells in the grid
let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
// variable for active player
let playerTurn = "X";
// prints board into the terminal
function printBoard() {
  console.log("   0  1  2");
  console.log("0 " + board[0].join(" | "));
  console.log("  ---------");
  console.log("1 " + board[1].join(" | "));
  console.log("  ---------");
  console.log("2 " + board[2].join(" | "));
}

function horizontalWin() {
  // these are all the possible winning combinations for horizontal wins
  if (
    (board[0][0] === playerTurn &&
      board[0][1] === playerTurn &&
      board[0][2] === playerTurn) ||
    (board[1][0] === playerTurn &&
      board[1][1] === playerTurn &&
      board[1][2] === playerTurn) ||
    (board[2][0] === playerTurn &&
      board[2][1] === playerTurn &&
      board[2][2] === playerTurn)
  ) {
    return true;
  } else {
    return false;
  }
}

function verticalWin() {
  // these are all the possible winning combinations for vertical wins
  if (
    (board[0][0] === playerTurn &&
      board[1][0] === playerTurn &&
      board[2][0] === playerTurn) ||
    (board[0][1] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][1] === playerTurn) ||
    (board[0][2] === playerTurn &&
      board[1][2] === playerTurn &&
      board[2][2] === playerTurn)
  ) {
    return true;
  } else {
    return false;
  }
}

function diagonalWin() {
  // these are all the possible winning combinations for diagonal wins
  if (
    (board[2][0] === playerTurn &&
      board[1][1] === playerTurn &&
      board[0][2] === playerTurn) ||
    (board[0][0] === playerTurn &&
      board[1][1] === playerTurn &&
      board[2][2] === playerTurn)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkForWin(row, column) {
  // function checks for all winning possibilities
  if (
    horizontalWin(row, column) ||
    verticalWin(row, column) ||
    diagonalWin(row, column)) {
    return true;
  } else {
    return false;
  }
}

function validMove(row, column) {
  // allows the player to place piece only where a valid spot is open/allowed
  if (board[row][column] === " ") {
    return true;
  } else {
    return false;
  }
}

function inputControl(row, column) {
  // only allows player to place piece within the board and not outside of that board
  if (
    (row === "0" || row === "1" || row === "2") &&
    (column === "0" || column === "1" || column === "2")
  ) {
    return true;
  } else {
    return false;
  }
}
function changePlayer() {
  // allows switching of players from 'X' to 'O'
  playerTurn === "X" ? playerTurn = "O" : playerTurn = "X";
}

function placePieces(row, column) {
  // marks pieces on board
  board[row][column] = playerTurn;
}
// my ticTacToe function
function ticTacToe(row, column) {
  if (inputControl(row, column)) {
  
    if (validMove(row, column)) {
      
      placePieces(row, column);
      changePlayer(row, column);
      
      if (checkForWin(row, column)) {
        console.log("player", playerTurn + "Wins");
      } else {
        getPrompt();
      }
    } else {
      console.log("Spots taken");
    }
  } else {
    console.log("invalid move");
  }
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
      setTimeout(function() {
        assert.deepEqual(board, [
        [" ", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "]
      ])
    }, 3000);
    });
    it("should alternate between players", () => {
      ticTacToe(0, 0);
      setTimeout(function() {
        assert.deepEqual(board, [
        ["O", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "]
      ]);
    }, 3000);
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
