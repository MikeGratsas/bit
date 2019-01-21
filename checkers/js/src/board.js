/**
* Checkers Board
* @description checkers board
*/
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
    constructor(size = 8) {
        this.size = size;
        this.position = new Map();
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

    clear() {
        this.position.clear();
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

    /**
     * @function setPiece
     * @description set piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     * @param {Piece} piece  piece to be set
     *
     * @return {Piece} previous piece in the cell
     */
    setPiece(id, piece) {
        var previous = this.position.get(id);
        this.position.set(id, piece);
        this._onSet.forEach(f => f(piece, id));
        return previous;
    }

    /**
     * @function deletePiece
     * @description delete piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     *
     * @return {Piece} previous piece in the cell
     */
    deletePiece(id) {
        var piece = this.position.get(id);
        if (piece != null) {
            this.position.delete(id);
            this._onDelete.forEach(f => f(piece, id));
        }
        return piece;
    }

    toJSON() {
        return Array.from(this.position.values());
    }
}
