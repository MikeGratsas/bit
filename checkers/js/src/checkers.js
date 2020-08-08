/**
* Russian Checkers
* @description Russian checkers factory
*/
class RussianCheckers {

    /**
     * @function constructor
     * @description Create checkers board
     * @access public
     *
     * @param {number} initRows number of rows to initialize
     *
     */
    constructor(initRows = 3) {
        this.initRows = initRows;
    }

    /**
     * @function createBoard
     * @description create the board
     * @access public
     *
     * @return {Board} board
     *
     */
    createBoard() {
        return new Board();
    }

    /**
     * @function setupBoard
     * @description setup default initial position on the board
     * @access public
     *
     * @param {Board} board board
     *
     */
    setupBoard(board) {
        var i, j;
        var cell = new Cell(0, 0);
        for (i = 0; i < this.initRows; i++) {
            cell.row = i;
            for (j = 0; j < board.size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    board.setPiece(cell.cellId, new Man(true, i, j));
                }
            }
        }
        for (i = board.size - this.initRows; i < board.size; i++) {
            cell.row = i;
            for (j = 0; j < board.size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    board.setPiece(cell.cellId, new Man(false, i, j));
                }
            }
        }
    }

    /**
     * @function loadBoard
     * @description load position to the board
     * @access public
     *
     * @param {Board} board board
     * @param {array} position
     *
     */
    loadBoard(board, pos = []) {
        var piece = null;
        var cell = new Cell(0, 0);
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
                board.setPiece(cell.cellId, piece);
            }
        });
    }

    /**
     * @function createGame
     * @description create the game
     * @access public
     *
     * @param {Board} board board
     *
     * @return {Game} board
     */
    createGame(board) {
        return new Game(board);
    }

}
