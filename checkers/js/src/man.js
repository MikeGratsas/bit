
/**
 * Man
 * @description man
 * @extends Piece
 */
class Man extends Piece {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */
    constructor(white, row, column) {
        super(1, white, row, column);
    }

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */
    get kindClass() {
        return "man";
    }

    /**
     * @function canMove
     * @description if can move piece
     * @access public
     *
     * @param {Cell}  cell  board cell
     *
     * @return {boolean} if can move
     */
    canMove(cell) {
        return (cell.row - this.row == (this.white ? 1 : -1)) && (Math.abs(cell.column - this.column) == 1);
    }


    /**
     * @function findCapture
     * @description find piece to caputue
     * @access public
     *
     * @param {Board} board checkers board
     * @param {Cell}  cell  board cell to jump
     *
     * @return {string} cell id to caputue
     */
    findCapture(board, cell) {
        if ((Math.abs(cell.row - this.row) == 2) && (Math.abs(cell.column - this.column) == 2)) {
            var row = (cell.row + this.row) / 2;
            var column = (cell.column + this.column) / 2;
            var captureCell = new Cell(row, column);
            var cellId = captureCell.cellId;
            var piece = board.getPiece(cellId);
            if (piece != null && this.canCapture(piece)) {
                return cellId;
            }
        }
        return null;
    }

    /**
     * @function canCapture
     * @description if can capture piece
     * @access public
     *
     * @param {Piece} piece another piece
     *
     * @return {boolean} if can capture
     */
    canCapture(piece) {
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == 1) && (Math.abs(piece.column - this.column) == 1);
    }

    /**
     * @function isSelectableForJump
     * @description if can select piece for jump
     * @access public
     *
     * @param {Board} board checkers board
     *
     * @return {boolean} if is selectable for jump
     */
    isSelectableForJump(board) {
        if (this.row > 1) {
            if (this.column > 1) {
                var piece = board.getCellPiece(this.row - 1, this.column - 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row - 2, this.column - 2) == null)
                        return true;
                }
            }
            if (this.column < board.size - 2) {
                var piece = board.getCellPiece(this.row - 1, this.column + 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row - 2, this.column + 2) == null)
                        return true;
                }
            }
        }
        if (this.row < board.size - 2) {
            if (this.column > 1) {
                var piece = board.getCellPiece(this.row + 1, this.column - 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row + 2, this.column - 2) == null)
                        return true;
                }
            }
            if (this.column < board.size - 2) {
                var piece = board.getCellPiece(this.row + 1, this.column + 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row + 2, this.column + 2) == null)
                        return true;
                }
            }
        }
        return false;
    }

    /**
     * @function isSelectableToMove
     * @description if can select piece to move
     * @access public
     *
     * @param {Board} board checkers board
     *
     * @return {boolean} if is selectable to move
     */
    isSelectableToMove(board) {
        if (this.white) {
            if (this.row < board.size - 1) {
                if (this.column > 1) {
                    if (board.getCellPiece(this.row + 1, this.column - 1) == null)
                        return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row + 1, this.column + 1) == null)
                        return true;
                }
            }
        }
        else {
            if (this.row > 0) {
                if (this.column > 0) {
                    if (board.getCellPiece(this.row - 1, this.column - 1) == null)
                        return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row - 1, this.column + 1) == null)
                        return true;
                }
            }
        }
        return false;
    }

    /**
     * @function move
     * @description move this piece
     * @access public
     *
     * @param {Board} board checkers board
     * @param {Cell}  cell  board cell
     *
     * @return {Piece} this piece
     */
    move(board, cell) {
        if (cell.row == (this.white ? board.size - 1 : 0))
            return new King(this.white, cell.row, cell.column);
        return super.move(board, cell);
    }
}
