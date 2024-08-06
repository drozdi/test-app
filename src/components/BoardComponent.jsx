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
        } else if (!cell.isEmpty()) {// && currentPlayer?.color === cell.figure?.color) {
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
        <div className="container">
            <div className="board__container">
                <div className="board__row">
                    <div className="board__legend board__legend--h board__legend--w"></div>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(i => <div key={i} className="board__legend board__legend--h">{i}</div>)}
                    <div className="board__legend board__legend--h board__legend--w"></div>
                </div>
                <div className="board__row">
                    <div className="board__column">
                        {[8, 7, 6, 5, 4, 3, 2, 1].map(i => <div key={i} className="board__legend board__legend--w">{i}</div>)}
                    </div>
                    <div className="board">
                        {board.cells.map((row, index) =>
                            <React.Fragment key={index}>
                                {row.map(cell =>
                                    <CellComponent onClick={click} selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y} cell={cell} key={cell.key} />
                                )}
                            </React.Fragment>
                        )}
                    </div>
                    <div className="board__column">
                        {[8, 7, 6, 5, 4, 3, 2, 1].map(i => <div key={i} className="board__legend board__legend--w">{i}</div>)}
                    </div>
                </div>
                <div className="board__row">
                    <div className="board__legend board__legend--h board__legend--w"></div>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(i => <div key={i} className="board__legend board__legend--h">{i}</div>)}
                    <div className="board__legend board__legend--h board__legend--w"></div>
                </div>
            </div>
            <div className="legend">
                <LostFiguresComponent title="Белые фигуры" figures={board.lostWhiteFigures} />
                <LostFiguresComponent title="Черные фигуры" figures={board.lostBlackFigures} />
            </div>
        </div>
    </>);
}
export default BoardComponent;