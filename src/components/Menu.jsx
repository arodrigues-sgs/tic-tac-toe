import { useState } from "react";

export default function Menu({ winner, isDraw, currentPlayer, currentSize, resetGame }) {
    const [newBoardSize, setNewBoardSize] = useState(currentSize);
    
    const handleReset = (e) => {
        e.preventDefault();
        resetGame(newBoardSize);
    }

    let statusMessage = `Player ${currentPlayer}'s turn!`;
    if (winner) {
        statusMessage = `Player ${winner} wins!`;
    } else if(isDraw) {
        statusMessage = "Cat's Game!";
    }
    return (
        <form onSubmit={handleReset} className="status-panel">
            <p className="status-message">{statusMessage}</p>
            <label>
                Board Size: 
                <input 
                    type="number"
                    min="3"
                    max="6"
                    value={newBoardSize}
                    onChange={(e) => setNewBoardSize(+e.target.value)}
                />
            </label>
            <button className={"btn"} type="submit">Restart Game</button>
        </form>
    );
}