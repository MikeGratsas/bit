
 /**
  * King
  * @description king
  * @extends Piece
  */
class King extends Piece {

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
        super(2, white, row, column);
    }

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */
    get kindClass() {
        return "king";
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
        return Math.abs(cell.row - this.row) == Math.abs(cell.column - this.column);
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
        var rowDistance = cell.row - this.row;
        var columnDistance = cell.column - this.column;
        if (Math.abs(rowDistance) == Math.abs(columnDistance)) {
            var distance = Math.abs(rowDistance);
            var captureCell = new Cell(this.row, this.column);
            for (var i = 1; i < distance; i++) {
                captureCell.row = this.row + (rowDistance > 0 ? i : - i);
                captureCell.column = this.column + (columnDistance > 0 ? i : - i);
                var cellId = captureCell.cellId;
                var piece = board.getPiece(cellId);
                if (piece != null) {
                    if (i + 1 == distance && this.canCapture(piece))
                        return cellId;
                    break;
                }
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
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == Math.abs(piece.column - this.column));
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
        var i, limit, piece;
        if (this.row > 1) {
            if (this.column > 1) {
                limit = Math.min(this.row, this.column) - 1;
                for (i = 1; i < limit; i++) {
                    piece = board.getCellPiece(this.row - i, this.column - i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row - i - 1, this.column - i - 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
            if (this.column < board.size - 2) {
                limit = Math.min(this.row, board.size - this.column - 1) - 1;
                for (i = 1; i < limit; i++) {
                    piece = board.getCellPiece(this.row - i, this.column + i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row - i - 1, this.column + i + 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
        }
        if (this.row < board.size - 2) {
            if (this.column > 1) {
                limit = Math.min(board.size - this.row - 1, this.column) - 1;
                for (i = 1; i < limit; i++) {
                    piece = board.getCellPiece(this.row + i, this.column - i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row + i + 1, this.column - i - 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
            if (this.column < board.size - 2) {
                limit = Math.min(board.size - this.row - 1, board.size - this.column - 1) - 1;
                for (i = 1; i < limit; i++) {
                    piece = board.getCellPiece(this.row + i, this.column + i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row + i + 1, this.column + i + 1) == null)
                                return true;
                        }
                        break;
                    }
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
          if (this.row < board.size - 1) {
              if (this.column > 0) {
                  if (board.getCellPiece(this.row + 1, this.column - 1) == null)
                      return true;
              }
              if (this.column < board.size - 1) {
                  if (board.getCellPiece(this.row + 1, this.column + 1) == null)
                      return true;
              }
          }
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
          return false;
      }
}
