$(document).ready(function() {

  // appends scramble upon document load
  $(function() {
    $('#scramble').append(scramble);
  });

  // creates underscore marks according to number of letters per word
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
  // second for loop to check if choice == guessedCorrect
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
      // clear tryAgain html before checkWord()
      $('#tryAgain').html("");
      checkWord();
      $('#input1').val("");
    }
  });

  shuffler
  $('#input1').keyup(function(event) {
    if(event.keyCode == 32) {
      shuffler();
    }
  });

  function shuffler() {
    var a = scramble.split(" ");
    var newScramble = [];
    var aLength = a.length;
    for(var i = 0; i < aLength; i++) {
      var j = Math.floor(Math.random() * a.length);
      newScramble.push(a[j]);
      //array.splice(start, deleteCount[, item1[, item2[, ...]]])
      a = a.splice(i, 1);
    }
    var newScramble = newScramble.join(" ");
    console.log(newScramble);
    $('#scramble').html(newScramble);
  }

  // winGame function checks array length bc arrays can't be equal to each other
  function winGame() {
    if(guessedCorrect.length == arraySolutions.length) {
      alert('Congratulations! You finished this round!');
    }
  }

// end of document.ready function
});
