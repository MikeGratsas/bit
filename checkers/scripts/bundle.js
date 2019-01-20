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
                if (this.column > 1) {
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
  */﻿class King extends Piece {

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
              if (this.column > 1) {
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
    constructor(size = 8, position = null) {
        this.size = size;
        this.position = (position != null) ? position : Board.defaultPosition(size);
        this._onSet = new Set();
        this._onDelete = new Set();
    }

    onSet(f) {
        this._onSet.add(f);
        return this;
    }

    offSet(f) {
        this._onSet.delete(f);
        return this;
    }

    onDelete(f) {
        this._onDelete.add(f);
        return this;
    }

    offDelete(f) {
        this._onDelete.delete(f);
        return this;
    }

    /**
     * @static defaultPosition
     * @description default initial position
     * @access public
     *
     * @param {number} size board size
     * @param {number} initRows number of rows to initialize
     *
     * @return {Map} map
     */
    static defaultPosition(size = 8, initRows = 3) {
        var cell = new Cell(0, 0);
        var map = new Map();
        for (var i = 0; i < initRows; i++) {
            cell.row = i;
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    map.set(cell.cellId, new Man(true, i, j));
                }
            }
        }
        for (var i = size - initRows; i < size; i++) {
            cell.row = i;
            for (var j = 0; j < size; j++) {
                if (((i + j) & 1) == 0) {
                    cell.column = j;
                    map.set(cell.cellId, new Man(false, i, j));
                }
            }
        }
        return map;
    }

    /**
     * @static loadPosition
     * @description Description
     * @access public
     *
     * @param {array} position
     *
     * @return {Map} map
     */
    static loadPosition(pos = []) {
        var piece = null;
        var cell = new Cell(0, 0);
        var map = new Map();
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
                map.set(cell.cellId, piece);
            }
        });
        return map;
    }

    storePosition() {
        return Array.from(this.position.values());
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

    findSelectableForJump(white) {
        var selectable = [];
        this.position.forEach((piece, id) => {
            if (piece.white == white && piece.isSelectableForJump(this)) {
                selectable.push(id);
            }
        });
        return selectable;
    }

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

    setPiece(id, piece) {
        var previous = this.position.get(id);
        this.position.set(id, piece);
        this._onSet.forEach(f => f(piece, id));
        return previous;
    }

    deletePiece(id) {
        var piece = this.position.get(id);
        if (piece != null) {
            this.position.delete(id);
            this._onDelete.forEach(f => f(piece, id));
        }
        return piece;
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

//@codekit-prepend piece.js
//@codekit-prepend man.js
//@codekit-prepend king.js
//@codekit-prepend board.js
//@codekit-prepend game.js

//import $ from 'jquery';

$(function () {
    var board = new Board();
    var game = new Game(board);
    setupBoard($('#board'), board);
    $('.cell').click(function () {
        var selected = game.selected;
        if (selected == null) {
            game.prepare();
            var piece = board.getPiece(this.id);
            if (piece == null)
                alert('You have to select a piece');
            else if (piece.white != game.whiteTurn)
                alert(`You have to select a ${game.whiteTurn ? 'light' : 'dark'} piece`);
            else if (game.selectableForJump.length > 0) {
                if (game.selectableForJump.indexOf(this.id) >= 0) {
                    game.selected = this.id;
                    $(this).addClass('selected');
                }
                else {
                    alert('You have to select another piece to jump: ' + game.selectableForJump);
                }
            }
            else {
                if (piece.isSelectableToMove(board)) {
                    game.selected = this.id;
                    $(this).addClass('selected');
                }
                else {
                    alert('You have to select another piece to move');
                }
            }
        }
        else {
            var piece = board.getPiece(selected);
            if (piece == null) {
                alert('Piece is not selected');
            }
            else {
                var to = board.getPiece(this.id);
                if (to == null) {
                    if (piece.isSelectableForJump(board)) {
                        if (game.tryToJump(piece, this.id)) {
                            $('#' + selected).removeClass('selected');
                            if (game.selected != null)
                                $(this).addClass('selected');
                            else if (game.finished) {
                                alert(`Game over: ${game.result > 0 ? 'light' : 'dark'} won`);
                            }
                        }
                        else {
                            alert('You can not jump to this cell on the board');
                        }
                    }
                    else {
                        if (game.tryToMove(piece, this.id)) {
                            $('#' + selected).removeClass('selected');
                            if (game.selected != null)
                                $(this).addClass('selected');
                        }
                        else {
                            alert('You can not move to this cell on the board');
                        }
                    }
                }
                else {
                    alert('You have to move to unoccupied square on the board');
                }
            }
        }
    });
});

/**
 * @function setupBoard
 * @description setup checkers board
 * @access public
 * 
 * @param {JQuery<HTMLElement>} boardElement
 * @param {Board} board
 */
function setupBoard(boardElement, board) {
    markupBoard(boardElement);
    board.position.forEach((piece, id) => {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.onSet((piece, id) => {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.onDelete((piece, id) => {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
}

function cleanupBoard(board) {
    board.offSet((piece, id) => {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.offDelete((piece, id) => {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
}

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

function appendLetterRow(rowElement) {
    $('<div class="corner">&nbsp;</div>').appendTo(rowElement);
    for (var i = 97; i < 105; i++) {
        $('<div class="letter" />').appendTo(rowElement).text(String.fromCharCode(i));
    }
    $('<div class="corner">&nbsp;</div>').appendTo(rowElement);
}

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