import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figure/Pawn";
import { King } from "./figure/King";
import { Queen } from "./figure/Queen";
import { Knight } from "./figure/Knight";
import { Bishop } from "./figure/Bishop";
import { Rook } from "./figure/Rook";
export class Board {
    numStep = 0;
    cells = [];
    lostBlackFigures = [];
    lostWhiteFigures = [];
    getCell(x, y) {
        return this.cells[x][y];
    }
    /**
    * Generate the cells
    * void generateCells() {}
    */
    generateCells() {
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, i, j, Colors.WHITE));
                } else {
                    row.push(new Cell(this, i, j, Colors.BLACK));
                }
            }
            this.cells.push(row);
        }
    }
    /**
    * Copy board
    * @returns Board
    */
    copy() {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }
    /**
    * void lightCells(Cell selectedCell)
    */
    lightCells(selectedCell) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }
    addLostFigure(figure) {
        if (figure.color === Colors.WHITE) {
            this.lostWhiteFigures.push(figure);
        } else {
            this.lostBlackFigures.push(figure);
        }
    }
}