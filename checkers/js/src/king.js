class King extends Piece {
    const KIND = 2;

    constructor(white, row, column) {
        super(KIND, white, row, column);
    }

    canMove(row, column) {
        return Math.abs(row - this.row) == Math.abs(column - this.column);
    }

    canCapture(/* Piece */ piece) {
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == Math.abs(piece.column - this.column));
    }
}
