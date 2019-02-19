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
        update_texts();
        if (document.location.protocol !== 'file:') {
            if (History) {
                History.Adapter.bind(window, 'statechange', function () {
                    var locale = get_url_parameter('language');
                    if (locale) {
                        $.i18n().locale = locale;
                        $("#language").val(locale);
                        update_texts();
                    }
                });
            }
        }

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
    checkers.setupBoard(board);
    var game = checkers.createGame(board);
    subscribeToGame(game);
    $('.cell').click(function () {
        if (game.finished) {
            alert($.i18n('game-over', game.result > 0 ? $.i18n('player-light') : $.i18n('player-dark')));
        }
        else {
          var selected = game.selected;
          if (selected == null) {
              var error = selectPiece(game, board, this);
              if (error) {
                  alert(error);
              }
          }
          else {
              var piece = board.getPiece(selected);
              if (piece == null) {
                  alert($.i18n('not-selected-piece'));
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
                                  if (game.finished) {
                                      alert($.i18n('game-over', game.result > 0 ? $.i18n('player-light') : $.i18n('player-dark')));
                                  }
                              }
                          }
                          else {
                              alert($.i18n('illegal-jump-cell'));
                          }
                      }
                      else {
                          if (game.tryToMove(piece, this.id)) {
                              $('#' + selected).removeClass('selected');
                              if (game.selected != null)
                                  $(this).addClass('selected');
                          }
                          else {
                              alert($.i18n('illegal-move-cell'));
                          }
                      }
                  }
                  else {
                      alert($.i18n('occupided-cell'));
                  }
              }
          }
        }
    });

    $('.cell').on({
        dragstart: function (event) {
            if (!game.finished && game.selected == null) {
                var error = selectPiece(game, board, this);
                if (error == null) {
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('Text', event.target.id);
                    event.dataTransfer.setDragImage(event.target, 100, 100);
                    return true;
                }
            }
            event.dataTransfer.effectAllowed = 'none';
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
            var data = event.dataTransfer.getData('Text');
            //event.target.appendChild(document.getElementById(data));
            event.stopPropagation();
            return false;
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
