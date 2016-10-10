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
function checkWord(words) {
  for(var i = 0; i < arraySolutions.length; i++) {
    if($('#input').val("") == arraySolutions[i]) {
      this.append($('#completed'));
    } else {
      $('#tryAgain').html("Invalid Word. Try Again!")
    }
  }
}

// runs checkWord upon releasing ENTER key 
$('#input').keyup(function(event) {
  if(event.keyCode == 13) {
    $('#input').click(checkWord);
    $('#input').val(" ");
  }
});
