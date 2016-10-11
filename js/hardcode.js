// var arraySolutions = ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN','MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'];
// // var arraySolutions = ['ADD']
//
// var scramble = 'N E D M A D';

var guessedCorrect = [];

var games = [
  {
    solutions: ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN','MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'],
    scramble: 'N E D M A D'
  },
  {
    solutions: ['HER', 'HUE', 'HUT', 'LET', 'RET', 'RUE', 'RUT', 'THE', 'HURL', 'HURT', 'LURE', 'LUTE', 'RULE', 'TRUE', 'HURTLE'],
    scramble: 'L E T R H U'
  },
  {
    solutions: ['ERE', 'HER', 'RED', 'DEED', 'DEER', 'HEED', 'HERD', 'HERE', 'REED', 'HERDED'],
    scramble: 'H R E D D E'
  },
  {
    solutions: ['BED', 'BOO', 'DOE', 'ODE', 'ZED', 'ZOO', 'BODE', 'BOZO', 'DOZE', 'OBOE', 'OOZE', 'BOOED', 'BOOZE', 'OOZED', 'BOOZED'],
    scramble: 'D E Z O B O'
  },
  {
    solutions: ['ALE', 'ARE', 'BAR', 'BRA', 'EAR', 'ERA', 'LAB', 'LEA', 'REV', 'ABLE', 'AVER', 'BALE', 'BARE', 'BEAR', 'EARL', 'LAVE', 'RAVE', 'REAL', 'VALE', 'BLARE', 'BRAVE', 'RAVEL', 'VERBAL'],
    scramble: 'L A B V R E'
  }
]
