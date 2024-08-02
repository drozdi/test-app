import React, { useState, useEffect } from "react";
import CellComponent from "./CellComponent";
import LostFiguresComponent from "./LostFiguresComponent";
import { Colors } from "../models/Colors";

function BoardComponent({ board, setBoard, currentPlayer = null, swapPlayer = () => { } }) {
    const [selectedCell, setSelectedCell] = useState(null);

    function click(cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer();
            setSelectedCell(null);
        } else if (!cell.isEmpty() && currentPlayer?.color === cell.figure?.color) {
            setSelectedCell(cell);
        }
    }


    useEffect(() => {
        board.lightCells(selectedCell);
        const newBoard = board.copy();
        setBoard(newBoard);
    }, [selectedCell]);



    return (<>
        <h2>Ходит "{currentPlayer?.name}"</h2>
        <div className="area">
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent onClick={click} selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y} cell={cell} key={cell.key} />
                        )}
                    </React.Fragment>
                )}
            </div>
            <div>
                <LostFiguresComponent title="Черные фигуры" figures={board.lostBlackFigures} />
                <LostFiguresComponent title="Белые фигуры" figures={board.lostWhiteFigures} />
            </div>
        </div>
    </>);
}
export default BoardComponent;