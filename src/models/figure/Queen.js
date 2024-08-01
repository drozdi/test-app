import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bQ.png'
import whiteImg from '../../assets/chess/wQ.png'

export class Bishop extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.QUEEN;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
}
