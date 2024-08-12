import { Colors } from "./Colors";
import { Figures } from "./figure/Base";

export class Cell {
    x = null;
    y = null;
    figure = null;
    color = null;
    board = null;
    key = null;
    _available = false;
    _attack = false;
    _rec = false;
    constructor(board, x, y, color, figure = null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
        this.figure = figure;
        this._available = false;
        this._attack = false;
        this._rec = false;
        this.key = `${x}-${y}`;
    }
    get attack() {
        return this._attack || (this._available && this.figure);
    }
    set attack(value) {
        this._attack = value;
    }
    get available() {
        return this._available && !this.figure
    }
    set available(value) {
        this._available = value
    }
    getCell(x, y) {
        return this.board.getCell(x, y)
    }
    setFigure(figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target) {
        if (this.figure?.canMove(target)) {
            this.board.numStep++;
            this.figure.moveToCell(target);
            if (target.figure) {
                this.board.addLostFigure(target.figure)
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
    is(label) {
        return this.figure?.is(label);
    }
    isEmpty() {
        return this.figure === null;
    }
    isEnemy(target) {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }



    underAttack(color) {
        if (this._rec) {
            return false;
        }
        this._rec = true;

        for (let i = 0; i < 8; i++) {
            if (this.getCell(i, this.y).figure?.canMove(this, false) &&
                this.getCell(i, this.y).figure?.color === color &&
                !this.getCell(i, this.y).figure?.is(Figures.PAWN)) {
                this._rec = false;
                return true;
            }
        }

        for (let i = 0; i < 8; i++) {
            if (this.getCell(this.x, i).figure?.canMove(this, false) &&
                this.getCell(this.x, i).figure?.color === color &&
                !this.getCell(this.x, i).figure?.is(Figures.PAWN)) {
                this._rec = false;
                return true;
            }
        }

        // диагональ
        let x = this.x;
        let y = this.y;
        while (x > 0 && y > 0) {
            x--;
            y--;
        }
        let s = 8 - Math.max(x, y);
        for (let i = 0; i < s; i++) {
            if (this.getCell(x + i, y + i).figure?.canMove(this, false) &&
                this.getCell(x + i, y + i).figure?.color === color &&
                !this.getCell(x + i, y + i).figure?.is(Figures.PAWN)) {
                this._rec = false;
                return true;
            }
        }

        //побочная диагональ
        x = this.x;
        y = this.y;
        while (x < 7 && y > 0) {
            x++;
            y--;
        }
        s = Math.max(x, y) - Math.min(x, y) + 1;
        for (let i = 0; i < s; i++) {
            if (this.getCell(x - i, y + i).figure?.canMove(this, false) &&
                this.getCell(x - i, y + i).figure?.color === color &&
                !this.getCell(x - i, y + i).figure?.is(Figures.PAWN)) {
                this._rec = false;
                return true;
            }
        }

        //пешки
        const direct = color === Colors.BLACK ? -1 : 1;
        if (this.y < 7 &&
            this.getCell(this.x + direct, this.y + 1).figure?.is(Figures.PAWN) &&
            this.getCell(this.x + direct, this.y + 1).figure?.color === color) {
            this._rec = false;
            return true;
        }
        if (this.y > 0 &&
            this.getCell(this.x + direct, this.y - 1).figure?.is(Figures.PAWN) &&
            this.getCell(this.x + direct, this.y - 1).figure?.color === color) {
            this._rec = false;
            return true;
        }

        //конь
        const steps = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
        for (let [x, y] of steps) {
            if (this.x + x > 7 || this.x + x < 0 || this.y + y > 7 || this.y + y < 0) {
                continue;
            }
            if (this.getCell(this.x + x, this.y + y).figure?.canMove(this, false) &&
                this.getCell(this.x + x, this.y + y).figure?.color === color &&
                this.getCell(this.x + x, this.y + y).figure?.is(Figures.KNIGHT)) {
                return true;
            }
        }

        this._rec = false;
        return false;
    }


    emptyV(target) {
        // проверка одной вертикали
        if (this.y !== target.y) {
            return false;
        }
        // определение границ
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        // проверка промежутка занятыми фигурами
        for (let i = min + 1; i <= max - 1; i++) {
            if (!this.board.cells[i][this.y].isEmpty()) {
                return false;
            }
        }
        return true;
    }

    emptyH(target) {
        // проверка одной горизонтали
        if (this.x !== target.x) {
            return false;
        }
        // определение границ
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        // проверка промежутка занятыми фигурами
        for (let i = min + 1; i <= max - 1; i++) {
            if (!this.board.cells[this.x][i].isEmpty()) {
                return false;
            }
        }
        return true;
    }

    emptyD(target) {
        // проверка одной диагонали и определение длины диогонали
        const ax = Math.abs(this.x - target.x);
        const ay = Math.abs(this.y - target.y);
        if (ax !== ay) {
            return false;
        }
        // определения напровления
        const dx = this.x < target.x ? 1 : -1;
        const dy = this.y < target.y ? 1 : -1;
        // перебор клеток в диагонали
        for (let i = 1; i < ax; i++) {
            // определение координат
            const x = this.x + dx * i;
            const y = this.y + dy * i;
            // проверка клетки
            if (!this.board.cells[x][y].isEmpty()) {
                return false;
            }
        }

        return true;
    }
}