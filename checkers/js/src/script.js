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
