import Cell from "./Cell";

export default function Board({ isFrozen, boardState, onCellClick }) {    
    const cellsToRender = [];
    boardState.forEach((row, i) => {
        row.forEach((cell, j) => {
            cellsToRender.push(
                <Cell 
                    player={cell} 
                    isFrozen={isFrozen}
                    onCellClick={() => onCellClick(i, j)}
                    key={`(${i}, ${j})`} />
            );
        });
    })

    return (
        <div className="board" style={{ '--grid-size': boardState.length }}>
            {cellsToRender}
        </div>
    );

}