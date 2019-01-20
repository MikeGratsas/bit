
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
        this.finished = false;
        this.result = 0;
        this.whiteTurn = true;
        this.selected = null;
        this.selectableForJump = null;
        this.board = board;
    }

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
                this.whiteTurn = !this.whiteTurn;
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
            this.whiteTurn = !this.whiteTurn;
            return true;
        }
        return false;
    }
}
