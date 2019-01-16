
/**
 * Man
 * @description man
 * @extends Piece
 */
 class Man extends Piece {

    constructor(white, row, column) {
        super(1, white, row, column);
    }

    get kindClass() {
        return "man";
    }

    canMove(row, column) {
        return (row - this.row == (white ? 1 : -1)) && (Math.abs(column - this.column) == 1);
    }

    canCapture(/* Piece */ piece) {
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == 1) && (Math.abs(piece.column - this.column) == 1);
    }
}
