// ==========================================================================
// Global State Variables
// ==========================================================================
let board;
let currentPlayer;
let isGameActive;

const sums = {};

const N = 5;

function convertToNum(cell) {
  if(cell === 'X') return 1;
  if(cell === 'O') return -1;
  return 0;
}

// ==========================================================================
// DOM Elements
// ==========================================================================
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status-message');
const resetBtn = document.getElementById('reset-btn');

// ==========================================================================
// Initialization
// ==========================================================================

// Listen for the HTML document to fully load before running our JS
document.addEventListener('DOMContentLoaded', () => initGame(N));

/**
 * Sets up the initial game board by creating 9 div elements,
 * attaching click listeners to them, and putting them on the screen.
 */
function initGame(n) {
  function initSums() {
    sums.diag = 0;
    sums.antiDiag = 0;
    sums.rows = Array(n).fill(0);
    sums.cols = Array(n).fill(0);
  }

  // Set internal state
  board = Array.from({ length: n }, () => Array(n).fill('')); // empty spaces
  initSums();
  currentPlayer = 'X';
  isGameActive = true;
  statusElement.setHTML(`Player ${currentPlayer}'s Turn`);

  // Clear any existing HTML inside the board container
  // This is important for resetting the game
  boardElement.innerHTML = '';

  // Set css variable for the css grid:
  document.documentElement.style.setProperty("--grid-size", n);

  // Create the nxn grid
  for (let i = 0; i < n; i++) {
    for(let j = 0; j< n; j++) {
      // 1. Create a new div element
      const cell = document.createElement('div');
      
      // 2. Add the 'cell' CSS class to it
      cell.classList.add('cell');
      
      // 3. Store the coordinates (i, j) inside the HTML element so we know which one was clicked
      cell.dataset.x = i;
      cell.dataset.y = j;
      
      // 4. Attach an event listener: When this cell is clicked, call handleCellClick
      cell.addEventListener('click', handleCellClick);
      
      // 5. Append the cell to the board element in the DOM
      boardElement.appendChild(cell);
    }
    
  }

  // Attach event listener to the reset button
  resetBtn.addEventListener('click', resetGame);
}

// ==========================================================================
// Game Logic & Event Handling
// ==========================================================================

/**
 * Handles what happens when a user clicks on a cell.
 * @param {Event} event - The click event object
 */
function handleCellClick(event) {
  // 'event.target' refers to the exact HTML element that was clicked
  const clickedCell = event.target;
  
  // Retrieve the coordinates of the clicked cell
  const x = +clickedCell.dataset.x;
  const y = +clickedCell.dataset.y;

  // Check if the cell is already filled OR if the game is over.
  // If either is true, exit the function early (do nothing).
  if (board[x][y] !== '' || isGameActive === false) {
    return;
  }

  // TODO 1: Update the internal state (the 'board' array) with the current player
  board[x][y] = currentPlayer;

  // update scoring
  const val = convertToNum(currentPlayer);
  sums.rows[x] += val;
  sums.cols[y] += val;
  if(x === y) sums.diag += val;
  if((x + y) === (board.length - 1)) sums.antiDiag += val;

  // TODO 2: Update the DOM to reflect the internal state! 
  // you may need to update both inner html and css classes of DOM elements
  clickedCell.setHTML(currentPlayer);
  clickedCell.classList.add("taken", currentPlayer.toLowerCase());

  // TODO 3: Check for (and possibly handle) a winner (Call the checkWin() function)
  if(checkWin()) {
    isGameActive = false;
    statusElement.setHTML(`Player ${currentPlayer} Wins!`);
    return;
  }

  // TODO 4: Check for (and possibly handle) a tie (Call the checkTie() function)
  if(checkTie()) {
    isGameActive = false;
    statusElement.setHTML("Cats Game!");
    return;
  };

  // TODO 5: Swap the currentPlayer from 'X' to 'O' or 'O' to 'X'
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // TODO 6: Update the statusElement to show whose turn it is now
  statusElement.setHTML(`Player ${currentPlayer}'s Turn`);
}

/**
 * Checks for a winner.
 * @returns {boolean} true if there is a winner, false otherwise
 */
// to improve to O(1), keep track of the totals in global state and then just update the appropriate ones when a new move is played at indices x, y
function checkWin() {
  let n = board.length;
  console.log(sums);
  return Math.abs(sums.diag) === n || 
    Math.abs(sums.antiDiag) === n ||
    sums.rows.some(rowSum => Math.abs(rowSum) === n) ||
    sums.cols.some(colSum => Math.abs(colSum) === n);
}

/**
 * Checks for a tie game.
 * @returns {boolean} true if it's a tie, false otherwise
 */
function checkTie() {
  for (const row of board) {
    for(const cell of row) {
      if(!cell) return false;
    }
  }
  return true; 
}

/**
 * Resets all state variables and the DOM to start a new game.
 */
function resetGame() {
  initGame(N);
}


// function checkWin() {
  
//   const colSums = [0, 0, 0];
//   const rowSums= [0, 0, 0];
//   let diagSum = 0;
//   let antiDiagSum = 0;
//   for (let row = 0; row < 3; row++) {
//     for(let col = 0; col < 3; col++) {
//       const val = convertToNum(board[row][col]);
//       colSums[col] += val;
//       rowSums[row] += val;
//       if(row === col) diagSum += val;
//       if(row + col === (3 - 1)) antiDiagSum += val;
//     }  
//   }
//   return colSums.some(sum => Math.abs(sum) === 3) || 
//     rowSums.some(sum => Math.abs(sum) === 3) || 
//     Math.abs(diagSum) === 3 || 
//     Math.abs(antiDiagSum) === 3;
// }