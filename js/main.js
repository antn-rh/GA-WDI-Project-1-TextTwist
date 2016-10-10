  var arraySolutions = ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN','MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'];

  var scramble = 'N E D M A D';

  var guessedCorrect = [];

$(document).ready(function() {

  // appends scramble upon document load
  $(function() {
    $('#scramble').append(scramble);
  });

  arraySolutions.forEach(function(word) {
    var numChar = word.length;
    var spots = '_ '.repeat(numChar);
    $('#wordList').append('<li>' + spots + '</li>');
  });

  // checks words across arraySolutions
  function checkWord() {
    var choice = $('#input1').val().toUpperCase().replace(/\s/g, '');
    for(var i = 0; i < arraySolutions.length; i++) {
      if(choice == arraySolutions[i]) {
        $('#wordList').append('<li>' + choice + '</li>');
        guessedCorrect.push(choice);
        return;
      }
      for(var j = 0; j < guessedCorrect.length; j++) {
        if(choice == guessedCorrect[j]) {
          $('#tryAgain').html("You already guessed this word. Try again!")
          return;
        }
      }
    }
    $('#tryAgain').html("Invalid word. Try again!")
  }
  // runs checkWord upon releasing ENTER GXkey
  $('#input1').keyup(function(event) {
    if(event.keyCode == 13) {
      $('#tryAgain').html("");
      checkWord();
      $('#input1').val("");
    }
  });

// end of document.ready function
});
