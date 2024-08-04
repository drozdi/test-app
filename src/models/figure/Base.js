
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
    isFirstStep = true;

    constructor(color, cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.img = null;
        this.key = Math.random();
        this.label = Figures.BASE;
    }

    canMove(target) {
        if (this.color === target.figure?.color) {
            return false;
        }
        return true;
    }

    moveToCell(target) {
        this.isFirstStep = false;
    }

}