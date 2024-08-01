
export class Cell {
    x = null;
    y = null;
    figure = null;
    color = null;
    board = null;
    key = null;
    available = false;
    constructor(board, x, y, color, figure = null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
        this.figure = figure;
        this.available = false;
        this.key = `${x}-${y}`;
    }
}