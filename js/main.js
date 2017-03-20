$(document).ready(function() {

  // appends scramble upon document load
  var seconds = 120;
  var score = 0;
  var randomRound = Math.floor(Math.random() * games.length);
  var roundScramble = games[randomRound].scramble;
  var roundList = games[randomRound].solutions;

  // start will reveal words and start the timer
  $('#start').click(function() {
    gameStart();
    startTimer();
    enterKey();
    spaceKey();
  });

  function gameStart() {
    addSpots();
    $('#scramble').html(roundScramble);
    $('#start').detach();
    $('#typing').append('<input id="inputBox"></input>');
    $('html,body').animate({
      scrollTop: $("#wordList").offset().top
    }, 'slow');
  };

  function startTimer() {
    $('#timer').html('Time Left: 2:00').css('color', 'black');
    var timer = setInterval(function() {
      seconds--;
      var timeRemaining;
      var partialSeconds = seconds - 60;

      if(seconds == 0) {
        clearInterval(timer);
        checkGameStatus();
      };

      if(guessedCorrect.length == roundList.length) {
      // if(guessedCorrect.length == 1) {
        clearInterval(timer);
      }

      showTimeRemaining(seconds, timeRemaining, partialSeconds);
    },1000);
  }

  function checkGameStatus() {
    var nextRound = false;
    guessedCorrect.forEach(function(word) {
      if(word.length == 6) {
        nextRound = true;
      }
    });
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
  }

  function showTimeRemaining(seconds, timeRemaining, partialSeconds) {
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
  }

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
        guessedCorrect.push(choice);
        $('#tryAgain').css('visibility', 'hidden');
        $('li').eq(i).html(choice);
        addPoints(choice);

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
          $('#tryAgain').html("You already guessed this word. Try again!").css('visibility', 'visible');
          return;
        };
      };
    };
    $('#tryAgain').html("Invalid word. Try again!").css('visibility', 'visible');
  };

  function addPoints(choice) {
    if (choice.length === 3) {
      score += 50;
    } else if (choice.length === 4) {
      score += 100;
    } else if (choice.length === 5) {
      score += 200;
    } else {
      score += 400;
    }
    $('#score').html('Score: ' + score);
  }

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
    var scrambleArray = roundScramble.split(' ');
    var scrambleLength = roundScramble.length;
    var newScramble = [];

    for (var i = 0; i < scrambleLength; i++) {
      var randomIndex = Math.floor(Math.random() * scrambleArray.length);
      newScramble.push(scrambleArray[randomIndex]);
      scrambleArray.splice(randomIndex, 1);
    }

    var newScramble = newScramble.join(' ');
    $('#scramble').html(newScramble);
    $('#inputBox').val('');
  }

  // winGame function checks array length bc arrays can't be equal to each other
  function loseGame() {
      var $gameOver = $('<button id="restart" class="btn btn-primary">Try Again</button>')
      $('#intro').append($gameOver);
      roundList.forEach(function(word, index) {
        if(!guessedCorrect.includes(word)) {
          $('li').eq(index).text(word).css('color', 'red');
        };
      });
      $('.modal-body').html('You failed to complete the round. Your final score: ' + score);
      $('#loseModal').modal('show');
      $('#inputBox').remove();
      $('#restart').click(function() {
        $('#restart').remove();
        window.location.reload();
      });
  };

  function winGame() {
    var $winButton = $('<button id="next" class="btn btn-success">Next Round</button>');
    $('#intro').append($winButton);
    $('#next').click(newRound);
    $('#inputBox').remove();
    $('#winModal').modal('show');
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
    $('#tryAgain').css('visibility', 'hidden');
    addSpots();
    enterKey();
    spaceKey();
  };

// end of document.ready function
});
