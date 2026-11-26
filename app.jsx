// One reusable square. Props are the values passed in by App.
function Square(props) {
  return (
    <button
      className={'cell ' + props.value.toLowerCase()}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={'Square ' + props.number + ': ' + (props.value || 'empty')}
    >
      {props.value}
    </button>
  );
}

function App() {
  // State replaces the old global variables. A setter tells React to update the page.
  const [boardSize, setBoardSize] = React.useState(3);
  const [board, setBoard] = React.useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = React.useState('X');
  const [isGameActive, setIsGameActive] = React.useState(true);
  const [statusMessage, setStatusMessage] = React.useState("Player X's Turn");

  function handleCellClick(cellIndex) {
    // Keep the same checks as the vanilla game.
    if (board[cellIndex] !== '' || isGameActive === false) {
      return;
    }

    const newBoard = board.slice();
    newBoard[cellIndex] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setStatusMessage('Player ' + currentPlayer + ' Wins!');
      setIsGameActive(false);
      return;
    }

    if (checkTie(newBoard)) {
      setStatusMessage("It's a Tie!");
      setIsGameActive(false);
      return;
    }

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
    setStatusMessage("Player " + nextPlayer + "'s Turn");
  }

  function checkWin(board) {
    const winningCombinations = [];

    // Build the rows and columns instead of listing only the 3x3 ones.
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      const column = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(i * boardSize + j);
        column.push(j * boardSize + i);
      }
      winningCombinations.push(row);
      winningCombinations.push(column);
    }

    // Build the two full diagonals.
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * boardSize + i);
      diagonal2.push(i * boardSize + (boardSize - 1 - i));
    }
    winningCombinations.push(diagonal1);
    winningCombinations.push(diagonal2);

    for (const combination of winningCombinations) {
      const firstCell = board[combination[0]];
      let allMatch = true;

      // Check every cell in this line against the first one.
      for (let i = 0; i < combination.length; i++) {
        if (board[combination[i]] !== firstCell) {
          allMatch = false;
        }
      }

      // Empty cells also match, so require a non-empty cell first.
      if (firstCell !== '' && allMatch) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks for a tie game.
   * @returns {boolean} true if it's a tie, false otherwise
   */
  function checkTie(board) {
    // No empty spaces AND no winning line means a tie.
    if (!board.includes('') && !checkWin(board)) {
      return true;
    }
    return false;
  }

  function resetGame(size) {
    setBoardSize(size);
    setBoard(Array(size * size).fill(''));
    setCurrentPlayer('X');
    setIsGameActive(true);
    setStatusMessage("Player X's Turn");
  }

  function changeBoardSize(event) {
    const newSize = parseInt(event.target.value);
    resetGame(newSize);
  }

  const cells = [];
  for (let i = 0; i < board.length; i++) {
    cells.push(
      <Square
        key={i}
        number={i + 1}
        value={board[i]}
        onClick={() => handleCellClick(i)}
        disabled={board[i] !== '' || !isGameActive}
      />
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>

      <section className="status-panel">
        <div id="status-message" className="status-message" role="status">{statusMessage}</div>
        <label htmlFor="board-size">Board size: </label>
        <select id="board-size" value={boardSize} onChange={changeBoardSize}>
          <option value="3">3 × 3</option>
          <option value="4">4 × 4</option>
          <option value="5">5 × 5</option>
        </select>
        <p className="rules">Fill a whole row, column, or diagonal to win. Changing size starts a new game.</p>
        <button id="reset-btn" className="btn" onClick={() => resetGame(boardSize)}>Restart Game</button>
      </section>

      <main className="board-container">
        <div id="board" className="board" style={{
          gridTemplateColumns: 'repeat(' + boardSize + ', 1fr)',
          gridTemplateRows: 'repeat(' + boardSize + ', 1fr)',
          fontSize: (12 / boardSize) + 'rem'
        }}>
          {cells}
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
