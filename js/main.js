$(document).ready(function() {

  // appends scramble upon document load
  var seconds = 5;
  var score = 0;
  var randomRound = Math.floor(Math.random() * games.length);
  var roundScramble = games[randomRound].scramble;
  var roundList = games[randomRound].solutions;

  // start will reveal words and start the timer
  $('#start').click(function() {
    $('#start').detach();
    $('#typing').append('<input id="inputBox"></input>');
    gameStart();
    startTimer();
    enterKey();
    spaceKey();
    $('#quit').click(function() {
      window.location.reload();
    });
  });

  function startTimer() {
    $('#timer').html('Time Left: 2:00').css('color', 'black');
    var timer = setInterval(function() {
      seconds--;
      var displaySeconds;
      var partialSeconds = seconds - 60;
      if(seconds == 0) {
        var nextRound = false;
        guessedCorrect.forEach(function(word) {
          if(word.length == 6) {
            nextRound = true;
          }
        });
        clearInterval(timer);
        if(nextRound) {
          winGame()
          roundList.forEach(function(word, index) {
            if(!guessedCorrect.includes(word)) {
              $('li').eq(index).text(word).css('color', 'red');
            };
          });
        } else {
          loseGame();
        }
      };
      if(guessedCorrect.length == roundList.length) {
      // if(guessedCorrect.length == 1) {
        clearInterval(timer);
      }
      if(seconds >= 70) {
        displaySeconds = 'Time Left: 1:' + partialSeconds;
      } else if(seconds > 60 && seconds < 70) {
        displaySeconds = 'Time Left: 1:0' + partialSeconds;
      } else if(seconds == 60) {
        displaySeconds = 'Time Left: 1:00';
      } else if(seconds >= 10 && seconds < 60) {
        displaySeconds = 'Time Left: 0:' + seconds;
      } else if(seconds < 10) {
        displaySeconds = 'Time Left: 0:0' + seconds;
      }
      if(seconds > 10) {
        $('#timer').html(displaySeconds).css('color', 'black');
      } else if(seconds <= 10) {
        $('#timer').html(displaySeconds).css('color', 'red');
      }
    },1000);
  }

  function gameStart() {
    $('#scramble').html(roundScramble);
    addSpots();
  };

  function addSpots() {
    roundList.forEach(function(word) {
      var numChar = word.length;
      var spots = ' _ '.repeat(numChar);
      $('#wordList').append('<li>' + spots +'</li>');
    });
    games.splice([randomRound], 1);
  }

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
        setTimeout(function() {
          if(guessedCorrect.length == roundList.length) {
            winGame();
          }
        }, 100);
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

  // enter key runs checkWord and clears box + try again
  function enterKey() {
    $('#inputBox').keyup(function(event) {
      if(event.keyCode == 13) {
        $('#tryAgain').html("");
        checkWord();
        $('#inputBox').val("");
      };
    });
  }

  // pressing spacebar shuffles scramble
  function spaceKey() {
    $('#inputBox').keyup(function(event) {
      if(event.keyCode == 32) {
        shuffler();
      };
    });
  }

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
      roundList.forEach(function(word, index) {
        if(!guessedCorrect.includes(word)) {
          $('li').eq(index).text(word).css('color', 'red');
        };
      });
      $('#inputBox').remove();
      $('#restart').click(function() {
        $('#restart').remove();
        window.location.reload();
      });
  };

  function winGame() {
    var $winButton = $('<button id="next">Next Round</button>');
    $('#intro').append($winButton);
    $('#next').click(newRound);
    $('#inputBox').remove();
  };

  function newRound() {
    guessedCorrect = [];
    seconds = 120;
    startTimer();
    randomRound = Math.floor(Math.random() * games.length);
    roundScramble = games[randomRound].scramble;
    roundList = games[randomRound].solutions;
    $('#scramble').html(roundScramble);
    $('#wordList').html("");
    $('#next').remove();
    $('#typing').append('<input id="inputBox"></input>');
    addSpots();
    enterKey();
    spaceKey();
  };

// end of document.ready function
});
