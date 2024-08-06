import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bK.png'
import whiteImg from '../../assets/chess/wK.png'

export class King extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.KING;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
    canMove(target) {
        if (!super.canMove(target)) {
            return false;
        }
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        /*if (
            (dx === 1 && dy === 0) ||
            (dx === 0 && dy === 1) ||
            (dx === 1 && dy === 1)
        ) {
            return true;
        }*/

        if (this.cell.emptyH(target)) {
            return dx === 1 || target.x === this.cell.x + 1;
        }

        if (this.cell.emptyV(target)) {
            return dy === 1 || target.y === this.cell.y + 1;
        }

        if (this.cell.emptyD(target)) {
            return dx === 1 && dy === 1;
        }

        // рекировка
        if (this.countSteps === 0) {
            // одна линия
            if (dx !== 0) {
                return false;
            }
            if (dy === 2) {
                const direct = target.y - this.cell.y
                if (direct < 0) {
                    // крайняя ладья и неходила 
                    if (!this.cell.board.cells[this.cell.x][0]?.figure?.is(Figures.ROOK) ||
                        !this.cell.board.cells[this.cell.x][0]?.figure?.isFirstStep
                    ) {
                        return false;
                    }
                    // нет других фигур
                    for (let i = 1; i < this.cell.y; i++) {
                        if (!this.cell.board.cells[this.cell.x][i].isEmpty()) {
                            return false;
                        }
                    }
                } else if (direct > 0) {
                    // крайняя ладья и неходила 
                    if (!this.cell.board.cells[this.cell.x][7]?.figure?.is(Figures.ROOK) ||
                        !this.cell.board.cells[this.cell.x][7]?.figure?.isFirstStep
                    ) {
                        return false;
                    }
                    // нет других фигур
                    for (let i = this.cell.y + 1; i < 7; i++) {
                        if (!this.cell.board.cells[this.cell.x][i].isEmpty()) {
                            return false;
                        }
                    }
                }

                return true;
            }
        }

        return false;
    }
    moveToCell(target) {
        super.moveToCell(target);
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);
        if (dx === 0 && dy === 2) {
            const direct = target.y - this.cell.y;
            if (direct < 0) {
                this.cell.board.cells[this.cell.x][0].moveFigure(this.cell.board.cells[this.cell.x][target.y + 1])
            } else if (direct > 0) {
                this.cell.board.cells[this.cell.x][7].moveFigure(this.cell.board.cells[this.cell.x][target.y - 1])
            }
        }
    }
}