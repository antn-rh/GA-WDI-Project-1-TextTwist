$(document).ready(function() {

  // appends scramble upon document load
  $(function() {
    $('#scramble').append(scramble);
  });

  arraySolutions.forEach(function(word) {
    var numChar = word.length;
    var spots = ' _ '.repeat(numChar);
    $('#wordList').append('<li>' + spots +'</li>');
  });

  // checks words across arraySolutions
  function checkWord() {
    var choice = $('#input1').val().toUpperCase().replace(/\s/g, '');
    for(var i = 0; i < arraySolutions.length; i++) {
      if(choice == arraySolutions[i]) {
        $('li').eq(i).html(choice);
        guessedCorrect.push(choice);
        setTimeout(winGame, 100);
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

  // runs checkWord upon releasing ENTER key
  $('#input1').keyup(function(event) {
    if(event.keyCode == 13) {
      $('#tryAgain').html("");
      checkWord();
      $('#input1').val("");
    }
  });

  function winGame() {
    if(guessedCorrect.length == arraySolutions.length) {
      alert('Congratulations! You finished this round!');
    }
  }

// end of document.ready function
});
