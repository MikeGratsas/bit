class Board {

    /**
     * @function constructor
     * @description Create checkers board
     * @access public
     *
     * @param {number}  board size
     * @param {Map} board initial position
     *
     * @return {type} Description
     */
    constructor(size = 8, position = null) {
        this.size = size;
        this.position = (position != null)? position: Board.defaultPosition(size);
    }

    static defaultPosition(size = 8, initRows = 3) {
        var map = new Map();
        for (var i = 0; i < initRows; i++) {
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    map.set(Board.cell(i, j), new Man(true, i, j));
                }
            }
        }
        for (var i = size - initRows; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    map.set(Board.cell(i, j), new Man(false, i, j));
                }
            }
        }
        return map;
    }

    /**
     * @static loadPosition
     * @description Description
     * @access public
     *
     * @param {array} position
     *
     * @return {Map} map
     */
    static loadPosition(pos = []) {
        var piece = null;
        var map = new Map();
        pos.forEach(p => {
            switch (p.kind) {
                case 2:
                    piece = new Man(p.white, p.row, p.column);
                    break;
                case 1:
                    piece = new King(p.white, p.row, p.column);
                    break;
            }
            if (piece != null)
              map.set(Board.cell(p.row, p.column), piece);
        });
        return map;
    }

    storePosition() {
        return Array.from(this.position.values());
    }

    static cell(row, column) {
        return String.fromCharCode(97 + column) + String.fromCharCode(49 + row);
    }
}
