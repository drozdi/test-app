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

        if (
            (dx === 1 && dy === 0) ||
            (dx === 0 && dy === 1) ||
            (dx === 1 && dy === 1)
        ) {
            return true;
        }
        // рекировка
        if (this.isFirstStep) {
            // одна линия
            if (dx !== 0) {
                return false;
            }
            if (dy === 2) {
                const direct = target.y - this.cell.y
                console.log(this.cell.x, this.cell.y)
                if (direct < 0) {
                    if (this.cell.board.cells[this.cell.x][0].figure !== Figures.ROOK &&
                        !this.cell.board.cells[this.cell.x][0].figure.isFirstStep
                    ) {
                        return false;
                    }
                    for (let i = 1; i < this.cell.y; i++) {
                        if (!this.cell.board.cells[this.cell.x][i].isEmpty()) {
                            return false;
                        }
                    }
                } else if (direct > 0) {
                    if (this.cell.board.cells[this.cell.x][7].figure !== Figures.ROOK &&
                        !this.cell.board.cells[this.cell.x][7].figure.isFirstStep
                    ) {
                        return false;
                    }
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
}