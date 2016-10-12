$(document).ready(function() {

  // appends scramble upon document load
  var seconds = 120;
  var randomRound = Math.floor(Math.random() * games.length);
  var roundScramble = games[randomRound].scramble;
  var roundList = games[randomRound].solutions;
  var $start = $('#start');

  // start will reveal words and start the timer
  $('#start').click(function() {
    $('#typing').append('<input id="inputBox"></input>');
    // runs checkWord upon releasing ENTER key
    $('#inputBox').keyup(function(event) {
      if(event.keyCode == 13) {
        // clear tryAgain html before checkWord()
        $('#tryAgain').html("");
        checkWord();
        $('#inputBox').val("");
      };
    });
    $('#inputBox').keyup(function(event) {
      if(event.keyCode == 32) {
        shuffler();
      };
    });
    roundPicker();
    $('#start').detach();
    startTimer();
  });

  function startTimer() {
    $('#timer').html('Time Left: 2:00');
    var timer = setInterval(function() {
      seconds--;
      var displaySeconds;
      if(seconds == -1) {
        clearInterval(timer);
        loseGame();
      };
      if(guessedCorrect.length == roundList.length) {
        clearInterval(timer);
      }
      if(seconds > 60) {
        var partialSeconds = seconds - 60;
        displaySeconds = 'Time Left: 1:' + partialSeconds;
      } else if(seconds == 60) {
        displaySeconds = 'Time Left: 1:00';
      } else {
        displaySeconds = 'Time Left: 0:' + seconds;
      }
      $('#timer').html(displaySeconds);
    },1000);
  }

  function roundPicker() {
    $('#scramble').html(roundScramble);
    roundList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').html('<li>' + spots +'</li>');
    });
    games.splice([randomRound], 1);
  };

  // checks words across roundList
  function checkWord() {
    var choice = $('#inputBox').val().toUpperCase().replace(/\s/g, '');
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
        };
      };
    };
    $('#tryAgain').html("Invalid word. Try again!")
  };

  // shuffler
  function shuffler() {
    var strSplit = roundScramble.split(" ");
    var newScramble = [];
    var strLength = strSplit.length;
    for(var i = 0; i < strLength; i++) {
      var j = Math.floor(Math.random() * strSplit.length);
      newScramble.push(strSplit[j]);
      strSplit.splice(j, 1);
    };
      var newScramble = newScramble.join(" ");
      $('#scramble').html(newScramble);
      $('#inputBox').val("");
    };

  // winGame function checks array length bc arrays can't be equal to each other
  function loseGame() {
      var $gameOver = $('<button id="restart">Try Again</button>')
      $('#intro').append($gameOver);
      $('#inputBox').remove();
      $('#restart').click(function() {
        $('#restart').remove();
        window.location.reload();
      });
  };

  function winGame() {
    if(guessedCorrect.length == roundList.length) {
      var $winButton = $('<button id="next">Next Round</button>');
      $('#intro').append($winButton);
      $('#next').click(newRound);
    };
  };

  function newRound() {
    seconds = 120;
    startTimer();
    guessedCorrect = [];
    var nextRound = Math.floor(Math.random() * games.length);
    var nextScramble = games[nextRound].scramble;
    roundList = games[nextRound].solutions;
    $('#scramble').html(nextScramble);
    roundList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').html('<li>' + spots +'</li>');
    });
    games.splice([nextRound], 1);
    $('#next').remove();
  };

  // quit game reloads the page
  $('#quit').click(function() {
    window.location.reload();
  });


// end of document.ready function
});
