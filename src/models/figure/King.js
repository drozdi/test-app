import { Base, Figures } from './Base.js';
import { Colors } from '../Colors.js';
import blackImg from '../../assets/chess/bK.png'
import whiteImg from '../../assets/chess/wK.png'

export class Bishop extends Base {
    constructor(color, cell) {
        super(color, cell);
        this.label = Figures.KING;
        this.img = color === Colors.BLACK ? blackImg : whiteImg;
    }
}