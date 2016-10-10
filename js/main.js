$(document).ready(function() {

console.log('connected');
// arrays for solutions, 6 letter scramble, guesses
var arraySolutions = ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN', 'MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'];

var scramble = 'N E D M A D';

var guessedCorrect = [];

// appends scramble upon document load
$(function() {
  $('#scramble').append(scramble);
});

// checks words across arraySolutions
function checkWord() {
  console.log($('#input1').val().toUpperCase())
  for(var i = 0; i < arraySolutions.length; i++) {
    console.log(arraySolutions[i]);
    if($('#input1').val().toUpperCase() == arraySolutions[i]) {
      $('#completed').append($('#input1').val());
      guessedCorrect.push(this);
      return;
    }
  }
  $('#tryAgain').html("Invalid Word. Try Again!")
}

// runs checkWord upon releasing ENTER key
$('#input1').keyup(function(event) {
  if(event.which == 13) {
    checkWord();
    $('#input1').val(" ");
  }
});

});
