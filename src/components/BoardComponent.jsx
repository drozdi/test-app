import React from "react";
import CellComponent from "./CellComponent";

function BoardComponent({ board, setBoard }) {
    return (<div className="board">
        {board.cells.map((row, index) =>
            <React.Fragment key={index}>
                {row.map(cell =>
                    <CellComponent cell={cell} key={cell.key} />
                )}
            </React.Fragment>
        )}
    </div>);
}
export default BoardComponent;