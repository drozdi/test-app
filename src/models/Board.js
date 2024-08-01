import { Cell } from "./Cell";
import { Colors } from "./Colors";
export class Board {
    cells = [];
    init() {
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, i, j, Colors.BLACK)); //Black
                } else {
                    row.push(new Cell(this, i, j, Colors.WHITE));
                }
            }
            this.cells.push(row);
        }
    }
}