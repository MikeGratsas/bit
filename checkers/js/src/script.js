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
                    if (error == null) {
                        return startDrag(dataTransfer, event, board);
                    }
                }
                else if (game.selected == this.id) {
                     return startDrag(dataTransfer, event, board);
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
                if (game.finished) {
                  alert(error);
                }
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

function startDrag(dataTransfer, event, board) {
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text', event.target.id);

    if (dataTransfer.setDragImage) {
        var element = selectBackgroundImage(board, event.target.id);
        if (element) {
            var clientRect = event.target.getBoundingClientRect();
            var offsetX = event.clientX - clientRect.left;
            var offsetY = event.clientY - clientRect.top;
            dataTransfer.setDragImage(element, offsetX, offsetY);
        }
    }

    setTimeout(function () {
        $(event.target).css('background-image', 'none');
    }, 100);
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

function selectBackgroundImage(board, selected) {
    var img = null;
    var piece = board.getPiece(selected);
    if (piece) {
        img = document.getElementById(piece.colorClass + '-' + piece.kindClass);
    }
    return img;
}

function createDragImage(dataTransfer, event) {
  var path = $(event.target).css('background-image').match(/^url\("?(.+?)"?\)$/)[1];
  if (path) {
      var srcImage = new Image($(event.target).width(), $(event.target).height());
      srcImage.setAttribute('crossOrigin', 'anonymous');
      srcImage.onload = function () {
        var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        var img = new Image(canvas.width, canvas.height);
        img.onload = function () {
          var clientRect = event.target.getBoundingClientRect();
          var offsetX = event.clientX - clientRect.left;
          var offsetY = event.clientY - clientRect.top;
          dataTransfer.setDragImage(this, offsetX, offsetY);
        }
        img.src = canvas.toDataURL('image/png');
      }
      srcImage.src = path;
  }
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
