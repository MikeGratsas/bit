/**
 * Cell
 * @description checkers board cell
 * @abstract
 */
'use strict';

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Cell = (function () {

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {number} row    board row
     * @param {number} column board column
     */

    function Cell(row, column) {
        _classCallCheck(this, Cell);

        this.row = row;
        this.column = column;
    }

    /**
     * Piece
     * @description checkers piece
     * @abstract
     */

    /**
     * @function cellId
     * @description get cell id
     * @access public
     *
     * @return {string} cell id
     */

    _createClass(Cell, [{
        key: 'cellId',
        get: function get() {
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
    }], [{
        key: 'fromId',
        value: function fromId(id) {
            return new Cell(id.charCodeAt(1) - 49, id.charCodeAt(0) - 97);
        }
    }]);

    return Cell;
})();

var Piece = (function () {

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

    function Piece(kind, white, row, column) {
        _classCallCheck(this, Piece);

        this.kind = kind;
        this.white = white;
        this.row = row;
        this.column = column;
    }

    /**
     * Man
     * @description man
     * @extends Piece
     */

    /**
     * @function colorClass
     * @description get color class
     * @access public
     *
     * @return {string} color class
     */

    _createClass(Piece, [{
        key: 'canMove',

        /**
         * @function canMove
         * @description if can move piece
         * @access public
         *
         * @param {Cell}  cell  board cell
         *
         * @return {boolean} if can move
         */
        value: function canMove(cell) {
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
    }, {
        key: 'findCapture',
        value: function findCapture(board, cell) {
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
    }, {
        key: 'canCapture',
        value: function canCapture(piece) {
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
    }, {
        key: 'isSelectableForJump',
        value: function isSelectableForJump(board) {
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
    }, {
        key: 'isSelectableToMove',
        value: function isSelectableToMove(board) {
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
    }, {
        key: 'move',
        value: function move(board, cell) {
            this.row = cell.row;
            this.column = cell.column;
            return this;
        }
    }, {
        key: 'colorClass',
        get: function get() {
            return this.white ? 'white' : 'black';
        }

        /**
         * @function kindClass
         * @description get kind class
         * @access public
         *
         * @return {string} kind class
         */
    }, {
        key: 'kindClass',
        get: function get() {
            return null;
        }
    }]);

    return Piece;
})();

var Man = (function (_Piece) {
    _inherits(Man, _Piece);

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */

    function Man(white, row, column) {
        _classCallCheck(this, Man);

        _get(Object.getPrototypeOf(Man.prototype), 'constructor', this).call(this, 1, white, row, column);
    }

    /**
     * King
     * @description king
     * @extends Piece
     */

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */

    _createClass(Man, [{
        key: 'canMove',

        /**
         * @function canMove
         * @description if can move piece
         * @access public
         *
         * @param {Cell}  cell  board cell
         *
         * @return {boolean} if can move
         */
        value: function canMove(cell) {
            return cell.row - this.row == (this.white ? 1 : -1) && Math.abs(cell.column - this.column) == 1;
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
    }, {
        key: 'findCapture',
        value: function findCapture(board, cell) {
            if (Math.abs(cell.row - this.row) == 2 && Math.abs(cell.column - this.column) == 2) {
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
    }, {
        key: 'canCapture',
        value: function canCapture(piece) {
            return this.white != piece.white && Math.abs(piece.row - this.row) == 1 && Math.abs(piece.column - this.column) == 1;
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
    }, {
        key: 'isSelectableForJump',
        value: function isSelectableForJump(board) {
            if (this.row > 1) {
                if (this.column > 1) {
                    var piece = board.getCellPiece(this.row - 1, this.column - 1);
                    if (piece != null && this.canCapture(piece)) {
                        if (board.getCellPiece(this.row - 2, this.column - 2) == null) return true;
                    }
                }
                if (this.column < board.size - 2) {
                    var piece = board.getCellPiece(this.row - 1, this.column + 1);
                    if (piece != null && this.canCapture(piece)) {
                        if (board.getCellPiece(this.row - 2, this.column + 2) == null) return true;
                    }
                }
            }
            if (this.row < board.size - 2) {
                if (this.column > 1) {
                    var piece = board.getCellPiece(this.row + 1, this.column - 1);
                    if (piece != null && this.canCapture(piece)) {
                        if (board.getCellPiece(this.row + 2, this.column - 2) == null) return true;
                    }
                }
                if (this.column < board.size - 2) {
                    var piece = board.getCellPiece(this.row + 1, this.column + 1);
                    if (piece != null && this.canCapture(piece)) {
                        if (board.getCellPiece(this.row + 2, this.column + 2) == null) return true;
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
    }, {
        key: 'isSelectableToMove',
        value: function isSelectableToMove(board) {
            if (this.white) {
                if (this.row < board.size - 1) {
                    if (this.column > 0) {
                        if (board.getCellPiece(this.row + 1, this.column - 1) == null) return true;
                    }
                    if (this.column < board.size - 1) {
                        if (board.getCellPiece(this.row + 1, this.column + 1) == null) return true;
                    }
                }
            } else {
                if (this.row > 0) {
                    if (this.column > 0) {
                        if (board.getCellPiece(this.row - 1, this.column - 1) == null) return true;
                    }
                    if (this.column < board.size - 1) {
                        if (board.getCellPiece(this.row - 1, this.column + 1) == null) return true;
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
    }, {
        key: 'move',
        value: function move(board, cell) {
            if (cell.row == (this.white ? board.size - 1 : 0)) return new King(this.white, cell.row, cell.column);
            return _get(Object.getPrototypeOf(Man.prototype), 'move', this).call(this, board, cell);
        }
    }, {
        key: 'kindClass',
        get: function get() {
            return "man";
        }
    }]);

    return Man;
})(Piece);

var King = (function (_Piece2) {
    _inherits(King, _Piece2);

    /**
     * @function constructor
     * @description create instance
     * @access public
     *
     * @param {boolean} white  is white
     * @param {number} row    board row
     * @param {number} column board column
     */

    function King(white, row, column) {
        _classCallCheck(this, King);

        _get(Object.getPrototypeOf(King.prototype), 'constructor', this).call(this, 2, white, row, column);
    }

    /**
    * Checkers Board
    * @description checkers board
    */

    /**
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */

    _createClass(King, [{
        key: 'canMove',

        /**
         * @function canMove
         * @description if can move piece
         * @access public
         *
         * @param {Cell}  cell  board cell
         *
         * @return {boolean} if can move
         */
        value: function canMove(cell) {
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
    }, {
        key: 'findCapture',
        value: function findCapture(board, cell) {
            var rowDistance = cell.row - this.row;
            var columnDistance = cell.column - this.column;
            if (Math.abs(rowDistance) == Math.abs(columnDistance)) {
                var distance = Math.abs(rowDistance);
                var captureCell = new Cell(this.row, this.column);
                for (var i = 1; i < distance; i++) {
                    captureCell.row = this.row + (rowDistance > 0 ? i : -i);
                    captureCell.column = this.column + (columnDistance > 0 ? i : -i);
                    var cellId = captureCell.cellId;
                    var piece = board.getPiece(cellId);
                    if (piece != null) {
                        if (i + 1 == distance && this.canCapture(piece)) return cellId;
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
    }, {
        key: 'canCapture',
        value: function canCapture(piece) {
            return this.white != piece.white && Math.abs(piece.row - this.row) == Math.abs(piece.column - this.column);
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
    }, {
        key: 'isSelectableForJump',
        value: function isSelectableForJump(board) {
            if (this.row > 1) {
                if (this.column > 1) {
                    var limit = Math.min(this.row, this.column) - 1;
                    for (var i = 1; i < limit; i++) {
                        var piece = board.getCellPiece(this.row - i, this.column - i);
                        if (piece != null) {
                            if (this.canCapture(piece)) {
                                if (board.getCellPiece(this.row - i - 1, this.column - i - 1) == null) return true;
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
                                if (board.getCellPiece(this.row - i - 1, this.column + i + 1) == null) return true;
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
                                if (board.getCellPiece(this.row + i + 1, this.column - i - 1) == null) return true;
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
                                if (board.getCellPiece(this.row + i + 1, this.column + i + 1) == null) return true;
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
    }, {
        key: 'isSelectableToMove',
        value: function isSelectableToMove(board) {
            if (this.row < board.size - 1) {
                if (this.column > 0) {
                    if (board.getCellPiece(this.row + 1, this.column - 1) == null) return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row + 1, this.column + 1) == null) return true;
                }
            }
            if (this.row > 0) {
                if (this.column > 0) {
                    if (board.getCellPiece(this.row - 1, this.column - 1) == null) return true;
                }
                if (this.column < board.size - 1) {
                    if (board.getCellPiece(this.row - 1, this.column + 1) == null) return true;
                }
            }
            return false;
        }
    }, {
        key: 'kindClass',
        get: function get() {
            return "king";
        }
    }]);

    return King;
})(Piece);

var Board = (function () {

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

    function Board() {
        var size = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];

        _classCallCheck(this, Board);

        this.size = size;
        this.position = new Map();
        this._onSet = new Set();
        this._onDelete = new Set();
    }

    /**
     * Game
     * @description checkers game
     */

    /**
     * @function onSet
     * @description subscribe to event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Board} this board
     */

    _createClass(Board, [{
        key: 'onSet',
        value: function onSet(f) {
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
    }, {
        key: 'offSet',
        value: function offSet(f) {
            this._onSet['delete'](f);
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
    }, {
        key: 'onDelete',
        value: function onDelete(f) {
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
    }, {
        key: 'offDelete',
        value: function offDelete(f) {
            this._onDelete['delete'](f);
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
    }, {
        key: 'getCellPiece',
        value: function getCellPiece(row, column) {
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
    }, {
        key: 'findSelectableForJump',
        value: function findSelectableForJump(white) {
            var _this = this;

            var selectable = [];
            this.position.forEach(function (piece, id) {
                if (piece.white == white && piece.isSelectableForJump(_this)) {
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
    }, {
        key: 'countPieces',
        value: function countPieces(white) {
            var count = 0;
            this.position.forEach(function (piece, id) {
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
    }, {
        key: 'clear',
        value: function clear() {
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
    }, {
        key: 'getPiece',
        value: function getPiece(id) {
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
    }, {
        key: 'setPiece',
        value: function setPiece(id, piece) {
            var previous = this.position.get(id);
            this.position.set(id, piece);
            this._onSet.forEach(function (f) {
                return f(piece, id);
            });
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
    }, {
        key: 'deletePiece',
        value: function deletePiece(id) {
            var piece = this.position.get(id);
            if (piece != null) {
                this.position['delete'](id);
                this._onDelete.forEach(function (f) {
                    return f(piece, id);
                });
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
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return Array.from(this.position.values());
        }
    }]);

    return Board;
})();

var Game = (function () {
    /**
     * @function constructor
     * @description checkers game
     * @access public
     *
     * @param {Board} board board
     */

    function Game(board) {
        _classCallCheck(this, Game);

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
    * Russian Checkers
    * @description Russian checkers factory
    */

    /**
     * @function onTurn
     * @description subscribe to event
     * @access public
     *
     * @param {function} f callback function
     *
     * @return {Game} this game
     */

    _createClass(Game, [{
        key: 'onTurn',
        value: function onTurn(f) {
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
    }, {
        key: 'offTurn',
        value: function offTurn(f) {
            this._onTurn['delete'](f);
            return this;
        }

        /**
         * @function toggleTurn
         * @description toggle player turn
         * @access public
         *
         */
    }, {
        key: 'toggleTurn',
        value: function toggleTurn() {
            var _this2 = this;

            this.whiteTurn = !this.whiteTurn;
            this._onTurn.forEach(function (f) {
                return f(_this2.whiteTurn);
            });
        }

        /**
         * @function prepare
         * @description prepare to find selectable for current player jump
         * @access public
         *
         */
    }, {
        key: 'prepare',
        value: function prepare() {
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
    }, {
        key: 'tryToJump',
        value: function tryToJump(piece, id) {
            var cell = Cell.fromId(id);
            var captureId = piece.findCapture(this.board, cell);
            if (captureId != null) {
                this.board.deletePiece(captureId);
                this.board.deletePiece(this.selected);
                var moved = piece.move(this.board, cell);
                this.board.setPiece(id, moved);
                if (moved.isSelectableForJump(this.board)) {
                    this.selected = id;
                } else {
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
    }, {
        key: 'tryToMove',
        value: function tryToMove(piece, id) {
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
    }, {
        key: 'load',
        value: function load(obj) {
            this.id = obj.id;
            this.finished = obj.finished;
            this.result = obj.result;
            this.whiteTurn = obj.whiteTurn;
            this.selected = obj.selected;
            this.selectableForJump = obj.selectableForJump;
        }
    }]);

    return Game;
})();

var RussianCheckers = (function () {

    /**
     * @function constructor
     * @description Create checkers board
     * @access public
     *
     * @param {number} initRows number of rows to initialize
     *
     */

    function RussianCheckers() {
        var initRows = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

        _classCallCheck(this, RussianCheckers);

        this.initRows = initRows;
    }

    //@codekit-prepend cell.js
    //@codekit-prepend piece.js
    //@codekit-prepend man.js
    //@codekit-prepend king.js
    //@codekit-prepend board.js
    //@codekit-prepend game.js
    //@codekit-prepend checkers.js

    //import $ from 'jquery';

    /**
     * @function createBoard
     * @description create the board
     * @access public
     *
     * @return {Board} board
     *
     */

    _createClass(RussianCheckers, [{
        key: 'createBoard',
        value: function createBoard() {
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
    }, {
        key: 'setupBoard',
        value: function setupBoard(board) {
            var cell = new Cell(0, 0);
            for (var i = 0; i < this.initRows; i++) {
                cell.row = i;
                for (var j = 0; j < board.size; j++) {
                    if ((i + j & 1) == 0) {
                        cell.column = j;
                        board.setPiece(cell.cellId, new Man(true, i, j));
                    }
                }
            }
            for (var i = board.size - this.initRows; i < board.size; i++) {
                cell.row = i;
                for (var j = 0; j < board.size; j++) {
                    if ((i + j & 1) == 0) {
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
    }, {
        key: 'loadBoard',
        value: function loadBoard(board) {
            var pos = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            var piece = null;
            var cell = new Cell(0, 0);
            pos.forEach(function (p) {
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
    }, {
        key: 'createGame',
        value: function createGame(board) {
            return new Game(board);
        }
    }]);

    return RussianCheckers;
})();

$(function () {
    markupBoard($('#board'));
    var checkers = new RussianCheckers();
    var board = checkers.createBoard();
    subscribeToBoard(board);
    checkers.setupBoard(board);
    var game = checkers.createGame(board);
    subscribeToGame(game);
    $('.cell').click(function () {
        if (game.finished) {
            alert('Game over: ' + (game.result > 0 ? 'light' : 'dark') + ' won');
        } else {
            var selected = game.selected;
            if (selected == null) {
                game.prepare();
                var piece = board.getPiece(this.id);
                if (piece == null) alert('You have to select a piece');else if (piece.white != game.whiteTurn) alert('You have to select a ' + (game.whiteTurn ? 'light' : 'dark') + ' piece');else if (game.selectableForJump.length > 0) {
                    if (game.selectableForJump.indexOf(this.id) >= 0) {
                        game.selected = this.id;
                        $(this).addClass('selected');
                    } else {
                        alert('You have to select another piece to jump: ' + game.selectableForJump);
                    }
                } else {
                    if (piece.isSelectableToMove(board)) {
                        game.selected = this.id;
                        $(this).addClass('selected');
                    } else {
                        alert('You have to select another piece to move');
                    }
                }
            } else {
                var piece = board.getPiece(selected);
                if (piece == null) {
                    alert('Piece is not selected');
                } else {
                    var to = board.getPiece(this.id);
                    if (to == null) {
                        if (piece.isSelectableForJump(board)) {
                            if (game.tryToJump(piece, this.id)) {
                                $('#' + selected).removeClass('selected');
                                if (game.selected != null) $(this).addClass('selected');else {
                                    if (game.finished) {
                                        alert('Game over: ' + (game.result > 0 ? 'light' : 'dark') + ' won');
                                    }
                                }
                            } else {
                                alert('You can not jump to this cell on the board');
                            }
                        } else {
                            if (game.tryToMove(piece, this.id)) {
                                $('#' + selected).removeClass('selected');
                                if (game.selected != null) $(this).addClass('selected');
                            } else {
                                alert('You can not move to this cell on the board');
                            }
                        }
                    } else {
                        alert('You have to move to unoccupied square on the board');
                    }
                }
            }
        }
    });

    $('#new').click(function () {
        $('.cell').removeClass('white black').removeClass('man king').removeClass('selected');
        board.clear();
        checkers.setupBoard(board);
        game = checkers.createGame(board);
    });

    $('#save').click(function () {
        localStorage.setItem('checkers', JSON.stringify(game));
    });

    $('#load').click(function () {
        var obj = JSON.parse(localStorage.getItem('checkers'));
        if (obj != null) {
            $('.cell').removeClass('white black').removeClass('man king').removeClass('selected');
            board.clear();
            checkers.loadBoard(board, obj.board);
            game = checkers.createGame(board);
            game.load(obj);
            showTurn(game.whiteTurn);
        }
    });
});

/**
 * @function subscribeToBoard
 * @description subscribe to position changes on the checkers board
 * @access public
 *
 * @param {Board} board
 */
function subscribeToBoard(board) {
    board.onSet(function (piece, id) {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.onDelete(function (piece, id) {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
}

/**
 * @function unsubscribeToBoard
 * @description unsubscribe from position changes on the checkers board
 * @access public
 *
 * @param {Board} board
 */
function unsubscribeToBoard(board) {
    board.offSet(function (piece, id) {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.offDelete(function (piece, id) {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
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
    if (whiteTurn) $('#controls').removeClass('dark').addClass('light');else $('#controls').removeClass('light').addClass('dark');
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

