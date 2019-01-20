
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
     * @function colorClass
     * @description get color class
     * @access public
     *
     * @return {string} color class
     */
    get colorClass() {
        return this.white ? 'white' : 'black';
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
     * @param {Cell}  cell  board cell
     *
     * @return {boolean} if can move
     */
    canMove(cell) {
        return false;
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
        return false;
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
        this.row = cell.row;
        this.column = cell.column;
        return this;
    }
}
