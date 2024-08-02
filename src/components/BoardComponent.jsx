import React, { useState } from "react";
import CellComponent from "./CellComponent";

function BoardComponent({ board, setBoard }) {
    const [selectedCell, setSelectedCell ] = useState(null);

    function click (cell) {
        if (cell.figure) {
            setSelectedCell(cell);
        }
    }

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