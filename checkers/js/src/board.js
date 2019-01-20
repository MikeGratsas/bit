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
        this.position = (position != null) ? position : Board.defaultPosition(size);
        this._onSet = new Set();
        this._onDelete = new Set();
    }

    onSet(f) {
        this._onSet.add(f);
        return this;
    }

    offSet(f) {
        this._onSet.delete(f);
        return this;
    }

    onDelete(f) {
        this._onDelete.add(f);
        return this;
    }

    offDelete(f) {
        this._onDelete.delete(f);
        return this;
    }

    /**
     * @static defaultPosition
     * @description default initial position
     * @access public
     *
     * @param {number} size board size
     * @param {number} initRows number of rows to initialize
     *
     * @return {Map} map
     */
    static defaultPosition(size = 8, initRows = 3) {
        var cell = new Cell(0, 0);
        var map = new Map();
        for (var i = 0; i < initRows; i++) {
            cell.row = i;
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    map.set(cell.cellId, new Man(true, i, j));
                }
            }
        }
        for (var i = size - initRows; i < size; i++) {
            cell.row = i;
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    map.set(cell.cellId, new Man(false, i, j));
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
        var cell = new Cell(0, 0);
        var map = new Map();
        pos.forEach(p => {
            switch (p.kind) {
                case 1:
                    piece = new Man(p.white, p.row, p.column);
                    break;
                case 2:
                    piece = new King(p.white, p.row, p.column);
                    break;
            }
            if (piece != null) {
                cell.row = p.row;
                cell.column = p.column;
                map.set(cell.cellId, piece);
            }
        });
        return map;
    }

    storePosition() {
        return Array.from(this.position.values());
    }

    /**
     * @function getCellPiece
     * @description get piece in the cell
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     *
     * @return {Piece} piece in the cell
     */
    getCellPiece(row, column) {
        var cell = new Cell(row, column);
        return this.getPiece(cell.cellId);
    }

    findSelectableForJump(white) {
        var selectable = [];
        this.position.forEach((piece, id) => {
            if (piece.white == white && piece.isSelectableForJump(this)) {
                selectable.push(id);
            }
        });
        return selectable;
    }

    countPieces(white) {
        var count = 0;
        this.position.forEach((piece, id) => {
            if (piece.white == white) {
                count++;
            }
        });
       return count;
    }

    /**
     * @function getPiece
     * @description get piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     *
     * @return {Piece} piece in the cell
     */
    getPiece(id) {
        return this.position.get(id);
    }

    setPiece(id, piece) {
        var previous = this.position.get(id);
        this.position.set(id, piece);
        this._onSet.forEach(f => f(piece, id));
        return previous;
    }

    deletePiece(id) {
        var piece = this.position.get(id);
        if (piece != null) {
            this.position.delete(id);
            this._onDelete.forEach(f => f(piece, id));
        }
        return piece;
    }
}
