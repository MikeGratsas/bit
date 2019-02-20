//@codekit-prepend cell.js
//@codekit-prepend piece.js
//@codekit-prepend man.js
//@codekit-prepend king.js
//@codekit-prepend board.js
//@codekit-prepend game.js
//@codekit-prepend checkers.js

//import $ from 'jquery';

$(function () {
    markupBoard($('#board'));
    var state = null;
    var get_url_parameter = function (name) {
        if (URLSearchParams) {
            var searchParams = new URLSearchParams(window.location.search);
            return searchParams.get(name);
        }
        return null;
    };
    var update_texts = function () {
        $('.controls').i18n();
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
        }
        if (document.location.protocol !== 'file:') {
            if (History) {
                state = History.getState();
                History.Adapter.bind(window, 'statechange', function () {
                    var currentIndex = History.getCurrentIndex();
                    var state = History.getState();
                    if (state.data.index != currentIndex) {
                        var locale = get_url_parameter('language');
                        if (locale) {
                            $.i18n().locale = locale;
                            $("#language").val(locale);
                            update_texts();
                        }
                    }
                });
            }
        }
        update_texts();

        $("#language").change(function (event) {
            var locale = $(this).val();
            if (locale) {
                $.i18n().locale = locale;
                update_texts();
                if (History) {
                    History.pushState(null, null, "?language=" + locale);
                }
            }
        });
    });
    
    var checkers = new RussianCheckers();

    var board = checkers.createBoard();
    subscribeToBoard(board);
    var game = checkers.createGame(board);
    if (state) {
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
                    if (error == null) {
                        dataTransfer.effectAllowed = 'move';
                        dataTransfer.setData('text', event.target.id);
                        //dataTransfer.setDragImage(event.target, 100, 100);
                        return true;
                    }
                }
                else if (game.selected == this.id) {
                    dataTransfer.effectAllowed = 'move';
                    dataTransfer.setData('text', event.target.id);
                    //dataTransfer.setDragImage(event.target, 100, 100);
                    return true;
                }
            }
            dataTransfer.effectAllowed = 'none';
            return false;
        },
        dragenter: function (event) {
            event.preventDefault();
            return true;
        },
        dragover: function (event) {
            event.preventDefault();
        },
        drag: function (event) {
        },
        drop: function (event) {
            var dataTransfer = event.originalEvent.dataTransfer;
            var error = performMove(game, board, dataTransfer.getData('text'), this);
            if (error) {
                event.stopPropagation();
                return false;
            }
            return true;
        }
    });

    $(window).on('onbeforeunload', function () {
        if (document.location.protocol !== 'file:') {
            if (History) {
                History.pushState({ 'index': History.getCurrentIndex(), 'language': $().val(), 'game': game }, 'checkers', window.location.search);
            }
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
      $('#controls').removeClass('dark').addClass('light');
  else
      $('#controls').removeClass('light').addClass('dark');
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
