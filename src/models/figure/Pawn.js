import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bP.png'
import whiteImg from '../../assets/chess/wP.png'

export class Pawn extends Base {
    isFirstStep = true;
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.PAWN;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
    canMove(target) {
        if (!super.canMove(target)) {
            return false;
        }
        const direct = this.color === Colors.BLACK ? -1 : 1;
        const firstDirect = this.color === Colors.BLACK ? -2 : 2;

        if (target.x === this.cell.x + direct &&
            target.y === this.cell.y &&
            this.cell.board.cells[target.x][target.y].isEmpty()) {
            return true;
        }
        // ход на одну клетку
        if (target.x === this.cell.x + direct &&
            target.y === this.cell.y &&
            this.cell.board.cells[target.x][target.y].isEmpty()) {
            return true;
        }
        // ход на две клетки
        if (this.isFirstStep &&
            target.x === this.cell.x + firstDirect &&
            target.y === this.cell.y &&
            this.cell.board.cells[target.x][target.y].isEmpty() &&
            this.cell.board.cells[target.x - direct][target.y].isEmpty()) {
            return true;
        }
        // ход в атаку
        if ((target.x === this.cell.x + direct) && (
            target.y === this.cell.y + 1 || target.y === this.cell.y - 1
        ) && this.cell.isEnemy(target)) {
            return true;
        }

        return false;
    }
    moveToCell(target) {
        super.moveToCell(target);
        this.isFirstStep = false;
    }
}