//@codekit-prepend piece.js
//@codekit-prepend man.js
//@codekit-prepend king.js
//@codekit-prepend board.js
//@codekit-prepend game.js

//import $ from 'jquery';

$(function() {
  var board = new Board();
  var game = new Game(board);
  setupBoard($('#board'), board);
});

function setupBoard(boardElement, board) {
  markupBoard(boardElement);
  for (var [key, value] of board.position) {
    if (key != null) {
      $('#' + key).addClass(value.white? 'white': 'black').addClass(value.kindClass);
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
