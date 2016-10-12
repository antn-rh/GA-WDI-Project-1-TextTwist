$(document).ready(function() {

  // appends scramble upon document load
  $(function() {
    $('#scramble').append(roundPicker());
  });

    var randomRound = Math.floor(Math.random() * games.length);
    var roundScramble = games[randomRound].scramble;
    var roundList = games[randomRound].solutions;

  function roundPicker() {
    $('#scramble').append(roundScramble);
    roundList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').append('<li>' + spots +'</li>');
    });
    games.splice([randomRound], 1);
  };


  // checks words across roundList
  function checkWord() {
    var choice = $('#input1').val().toUpperCase().replace(/\s/g, '');
    for(var i = 0; i < roundList.length; i++) {
      if(choice == roundList[i]) {
        $('li').eq(i).html(choice);
        guessedCorrect.push(choice);
        setTimeout(winGame, 100);
        return;
      }
  // second for loop to check if choice == guessedCorrect
      for(var j = 0; j < guessedCorrect.length; j++) {
        if(choice == guessedCorrect[j]) {
          $('#tryAgain').html("You already guessed this word. Try again!");
          return;
        }
      }
    }
    $('#tryAgain').html("Invalid word. Try again!")
  };

  // runs checkWord upon releasing ENTER key
  $('#input1').keyup(function(event) {
    if(event.keyCode == 13) {
      // clear tryAgain html before checkWord()
      $('#tryAgain').html("");
      checkWord();
      $('#input1').val("");
    }
  });

  // shuffler
  $('#input1').keyup(function(event) {
    if(event.keyCode == 32) {
      shuffler();
    }
  });

  function shuffler() {
    var strSplit = roundScramble.split(" ");
    var newScramble = [];
    var strLength = strSplit.length;
    for(var i = 0; i < strLength; i++) {
      var j = Math.floor(Math.random() * strSplit.length);
      newScramble.push(strSplit[j]);
      //array.splice(start, deleteCount[, item1[, item2[, ...]]])
      strSplit.splice(j, 1);
    }
      var newScramble = newScramble.join(" ");
      // console.log(newScramble);
      $('#scramble').html(newScramble);
      $('#input1').val("");
    };

  // winGame function checks array length bc arrays can't be equal to each other
  function winGame() {
    if(guessedCorrect.length == roundList.length) {
      var $winButton = $('<button id="next">Next Round</button>');
      $('body').append($winButton);
      $('#next').click(newRound);

    }
  };

  function newRound() {
    var nextRound = Math.floor(Math.random() * games.length);
    var nextScramble = games[nextRound].scramble;
    var nextList = games[nextRound].solutions;
    $('#scramble').html(nextScramble);
    nextList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').html('<li>' + spots +'</li>');
    });
    games.splice([nextRound], 1);
  };


// end of document.ready function
});
