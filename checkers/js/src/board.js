class Board {
    constructor() {
        this.size = 8;
        this.position = defaultPosition();
    }

    constructor(size, pieces) {
        this.size = size;
        this.position = restorePosition(pieces);
    }

    defaultPosition() {
        var map = new Map();
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < this.size; j++) {
                if ((i + j) & 1 == 0) {
                    map.set(cell(i, j), new Man(true, i, j));
                }
            }
        }
        for (var i = 5; i < 8; i++) {
            for (var j = 0; j < this.size; j++) {
                if ((i + j) & 1 == 0) {
                    map.set(cell(i, j), new Man(false, i, j));
                }
            }
        }
        return map;
    }

    restorePosition(pieces = []) {
        var map = new Map();
        pieces.forEach(piece => {
            switch (piece.kind) {
                case 1:
                    map.set(cell(piece.row, piece.column), new Man(piece.white, piece.row, piece.column));
                    break;
                case 2:
                    map.set(cell(piece.row, piece.column), new King(piece.white, piece.row, piece.column));
                    break;
            }
        });
        return map;
    }

    get cell(row, column) {
        return String.fromCharCode(97 + column) + String.fromCharCode(49 + row);
    }
}
