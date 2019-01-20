/**
 * Cell
 * @description checkers board cell
 * @abstract
 */
class Cell {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     */
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    /**
     * @function cellId
     * @description get cell id
     * @access public
     *
     * @return {string} cell id
     */
    get cellId() {
        return String.fromCharCode(97 + this.column) + String.fromCharCode(49 + this.row);
    }

    /**
     * @function fromId
     * @description get cell by id
     * @access public
     *
     * @param {string} id  cell id
      *
     * @return {Cell} cell
     */
    static fromId(id) {
        return new Cell(id.charCodeAt(1) - 49, id.charCodeAt(0) - 97);
    }
}