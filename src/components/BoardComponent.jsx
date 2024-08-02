import React, { useState, useEffect } from "react";
import CellComponent from "./CellComponent";

function BoardComponent({ board, setBoard }) {
    const [selectedCell, setSelectedCell ] = useState(null);

    function click (cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            setSelectedCell(null);
        } else {
            setSelectedCell(cell);
        }
    }

    function updateBoard () {
        board.canMove(selectedCell);
        const newBoard = board.copy();
        setBoard(newBoard);
    }

    useEffect(updateBoard, [selectedCell])

    

    return (<div className="board">
        {board.cells.map((row, index) =>
            <React.Fragment key={index}>
                {row.map(cell =>
                    <CellComponent onClick={click} selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y} cell={cell} key={cell.key} />
                )}
            </React.Fragment>
        )}
    </div>);
}
export default BoardComponent;