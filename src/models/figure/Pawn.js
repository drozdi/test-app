import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bP.png'
import whiteImg from '../../assets/chess/wP.png'

export class Pawn extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.PAWN;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
    canMove(target, isColor) {
        if (!super.canMove(target, isColor)) {
            return false;
        }

        const direct = this.color === Colors.BLACK ? 1 : -1;
        const firstDirect = this.color === Colors.BLACK ? 2 : -2;

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
        if ((target.x === this.cell.x + direct) &&
            Math.abs(target.y - this.cell.y) === 1 &&
            this.cell.isEnemy(target)) {
            return true;
        }

        //взятие на проходе
        if (target.x === this.cell.x + direct &&
            Math.abs(target.y - this.cell.y) === 1 &&
            this.cell.board.cells[target.x - direct][target.y].is(Figures.PAWN) &&
            this.cell.board.cells[target.x - direct][target.y].figure.isCurrentStep &&
            this.cell.board.cells[target.x - direct][target.y].figure.isSecondStep &&
            this.cell.isEnemy(this.cell.board.cells[target.x - direct][target.y])) {
            this.cell.board.cells[target.x - direct][target.y].attack = true;
            return true;
        }

        return false;
    }

    moveToCell(target) {
        super.moveToCell(target);
        const direct = this.color === Colors.BLACK ? 1 : -1;

        const dx = target.x - this.cell.x;
        const dy = target.y - this.cell.y;

        if (dy !== 0 && dx === direct && this.cell.board.cells[target.x - direct][target.y].is(Figures.PAWN) &&
            this.cell.board.cells[target.x - direct][target.y].isEnemy(this.cell)) {
            this.cell.board.addLostFigure(this.cell.board.cells[target.x - direct][target.y].figure)
            this.cell.board.cells[target.x - direct][target.y].figure = null;
            this.cell.board.cells[target.x - direct][target.y].attack = false;
        }
    }
}