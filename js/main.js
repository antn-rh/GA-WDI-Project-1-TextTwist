console.log('connected');

var arraySolutions = ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN', 'MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'];

var scramble = 'N E D M A D';

var guessedCorrect = [];

$(function() {
  $('#scramble').append(scramble);
});

$('#input').keyup(function(event) {
  if(event.keyCode == 13) {
    $('#input').click(checkWord);
  }
});

function checkWord(words) {
  
}
