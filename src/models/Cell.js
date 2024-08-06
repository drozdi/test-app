import { Colors } from "./Colors";

export class Cell {
    x = null;
    y = null;
    figure = null;
    color = null;
    board = null;
    key = null;
    _available = false;
    _attack = false;
    constructor(board, x, y, color, figure = null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.board = board;
        this.figure = figure;
        this.available = false;
        this.key = `${x}-${y}`;
    }
    get attack() {
        return this._attack || this.available && this.figure
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
        color = color || Colors.WHITE === this.figure?.color? Colors.BLACK: Colors.BLACK === this.figure?.color? Colors.WHITE: undefined;
        
        
        for (let i = 0; i < 8; i++) {
            if (this.getCell(i, this.y).figure?.canMove(this)) {
                return true;
            }
        }
        for (let i = 0; i < 8; i++) {
            if (this.getCell(this.x, i).figure?.canMove(this)) {
                return true;
            }
        }
        
        //const dx = 7 - this.x;
        //const dy = 7 - this.y;
        
        
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