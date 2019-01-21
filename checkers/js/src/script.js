//@codekit-prepend piece.js
//@codekit-prepend man.js
//@codekit-prepend king.js
//@codekit-prepend board.js
//@codekit-prepend game.js
//@codekit-prepend checkers.js

//import $ from 'jquery';

$(function () {
    markupBoard($('#board'));
    var checkers = new RussianCheckers();
    var board = checkers.createBoard();
    subscribe(board);
    checkers.setupBoard(board);
    var game = checkers.createGame(board);
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
                            else {
                                if (game.whiteTurn)
                                    $('#controls').removeClass('dark').addClass('light');
                                else
                                    $('#controls').removeClass('light').addClass('dark');
                                if (game.finished) {
                                    alert(`Game over: ${game.result > 0 ? 'light' : 'dark'} won`);
                                }
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
                            else {
                                if (game.whiteTurn)
                                    $('#controls').removeClass('dark').addClass('light');
                                else
                                    $('#controls').removeClass('light').addClass('dark');
                           }
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
        $('.cell').removeClass('white black').removeClass('man king').removeClass('selected');
        board.clear();
        var obj = JSON.parse(localStorage.getItem('checkers'));
        checkers.loadBoard(board, obj.board);
        game = checkers.createGame(board);
        game.load(obj);
        if (game.whiteTurn)
            $('#controls').removeClass('dark').addClass('light');
        else
            $('#controls').removeClass('light').addClass('dark');
    });
});

/**
 * @function subscribe
 * @description subscribe to position changes on the checkers board
 * @access public
 * 
 * @param {Board} board
 */
function subscribe(board) {
    board.onSet((piece, id) => {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.onDelete((piece, id) => {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
}

/**
 * @function unsubscribe
 * @description unsubscribe from position changes on the checkers board
 * @access public
 * 
 * @param {Board} board
 */
function unsubscribe(board) {
    board.offSet((piece, id) => {
        $('#' + id).addClass(piece.colorClass).addClass(piece.kindClass);
    });
    board.offDelete((piece, id) => {
        $('#' + id).removeClass(piece.colorClass).removeClass(piece.kindClass);
    });
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
