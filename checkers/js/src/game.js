
/**
 * Game
 * @description checkers game
 */
class Game {
    /**
     * @function constructor
     * @description checkers game
     * @access public
     *
     * @param {Board} board board
     */
    constructor(board) {
        this.id = Math.floor(Math.random() * 10000);
        this.finished = false;
        this.result = 0;
        this.whiteTurn = true;
        this.selected = null;
        this.selectableForJump = null;
        this.board = board;
        this._onTurn = new Set();
    }

    /**
     * @function onTurn
     * @description subscribe to event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Game} this game
     */
    onTurn(f) {
        this._onTurn.add(f);
        return this;
    }

    /**
     * @function offTurn
     * @description subscribe from event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Game} this game
     */
    offTurn(f) {
        this._onTurn.delete(f);
        return this;
    }

    /**
     * @function toggleTurn
     * @description toggle player turn
     * @access public
     *
     */
    toggleTurn() {
      this.whiteTurn = !this.whiteTurn;
      this._onTurn.forEach(f => f(this.whiteTurn));
    }

    /**
     * @function prepare
     * @description prepare to find selectable for current player jump
     * @access public
     *
     */
    prepare() {
        if (this.selectableForJump == null) {
            this.selectableForJump = this.board.findSelectableForJump(this.whiteTurn);
        }
    }

    /**
     * @function tryToJump
     * @description try to jump to id
     * @access public
     *
     * @param {Piece}  piece piece
     * @param {string} id    cell id
     *
     * @return {boolean} if can jump
     */
    tryToJump(piece, id) {
        var cell = Cell.fromId(id);
        var captureId = piece.findCapture(this.board, cell);
        if (captureId != null) {
            this.board.deletePiece(captureId);
            this.board.deletePiece(this.selected);
            var moved = piece.move(this.board, cell);
            this.board.setPiece(id, moved);
            if (moved.isSelectableForJump(this.board)) {
                this.selected = id;
            }
            else {
                this.selected = null;
                this.selectableForJump = null;
                this.toggleTurn();
                if (this.board.countPieces(this.whiteTurn) == 0) {
                    this.finished = true;
                    this.result = this.whiteTurn ? -1 : 1;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * @function tryToMove
     * @description try to move to id
     * @access public
     *
     * @param {Piece}  piece piece
     * @param {string} id    cell id
     *
     * @return {boolean} if can move
     */
    tryToMove(piece, id) {
        var cell = Cell.fromId(id);
        if (piece.canMove(cell)) {
            this.board.deletePiece(this.selected);
            this.board.setPiece(id, piece.move(this.board, cell));
            this.selected = null;
            this.selectableForJump = null;
            this.toggleTurn();
            return true;
        }
        return false;
    }

    /**
     * @function load
     * @description load from restored object
     * @access public
     *
     * @param {object} obj Description
     */
    load(obj) {
        this.id = obj.id;
        this.finished = obj.finished;
        this.result = obj.result;
        this.whiteTurn = obj.whiteTurn;
        this.selected = obj.selected;
        this.selectableForJump = obj.selectableForJump;
    }
}
