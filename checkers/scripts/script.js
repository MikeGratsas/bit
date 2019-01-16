"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Piece
 * @description checkers piece
 * @abstract
 */
var Piece = function () {

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
     * @function kindClass
     * @description get kind class
     * @access public
     *
     * @return {string} kind class
     */


    _createClass(Piece, [{
        key: "canMove",


        /**
         * @function canMove
         * @description if can move piece
         * @access public
         *
         * @param {number} row    board row
         * @param {number} column board column
         *
         * @return {boolean} if can move
         */
        value: function canMove(row, column) {
            return false;
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
        key: "canCapture",
        value: function canCapture( /* Piece */piece) {
            return false;
        }

        /**
         * @function move
         * @description move this piece
         * @access public
         *
         * @param {number} row    board row
         * @param {number} column board column
         *
         * @return {Piece} this piece
         */

    }, {
        key: "move",
        value: function move(row, column) {
            this.row = row;
            this.column = column;
            return this;
        }
    }, {
        key: "kindClass",
        get: function get() {
            return null;
        }
    }]);

    return Piece;
}();

/**
 * Man
 * @description man
 * @extends Piece
 */


var Man = function (_Piece) {
    _inherits(Man, _Piece);

    function Man(white, row, column) {
        _classCallCheck(this, Man);

        return _possibleConstructorReturn(this, (Man.__proto__ || Object.getPrototypeOf(Man)).call(this, 1, white, row, column));
    }

    _createClass(Man, [{
        key: "canMove",
        value: function canMove(row, column) {
            return row - this.row == (white ? 1 : -1) && Math.abs(column - this.column) == 1;
        }
    }, {
        key: "canCapture",
        value: function canCapture( /* Piece */piece) {
            return this.white != piece.white && Math.abs(piece.row - this.row) == 1 && Math.abs(piece.column - this.column) == 1;
        }
    }, {
        key: "kindClass",
        get: function get() {
            return "man";
        }
    }]);

    return Man;
}(Piece);

/**
 * King
 * @description king
 * @extends Piece
 */

var King = function (_Piece2) {
    _inherits(King, _Piece2);

    function King(white, row, column) {
        _classCallCheck(this, King);

        return _possibleConstructorReturn(this, (King.__proto__ || Object.getPrototypeOf(King)).call(this, 2, white, row, column));
    }

    _createClass(King, [{
        key: "canMove",
        value: function canMove(row, column) {
            return Math.abs(row - this.row) == Math.abs(column - this.column);
        }
    }, {
        key: "canCapture",
        value: function canCapture( /* Piece */piece) {
            return this.white != piece.white && Math.abs(piece.row - this.row) == Math.abs(piece.column - this.column);
        }
    }, {
        key: "kindClass",
        get: function get() {
            return "king";
        }
    }]);

    return King;
}(Piece);

var Board = function () {

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
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
        var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, Board);

        this.size = size;
        this.position = position != null ? position : Board.defaultPosition(size);
    }

    _createClass(Board, [{
        key: "storePosition",
        value: function storePosition() {
            return Array.from(this.position.values());
        }
    }], [{
        key: "defaultPosition",
        value: function defaultPosition() {
            var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
            var initRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

            var map = new Map();
            for (var i = 0; i < initRows; i++) {
                for (var j = 0; j < size; j++) {
                    if ((i + j & 1) == 0) {
                        map.set(Board.cell(i, j), new Man(true, i, j));
                    }
                }
            }
            for (var i = size - initRows; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if ((i + j & 1) == 0) {
                        map.set(Board.cell(i, j), new Man(false, i, j));
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

    }, {
        key: "loadPosition",
        value: function loadPosition() {
            var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var piece = null;
            var map = new Map();
            pos.forEach(function (p) {
                switch (p.kind) {
                    case 2:
                        piece = new Man(p.white, p.row, p.column);
                        break;
                    case 1:
                        piece = new King(p.white, p.row, p.column);
                        break;
                }
                if (piece != null) map.set(Board.cell(p.row, p.column), piece);
            });
            return map;
        }
    }, {
        key: "cell",
        value: function cell(row, column) {
            return String.fromCharCode(97 + column) + String.fromCharCode(49 + row);
        }
    }]);

    return Board;
}();

/**
 * Game
 * @description checkers game
 */


var Game =
/**
 * @function constructor
 * @description checkers game
 * @access public
 *
 * @param {Board} board board
 *
 * @return {type} Description
 */
function Game(board) {
    _classCallCheck(this, Game);

    this.finished = false;
    this.whiteTurn = true;
    this.board = board;
};

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
});

function setupBoard(boardElement, board) {
    markupBoard(boardElement);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = board.position[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            if (key != null) {
                $('#' + key).addClass(value.white ? 'white' : 'black').addClass(value.kindClass);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
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
//# sourceMappingURL=script.js.map