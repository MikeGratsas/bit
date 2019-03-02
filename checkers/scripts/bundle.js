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


/**
 * Man
 * @description man
 * @extends Piece
 */
class Man extends Piece {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */
    constructor(white, row, column) {
        super(1, white, row, column);
    }

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */
    get kindClass() {
        return "man";
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
        return (cell.row - this.row == (this.white ? 1 : -1)) && (Math.abs(cell.column - this.column) == 1);
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
        if ((Math.abs(cell.row - this.row) == 2) && (Math.abs(cell.column - this.column) == 2)) {
            var row = (cell.row + this.row) / 2;
            var column = (cell.column + this.column) / 2;
            var captureCell = new Cell(row, column);
            var cellId = captureCell.cellId;
            var piece = board.getPiece(cellId);
            if (piece != null && this.canCapture(piece)) {
                return cellId;
            }
        }
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
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == 1) && (Math.abs(piece.column - this.column) == 1);
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
        if (this.row > 1) {
            if (this.column > 1) {
                var piece = board.getCellPiece(this.row - 1, this.column - 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row - 2, this.column - 2) == null)
                        return true;
                }
            }
            if (this.column < board.size - 2) {
                var piece = board.getCellPiece(this.row - 1, this.column + 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row - 2, this.column + 2) == null)
                        return true;
                }
            }
        }
        if (this.row < board.size - 2) {
            if (this.column > 1) {
                var piece = board.getCellPiece(this.row + 1, this.column - 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row + 2, this.column - 2) == null)
                        return true;
                }
            }
            if (this.column < board.size - 2) {
                var piece = board.getCellPiece(this.row + 1, this.column + 1);
                if (piece != null && this.canCapture(piece)) {
                    if (board.getCellPiece(this.row + 2, this.column + 2) == null)
                        return true;
                }
            }
        }
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
        if (this.white) {
            if (this.row < board.size - 1) {
                if (this.column > 0) {
                    if (board.getCellPiece(this.row + 1, this.column - 1) == null)
                        return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row + 1, this.column + 1) == null)
                        return true;
                }
            }
        }
        else {
            if (this.row > 0) {
                if (this.column > 0) {
                    if (board.getCellPiece(this.row - 1, this.column - 1) == null)
                        return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row - 1, this.column + 1) == null)
                        return true;
                }
            }
        }
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
        if (cell.row == (this.white ? board.size - 1 : 0))
            return new King(this.white, cell.row, cell.column);
        return super.move(board, cell);
    }
}


 /**
  * King
  * @description king
  * @extends Piece
  */
class King extends Piece {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */
    constructor(white, row, column) {
        super(2, white, row, column);
    }

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */
    get kindClass() {
        return "king";
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
        return Math.abs(cell.row - this.row) == Math.abs(cell.column - this.column);
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
        var rowDistance = cell.row - this.row;
        var columnDistance = cell.column - this.column;
        if (Math.abs(rowDistance) == Math.abs(columnDistance)) {
            var distance = Math.abs(rowDistance);
            var captureCell = new Cell(this.row, this.column);
            for (var i = 1; i < distance; i++) {
                captureCell.row = this.row + (rowDistance > 0 ? i : - i);
                captureCell.column = this.column + (columnDistance > 0 ? i : - i);
                var cellId = captureCell.cellId;
                var piece = board.getPiece(cellId);
                if (piece != null) {
                    if (i + 1 == distance && this.canCapture(piece))
                        return cellId;
                    break;
                }
            }
        }
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
        return (this.white != piece.white) && (Math.abs(piece.row - this.row) == Math.abs(piece.column - this.column));
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
        if (this.row > 1) {
            if (this.column > 1) {
                var limit = Math.min(this.row, this.column) - 1;
                for (var i = 1; i < limit; i++) {
                    var piece = board.getCellPiece(this.row - i, this.column - i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row - i - 1, this.column - i - 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
            if (this.column < board.size - 2) {
                var limit = Math.min(this.row, board.size - this.column - 1) - 1;
                for (var i = 1; i < limit; i++) {
                    var piece = board.getCellPiece(this.row - i, this.column + i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row - i - 1, this.column + i + 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
        }
        if (this.row < board.size - 2) {
            if (this.column > 1) {
                var limit = Math.min(board.size - this.row - 1, this.column) - 1;
                for (var i = 1; i < limit; i++) {
                    var piece = board.getCellPiece(this.row + i, this.column - i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row + i + 1, this.column - i - 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
            if (this.column < board.size - 2) {
                var limit = Math.min(board.size - this.row - 1, board.size - this.column - 1) - 1;
                for (var i = 1; i < limit; i++) {
                    var piece = board.getCellPiece(this.row + i, this.column + i);
                    if (piece != null) {
                        if (this.canCapture(piece)) {
                            if (board.getCellPiece(this.row + i + 1, this.column + i + 1) == null)
                                return true;
                        }
                        break;
                    }
                }
            }
        }
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
          if (this.row < board.size - 1) {
              if (this.column > 0) {
                  if (board.getCellPiece(this.row + 1, this.column - 1) == null)
                      return true;
              }
              if (this.column < board.size - 1) {
                  if (board.getCellPiece(this.row + 1, this.column + 1) == null)
                      return true;
              }
          }
          if (this.row > 0) {
              if (this.column > 0) {
                  if (board.getCellPiece(this.row - 1, this.column - 1) == null)
                      return true;
              }
              if (this.column < board.size - 1) {
                  if (board.getCellPiece(this.row - 1, this.column + 1) == null)
                      return true;
              }
          }
          return false;
      }
}

/**
* Checkers Board
* @description checkers board
*/
class Board {

    /**
     * @function constructor
     * @description Create checkers board
     * @access public
     *
     * @param {number}  board size
     * @param {Map} board initial position
     *
     * @return {type} Description
     */
    constructor(size = 8) {
        this.size = size;
        this.position = new Map();
        this._onSet = new Set();
        this._onDelete = new Set();
    }

    /**
     * @function onSet
     * @description subscribe to event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Board} this board
     */
    onSet(f) {
        this._onSet.add(f);
        return this;
    }

    /**
     * @function offSet
     * @description unsubscribe from event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Board} this board
     */
    offSet(f) {
        this._onSet.delete(f);
        return this;
    }

    /**
     * @function onDelete
     * @description subscribe to event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Board} this board
     */
    onDelete(f) {
        this._onDelete.add(f);
        return this;
    }

    /**
     * @function offDelete
     * @description unsubscribe from event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Board} this board
     */
    offDelete(f) {
        this._onDelete.delete(f);
        return this;
    }

    /**
     * @function getCellPiece
     * @description get piece in the cell
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     *
     * @return {Piece} piece in the cell
     */
    getCellPiece(row, column) {
        var cell = new Cell(row, column);
        return this.getPiece(cell.cellId);
    }

    /**
     * @function findSelectableForJump
     * @description find selectable for current player's jump
     * @access public
     *
     * @param {boolean} white is white
     *
     * @return {Array} array of id's
     */
    findSelectableForJump(white) {
        var selectable = [];
        this.position.forEach((piece, id) => {
            if (piece.white == white && piece.isSelectableForJump(this)) {
                selectable.push(id);
            }
        });
        return selectable;
    }

    /**
     * @function countPieces
     * @description count pieces of current player
     * @access public
     *
     * @param {boolean} white is white
     *
     * @return {number} counter
     */
    countPieces(white) {
        var count = 0;
        this.position.forEach((piece, id) => {
            if (piece.white == white) {
                count++;
            }
        });
        return count;
    }

    /**
     * @function clear
     * @description clear position
     * @access public
     *
     */
    clear() {
        this.position.clear();
    }

    /**
     * @function getPiece
     * @description get piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     *
     * @return {Piece} piece in the cell
     */
    getPiece(id) {
        return this.position.get(id);
    }

    /**
     * @function setPiece
     * @description set piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     * @param {Piece} piece  piece to be set
     *
     * @return {Piece} previous piece in the cell
     */
    setPiece(id, piece) {
        var previous = this.position.get(id);
        this.position.set(id, piece);
        this._onSet.forEach(f => f(piece, id));
        return previous;
    }

    /**
     * @function deletePiece
     * @description delete piece in the cell by id
     * @access public
     *
     * @param {string} id    cell id
     *
     * @return {Piece} previous piece in the cell
     */
    deletePiece(id) {
        var piece = this.position.get(id);
        if (piece != null) {
            this.position.delete(id);
            this._onDelete.forEach(f => f(piece, id));
        }
        return piece;
    }

    /**
     * @function toJSON
     * @description serialize to JSON format
     * @access public
     *
     * @return {Array} current position
     */
    toJSON() {
        var jsonArray = [];
        this.position.forEach((piece, id) => {
          jsonArray.push(piece);
        });
        return jsonArray;
    }
}


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
     * @function canJump
     * @description if can capture piece jumping to id
     * @access public
     *
     * @param {Piece}  piece piece
     * @param {string} id    cell id
     *
     * @return {boolean} if can jump
     */
    canJump(piece, id) {
        var cell = Cell.fromId(id);
        var captureId = piece.findCapture(this.board, cell);
        return captureId != null;
    }

    /**
     * @function canMove
     * @description if can move piece to id
     * @access public
     *
     * @param {Piece}  piece piece
     * @param {string} id    cell id
     *
     * @return {boolean} if can move
     */
     canMove(piece, id) {
         var cell = Cell.fromId(id);
         return piece.canMove(cell);
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
        var cell = new Cell(0, 0);
        for (var i = 0; i < this.initRows; i++) {
            cell.row = i;
            for (var j = 0; j < board.size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    board.setPiece(cell.cellId, new Man(true, i, j));
                }
            }
        }
        for (var i = board.size - this.initRows; i < board.size; i++) {
            cell.row = i;
            for (var j = 0; j < board.size; j++) {
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

//@codekit-prepend cell.js
//@codekit-prepend piece.js
//@codekit-prepend man.js
//@codekit-prepend king.js
//@codekit-prepend board.js
//@codekit-prepend game.js
//@codekit-prepend checkers.js

//import $ from 'jquery';

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var prepareDragImage = isFirefox? createDragCanvas: null;

$(function () {
    markupBoard($('#board'));
    var state = null;
    var useHistory = (document.location.protocol === 'file:') ? null : window.History;
    if (useHistory) {
        state = useHistory.getState();
    }
    var get_url_parameter = function (name) {
        if (window.URLSearchParams) {
            var searchParams = new URLSearchParams(document.location.search);
            return searchParams.get(name);
        }
        return null;
    };
    var update_texts = function () {
        $('.controls').i18n();
        $('#new').prop('title', $.i18n('new-title'));
        $('#save').prop('title', $.i18n('save-title'));
        $('#load').prop('title', $.i18n('load-title'));
        $('#language-label').prop('title', $.i18n('language-title'));
    };
    $.i18n({
        locale: 'en',
        debug: true
    });
    $.i18n().load({
        'en': 'i18n/messages.en.json',
        'ru': 'i18n/messages.ru.json'
    }).done(function () {
        var locale = get_url_parameter('language');
        if (locale) {
            $.i18n().locale = locale;
            $("#language").val(locale);
            document.title = $.i18n('game-title');
            update_texts();
        }
        if (useHistory) {
            useHistory.Adapter.bind(window, 'statechange', function () {
                var currentIndex = useHistory.getCurrentIndex();
                var state = History.getState();
                if (state.data.index != currentIndex - 1) {
                    var locale = get_url_parameter('language');
                    if (locale) {
                        $.i18n().locale = locale;
                        $("#language").val(locale);
                        update_texts();
                    }
                }
            });
        }

        $('#language').change(function (event) {
            var locale = $(this).val();
            if (locale) {
                $.i18n().locale = locale;
                update_texts();
                if (useHistory) {
                    useHistory.replaceState({ 'index': useHistory.getCurrentIndex(), 'language': $('#language').val() }, $.i18n('game-title'), "?language=" + locale);
                }
            }
        });
    });

    var checkers = new RussianCheckers();

    var board = checkers.createBoard();
    subscribeToBoard(board);
    var game = checkers.createGame(board);
    if (state && state.data && state.data.game) {
        checkers.loadBoard(board, state.data.game.board);
        game.load(state.data.game);
        showTurn(game.whiteTurn);
        if (game.selected != null) {
            $('#' + game.selected).addClass('selected');
        }
    }
    else {
        checkers.setupBoard(board);
    }
    subscribeToGame(game);

    $('.cell').click(function () {
        var error = null;
        if (game.finished) {
            error = $.i18n('game-over', game.result > 0 ? $.i18n('player-light') : $.i18n('player-dark'));
        }
        else {
          var selected = game.selected;
          if (selected == null) {
              error = selectPiece(game, board, this);
          }
          else {
              error = performMove(game, board, selected, this);
          }
        }
        if (error) {
            alert(error);
        }
    });

    $('.cell').on({
        dragstart: function (event) {
            var dataTransfer = event.originalEvent.dataTransfer;
            if (!game.finished) {
                if (game.selected == null) {
                    var error = selectPiece(game, board, this);
                    if (error) {
                        alert(error);
                    }
                    else {
                        return startDrag(dataTransfer, event, board.getPiece(this.id));
                    }
                }
                else if (game.selected == this.id) {
                     return startDrag(dataTransfer, event, board.getPiece(this.id));
                }
            }
            dataTransfer.effectAllowed = 'none';
            return false;
        },
        dragenter: function (event) {
            clearDrag();
            $(this).addClass('highlight');
            var error = allowedMove(game, board, game.selected, this);
            if (error) {
                $(this).attr('data-error', error);
                updateDrag(event);
            }
            else {
                $(this).removeAttr('data-error');
                $(this).removeAttr('data-tooltip');
            }
        },
        dragleave: function (event) {
            $(this).removeAttr('data-error');
            $(this).removeAttr('data-tooltip');
            $(this).removeClass('highlight');
        },
        dragend: function (event) {
            $(this).css('background-image', '');
            clearDrag();
        },
        dragexit: function (event) {
            $(this).css('background-image', '');
            clearDrag();
        },
        dragover: function (event) {
            var dataTransfer = event.originalEvent.dataTransfer;
            var error = $(this).attr('data-error');
            if (error) {
                dataTransfer.dropEffect = 'none';
                updateDrag(event);
                return true;
            }
            dataTransfer.dropEffect = 'move';
            event.preventDefault();
            return false;
        },
        drag: function (event) {
        },
        drop: function (event) {
            event.stopPropagation();
            event.preventDefault();
            $(this).removeAttr('data-error');
            $(this).removeAttr('data-tooltip');
            $(this).removeClass('highlight');
            var dataTransfer = event.originalEvent.dataTransfer;
            var error = performMove(game, board, dataTransfer.getData('text'), this);
            if (error) {
                alert(error);
            }
            return false;
        }
    });

    $(window).on('beforeunload', function () {
        if (useHistory) {
            useHistory.replaceState({ 'index': useHistory.getCurrentIndex(), 'language': $('#language').val(), 'game': game }, $.i18n('game-title'), document.location.search);
        }
    });

    $('#new').click(function () {
        $('.cell').removeClass('white black').removeClass('man king').removeClass('selected').removeAttr('draggable');
        board.clear();
        checkers.setupBoard(board);
        game = checkers.createGame(board);
    });

    $('#save').click(function () {
       if (localStorage) {
          localStorage.setItem('checkers', JSON.stringify(game));
       }
       else {
          alert($.i18n('not-supported-storage'));
       }
    });

    $('#load').click(function () {
        if (localStorage) {
          var obj = JSON.parse(localStorage.getItem('checkers'));
          if (obj != null) {
              $('.cell').removeClass('white black').removeClass('man king').removeClass('selected').removeAttr('draggable');
              board.clear();
              checkers.loadBoard(board, obj.board);
              game = checkers.createGame(board);
              game.load(obj);
              showTurn(game.whiteTurn);
              if (game.selected != null) {
                  $('#' + game.selected).addClass('selected');
              }
          }
        }
        else {
            alert($.i18n('not-supported-storage'));
        }
    });
});

function clearDrag() {
    $('.highlight').removeAttr('data-error');
    $('.highlight').removeAttr('data-tooltip');
    $('.highlight').removeClass('highlight');
}

function updateDrag(event) {
    var clientRect = event.target.getBoundingClientRect();
    var middleX = (clientRect.left + clientRect.right) >> 1;
    var middleY = (clientRect.top + clientRect.bottom) >> 1;
    var tooltip = event.clientX < middleX ? (event.clientY < middleY ? 'top-left' : 'bottom-left') : (event.clientY < middleY ? 'top-right' : 'bottom-right');
    $(event.target).attr('data-tooltip', tooltip);
}

function startDrag(dataTransfer, event, piece) {
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text', event.target.id);
    var element = selectBackgroundImage(piece);

    if (element) {
        dataTransfer.setData('url', element.src);
        if (dataTransfer.setDragImage) {
            var clientRect = event.target.getBoundingClientRect();
            var offsetX = event.clientX - clientRect.left;
            var offsetY = event.clientY - clientRect.top;
            if (prepareDragImage) {
                element = prepareDragImage(element, event.target);
            }
            dataTransfer.setDragImage(element, offsetX, offsetY);
        }
        else {
            $(event.target).addClass('transparent');
        }
    }

    setTimeout(function () {
        $(event.target).removeClass('transparent');
        $(event.target).css('background-image', 'none');
    }, 10);
    return true;
}

function getBackgroundImage(target) {
    var img = null;
    var path = $(target).css('background-image').match(/^url\("?(.+?)"?\)$/)[1];
    if (path) {
        var img = new Image($(target).width(), $(target).height());
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = path;
    }
    return img;
}

function selectBackgroundImage(piece) {
    return (piece)? document.getElementById(piece.colorClass + '-' + piece.kindClass): null;
}

function createDragCanvas(element, target) {
    var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    canvas.width = $(target).width();
    canvas.height = $(target).height();
    var ctx = canvas.getContext("2d");
    ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    return canvas;
}

function createDragImage(element, target) {
    var canvas = createDragCanvas(element, target);
    var img = new Image(canvas.width, canvas.height);
    img.src = canvas.toDataURL();
    return img;
}

function allowedMove(game, board, selected, target) {
    var piece = board.getPiece(selected);
    if (piece == null) {
        return $.i18n('not-selected-piece');
    }
    else {
        var to = board.getPiece(target.id);
        if (to == null) {
            if (piece.isSelectableForJump(board)) {
                if (!game.canJump(piece, target.id)) {
                    return $.i18n('illegal-jump-cell');
                }
            }
            else {
                if (!game.canMove(piece, target.id)) {
                    return $.i18n('illegal-move-cell');
                }
            }
        }
        else {
            return $.i18n('occupied-cell');
        }
    }
    return null;
}

function performMove(game, board, selected, target) {
    var piece = board.getPiece(selected);
    if (piece == null) {
        return $.i18n('not-selected-piece');
    }
    else {
        var to = board.getPiece(target.id);
        if (to == null) {
            if (piece.isSelectableForJump(board)) {
                if (game.tryToJump(piece, target.id)) {
                    $('#' + selected).removeClass('selected');
                    if (game.selected != null)
                        $(target).addClass('selected');
                    else {
                        if (game.finished) {
                            return $.i18n('game-over', game.result > 0 ? $.i18n('player-light') : $.i18n('player-dark'));
                        }
                    }
                }
                else {
                    return $.i18n('illegal-jump-cell');
                }
            }
            else {
                if (game.tryToMove(piece, target.id)) {
                    $('#' + selected).removeClass('selected');
                    if (game.selected != null)
                        $(target).addClass('selected');
                }
                else {
                    return $.i18n('illegal-move-cell');
                }
            }
        }
        else {
            return $.i18n('occupied-cell');
        }
    }
    return null;
}

function selectPiece(game, board, target) {
    game.prepare();
    var piece = board.getPiece(target.id);
    if (piece == null)
        return $.i18n('select-piece');
    else if (piece.white != game.whiteTurn)
        return $.i18n('select-player-piece', game.whiteTurn ? $.i18n('player-light') : $.i18n('player-dark'));
    else if (game.selectableForJump.length > 0) {
        if (game.selectableForJump.indexOf(target.id) >= 0) {
            game.selected = target.id;
            $(target).addClass('selected');
        }
        else {
            return $.i18n('select-jump-piece', game.selectableForJump);
        }
    }
    else {
        if (piece.isSelectableToMove(board)) {
            game.selected = target.id;
            $(target).addClass('selected');
        }
        else {
            return $.i18n('select-move-piece');
        }
    }
    return null;
}

/**
 * @function subscribeToBoard
 * @description subscribe to position changes on the checkers board
 * @access public
 *
 * @param {Board} board
 */
function subscribeToBoard(board) {
    board.onSet(showPiece);
    board.onDelete(removePiece);
}

/**
 * @function unsubscribeToBoard
 * @description unsubscribe from position changes on the checkers board
 * @access public
 *
 * @param {Board} board
 */
function unsubscribeToBoard(board) {
    board.offSet(showPiece);
    board.offDelete(removePiece);
}

/**
 * @function subscribeToGame
 * @description subscribe to state changes on the game
 * @access public
 *
 * @param {Game} game
 */
function subscribeToGame(game) {
    game.onTurn(showTurn);
}

/**
 * @function unsubscribeToGame
 * @description unsubscribe from state changes on the game
 * @access public
 *
 * @param {Game} game
 */
function unsubscribeToGame(game) {
    game.offTurn(showTurn);
}

/**
 * @function showTurn
 * @description show current player
 * @access public
 *
 * @param {boolean} whiteTurn is white turn
 */
function showTurn(whiteTurn) {
  if (whiteTurn)
      $('#panel').removeClass('black').addClass('white');
  else
      $('#panel').removeClass('white').addClass('black');
}

/**
 * @function showPiece
 * @description show piece in the cell
 * @access public
 *
 * @param {Piece} piece piece
 * @param {string} id cell id
*/
function showPiece(piece, id) {
    $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass).attr('draggable', 'true');
}

/**
 * @function removePiece
 * @description remove piece from the cell
 * @access public
 *
 * @param {Piece} piece piece
 * @param {string} id cell id
*/
function removePiece(piece, id) {
    $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass).removeAttr('draggable');
}

/**
 * @function markupBoard
 * @description markup checkers board
 * @access public
 *
 * @param {JQuery<HTMLElement>} boardElement
 */
function markupBoard(boardElement) {
    var rowElement = $('<div class="last-row"/>').appendTo(boardElement);
    appendLetterRow(rowElement);
    for (var i = 8; i > 0; i--) {
        rowElement = $('<div class="row"/>').appendTo(boardElement);
        appendCellRow(rowElement, i);
    }
    rowElement = $('<div class="zero-row"/>').appendTo(boardElement);
    appendLetterRow(rowElement);
}

/**
 * @function appendLetterRow
 * @description append border row of the checkers board
 * @access public
 *
 * @param {JQuery<HTMLElement>} rowElement
 */
function appendLetterRow(rowElement) {
    $('<div class="corner">&nbsp;</div>').appendTo(rowElement);
    for (var i = 97; i < 105; i++) {
        $('<div class="letter" />').appendTo(rowElement).text(String.fromCharCode(i));
    }
    $('<div class="corner">&nbsp;</div>').appendTo(rowElement);
}

/**
 * @function appendCellRow
 * @description append cell row of the checkers board
 * @access public
 *
 * @param {JQuery<HTMLElement>} rowElement
 */
function appendCellRow(rowElement, index) {
    $('<div class="digit" />').appendTo(rowElement).text(index);
    for (var i = 97; i < 105; i++) {
        var cellId = String.fromCharCode(i) + index;
        $('<div />', {
            'id': cellId,
            'title': cellId,
            'class': 'cell'
        }).appendTo(rowElement);
    }
    $('<div class="digit" />').appendTo(rowElement).text(index);
}