class Piece {
    constructor(kind, white, row, column) {
        this.kind = kind;
        this.white = white;
        this.row = row;
        this.column = column;
    }

    get kind() {
        return this.kind;
    }

    canMove(row, column) {
        return false;
    }

    canCapture(/* Piece */ piece) {
        return false;
    }

    move(row, column) {
        this.row = row;
        this.column = column;
        return this;
    }
}
