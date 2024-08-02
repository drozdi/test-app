import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figure/Pawn";
import { King } from "./figure/King";
import { Queen } from "./figure/Queen";
import { Knight } from "./figure/Knight";
import { Bishop } from "./figure/Bishop";
import { Rook } from "./figure/Rook";
export class Board {
    cells = [];
    generateCells() {
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, i, j, Colors.BLACK)); //Black
                } else {
                    row.push(new Cell(this, i, j, Colors.WHITE));
                }
            }
            this.cells.push(row);
        }
    }
    generateFigures() {
        this.generatePawns();
        this.generateKings();
        this.generateQueens();
        this.generateBishops();
        this.generateKnights();
        this.generateRooks();
    }
    generatePawns () {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.cells[1][i]);
            new Pawn(Colors.BLACK, this.cells[6][i]);
        }
    }
    generateKings () {
        new King(Colors.WHITE, this.cells[0][4]);
        new King(Colors.BLACK, this.cells[7][4]);
    }
    generateQueens () {
        new Queen(Colors.WHITE, this.cells[0][3]);
        new Queen(Colors.BLACK, this.cells[7][3]);
    }
    generateBishops () {
        new Bishop(Colors.WHITE, this.cells[0][2]);
        new Bishop(Colors.BLACK, this.cells[7][2]);
        new Bishop(Colors.WHITE, this.cells[0][5]);
        new Bishop(Colors.BLACK, this.cells[7][5]);
    }
    generateKnights () {
        new Knight(Colors.WHITE, this.cells[0][1]);
        new Knight(Colors.BLACK, this.cells[7][1]);
        new Knight(Colors.WHITE, this.cells[0][6]);
        new Knight(Colors.BLACK, this.cells[7][6]);
    }
    generateRooks () {
        new Rook(Colors.WHITE, this.cells[0][0]);
        new Rook(Colors.BLACK, this.cells[7][0]);
        new Rook(Colors.WHITE, this.cells[0][7]);
        new Rook(Colors.BLACK, this.cells[7][7]);
    }

    copy () {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    canMove (selectedCell) {
        for (let i = 0; i < this.cells.length; i++) { 
           const row =  this.cells[i];
           for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
           }
        }
    }
}