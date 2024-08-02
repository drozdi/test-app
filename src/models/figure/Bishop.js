import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bB.png'
import whiteImg from '../../assets/chess/wB.png'

export class Bishop extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.BISHOP;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
    canMove(target) {
        if (!super.canMove(target)) {
            return false;
        }
        if (this.cell.emptyD(target)) {
            return true;
        }
        return false;
    }
}