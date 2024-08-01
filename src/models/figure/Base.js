
export const Figures = {
    BASE: 'Фигура',
    PAWN: 'Пешка',
    KING: 'Кароль',
    QUEEN: 'Ферзь',
    KNIGHT: 'Конь',
    BISHOP: 'Слон',
    ROOK: 'Ладья'
}

export class Base {
    color = null;
    cell = null;
    label = null;
    key = null;
    img = null;

    constructor(color, cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.img = null;
        this.key = Math.random();
        this.label = Figures.BASE;
    }

    canMove(target) {
        return true;
    }

    moveCell(target) {

    }

}