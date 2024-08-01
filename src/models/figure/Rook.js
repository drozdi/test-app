import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bR.png'
import whiteImg from '../../assets/chess/wR.png'

export class Bishop extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.ROOK;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
}
