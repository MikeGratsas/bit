class Man extends Piece {
    const KIND = 1;
  
    constructor(white, row, column) {
        super(KIND, white, row, column);
    }

    canMove(row, column) {
        return (row - this.row == (white ? 1 : -1)) && (Math.abs(column - this.column) == 1);
    }

    canCapture(/* Piece */ piece) {
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == 1) && (Math.abs(piece.column - this.column) == 1);
    }
}
