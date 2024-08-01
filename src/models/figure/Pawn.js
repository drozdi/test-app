import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bP.png'
import whiteImg from '../../assets/chess/wP.png'

export class Bishop extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.PAWN;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
}