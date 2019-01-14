class Board {
    constructor() {
        this.size = 8;
        this.position = defaultPosition();
    }

    constructor(size, ps) {
        this.size = size;
        this.position = restorePosition(ps);
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

    restorePosition(ps = []) {
        var piece = null;
        var map = new Map();
        ps.forEach(p => {
            switch (p.kind) {
                case Man.KIND:
                    piece = new Man(p.white, p.row, p.column);
                    break;
                case King.KIND:
                    piece = new King(p.white, p.row, p.column);
                    break;
            }
            if (piece != null)
              map.set(cell(p.row, p.column), piece);
        });
        return map;
    }

    cell(row, column) {
        return String.fromCharCode(97 + column) + String.fromCharCode(49 + row);
    }
}
