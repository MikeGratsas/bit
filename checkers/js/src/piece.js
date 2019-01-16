
 /**
  * Piece
  * @description checkers piece
  * @abstract
  */
  class Piece {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {number} kind   kind of piece
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */
    constructor(kind, white, row, column) {
        this.kind = kind;
        this.white = white;
        this.row = row;
        this.column = column;
    }

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */
    get kindClass() {
        return null;
    }

    /**
     * @function canMove
     * @description if can move piece
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     *
     * @return {boolean} if can move
     */
    canMove(row, column) {
        return false;
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
    canCapture(/* Piece */ piece) {
        return false;
    }

    /**
     * @function move
     * @description move this piece
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     *
     * @return {Piece} this piece
     */
    move(row, column) {
        this.row = row;
        this.column = column;
        return this;
    }
}
