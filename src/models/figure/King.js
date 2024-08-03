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
    canMove(target: Cell) {
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

        return false;
    }
}