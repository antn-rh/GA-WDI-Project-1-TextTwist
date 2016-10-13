$(document).ready(function() {

  // appends scramble upon document load
  var seconds = 75;
  var score = 0;
  var randomRound = Math.floor(Math.random() * games.length);
  var roundScramble = games[randomRound].scramble;
  var roundList = games[randomRound].solutions;
  var $start = $('#start');

  // start will reveal words and start the timer
  $('#start').click(function() {
    $('#start').detach();
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
    startTimer();
  });

  function startTimer() {
    $('#timer').html('Time Left: 2:00');
    var timer = setInterval(function() {
      seconds--;
      var displaySeconds;
      var partialSeconds = seconds - 60;
      if(seconds == 0) {
        // guessedCorrect.forEach(function(word) {
        //   if(word.length == 6 && seconds == 0) {
        //     winGame();
        //     clearInterval(timer);
        //   } else if(seconds == 0) {
        //     loseGame();
        //     clearInterval(timer);
        //   }
        // });
        clearInterval(timer);
        loseGame();
      };
      if(guessedCorrect.length == roundList.length) {
      // if(guessedCorrect.length == 1) {
        clearInterval(timer);
      }
      if(seconds >= 70) {
        displaySeconds = 'Time Left: 1:' + partialSeconds;
      } else if(seconds == 60) {
        displaySeconds = 'Time Left: 1:00';
      } else if(seconds > 60 && seconds < 70) {
        displaySeconds = 'Time Left: 1:0' + partialSeconds;
      } else if(seconds < 10){
        displaySeconds = 'Time Left: 0:0' + seconds;
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
      $('#wordList').append('<li>' + spots +'</li>');
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
        if(choice.length == 3) {
          score = score + 50;
          $('#score').html('Score: ' + score);
        } else if(choice.length == 4) {
          score = score + 100;
          $('#score').html('Score: ' + score);
        } else if(choice.length == 5) {
          score = score + 200;
          $('#score').html('Score: ' + score);
        } else {
          score = score + 400;
          $('#score').html('Score: ' + score);
        }
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
    // if(guessedCorrect.length == 1) {
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
    $('#wordList').html("");
    roundList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').append('<li>' + spots +'</li>');
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
