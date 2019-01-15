import $ from 'jquery'

$(function() {
  var boardElement = $('#board');
  var rowElement = $('<div class="last-row"/>').appendTo(boardElement);
  appendLetterRow(rowElement);
  for (var i = 8; i > 0; i--) {
    rowElement = $('<div class="row"/>').appendTo(boardElement);
    appendCellRow(rowElement, i);
  }
  rowElement = $('<div class="zero-row"/>').appendTo(boardElement);
  appendLetterRow(rowElement);
});

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
    $('<div />', {
      'id': String.fromCharCode(i) + index,
      'class': 'cell'
    }).appendTo(rowElement);
  }
  $('<div class="digit" />').appendTo(rowElement).text(index);
}
