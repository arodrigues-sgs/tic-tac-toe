import Board from './components/Board'
import './App.css'
import { useState } from 'react'
import Menu from './components/Menu';

const DEFAULT_BOARD_SIZE = 3;

function initScoreState(boardSize) {
  return {
    diag: 0,
    antiDiag: 0,
    rows: Array(boardSize).fill(0),
    cols: Array(boardSize).fill(0),
  }
}

function initBoardState(boardSize) {
  return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
}

function App() {
  const[boardState, setBoardState] = useState(initBoardState(DEFAULT_BOARD_SIZE));
  const[scoreState, setScoreState] = useState(initScoreState(DEFAULT_BOARD_SIZE));
  const[moveCount, setMoveCount] = useState(0);

  // derived state
  const isWin = checkWin();
  const isDraw = !isWin && moveCount === boardState.length ** 2;
  const isFrozen = Boolean(isDraw || isWin);

  const lastPlayer = (moveCount - 1) % 2 === 0 ? 'X' : 'O';
  const nextPlayer = moveCount % 2 === 0 ? 'X' : 'O';
  
  const winner = isWin ? lastPlayer : null;
  const currentPlayer = isWin ? null : nextPlayer;

  function resetGame(boardSize) {
    console.log(initBoardState(boardSize));
    setBoardState(initBoardState(boardSize));
    setScoreState(initScoreState(boardSize));
    setMoveCount(0);
  }

  function checkWin() {
    return Math.abs(scoreState.diag) === boardState.length ||
      Math.abs(scoreState.antiDiag) === boardState.length ||
      scoreState.rows.some(r => Math.abs(r) === boardState.length) ||
      scoreState.cols.some(c => Math.abs(c) === boardState.lengthE);
  }

  function handleActiveCellClicked(i, j) {
    if(isFrozen || boardState[i][j] !== null) return;

    // update board state
    const newBoardState = boardState.map(r => [...r]); // copy the 2D array
    newBoardState[i][j] = currentPlayer;
    setBoardState(newBoardState);

    // update score state
    const newScoreState = {
      diag: scoreState.diag,
      antiDiag: scoreState.antiDiag,
      rows: [...scoreState.rows],
      cols: [...scoreState.cols],
    };
    const val = currentPlayer === 'X' ? 1 : -1;
    newScoreState.rows[i] += val;
    newScoreState.cols[j] += val;
    if(i === j) newScoreState.diag += val;
    if((i + j) === (DEFAULT_BOARD_SIZE - 1)) newScoreState.antiDiag += val;
    setScoreState(newScoreState);

    // update move / current player
    setMoveCount(moveCount + 1);
  }

  return (
    <div className='container'>
      <h1>Tic Tac Toe - React</h1>
      <Menu 
        winner={winner} 
        isDraw={isDraw} 
        currentPlayer={currentPlayer} 
        currentSize={boardState.length}
        resetGame={resetGame} />
      <Board
        isFrozen={isFrozen} 
        boardState={boardState} 
        onCellClick={handleActiveCellClicked} />
    </div>
  )
}

export default App
