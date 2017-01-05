// to do list:
// responsive design
// generate solutions instead of hardcode?
// sounds
// UI improvements
// fix issue where you can win round with 1 less word than solutions.list

var guessedCorrect = [];

var games = [
  {
    solutions: ['ADD', 'ADE', 'AND', 'DAD', 'DAM', 'DEN', 'END', 'MAD', 'MAN', 'MEN', 'AMEN', 'DAME', 'DAMN', 'DEAD', 'DEAN', 'MADE', 'MANE', 'MEAD', 'MEAN','MEND', 'NAME', 'AMEND', 'NAMED', 'DAMNED', 'DEMAND', 'MADDEN'],
    // solutions: ['ADD'],
    scramble: 'N E D M A D'
  },
  {
    solutions: ['HER', 'HUE', 'HUT', 'LET', 'RET', 'RUE', 'RUT', 'THE', 'HURL', 'HURT', 'LURE', 'LUTE', 'RULE', 'TRUE', 'HURTLE'],
    // solutions: ['HER'],
    scramble: 'L E T R H U'
  },
  {
    solutions: ['ERE', 'HER', 'RED', 'DEED', 'DEER', 'HEED', 'HERD', 'HERE', 'REED', 'HERDED'],
    // solutions: ['ERE'],
    scramble: 'H R E D D E'
  },
  {
    solutions: ['BED', 'BOO', 'DOE', 'ODE', 'ZED', 'ZOO', 'BODE', 'BOZO', 'DOZE', 'OBOE', 'OOZE', 'BOOED', 'BOOZE', 'OOZED', 'BOOZED'],
    // solutions: ['BED'],
    scramble: 'D E Z O B O'
  },
  {
    solutions: ['ALE', 'ARE', 'BAR', 'BRA', 'EAR', 'ERA', 'LAB', 'LEA', 'REV', 'ABLE', 'AVER', 'BALE', 'BARE', 'BEAR', 'EARL', 'LAVE', 'RAVE', 'REAL', 'VALE', 'VEAL', 'BLARE', 'BRAVE', 'RAVEL', 'VERBAL'],
    // solutions: ['ALE'],
    scramble: 'L A B V R E'
  },
  {
    solutions:['ADO', 'ADS', 'ASH', 'DAW', 'HAD', 'HAS', 'HAW', 'HOD', 'HOW', 'SAD', 'SAW', 'SOD', 'SOW', 'WAD', 'WAS', 'WHO', 'DASH', 'DAWS', 'HAWS', 'HODS', 'SHAD', 'SHOD', 'SHOW', 'SODA', 'WADS', 'WASH', 'WHOA', 'SHADOW'],
    // solutions: ['ADO'],
    scramble:'D S O H W A'
  },
  {
    solutions: ['RUM', 'RUT', 'SUM', 'MUSS', 'MUST', 'RUMS', 'RUST', 'RUTS', 'SMUT', 'SUMS', 'RUSTS', 'STRUM', 'TRUSS', 'STRUMS'],
    // solutions: ['RUM'],
    scramble: 'M U R T S S'
  },
  {
    solutions: ['AGE', 'ALE', 'ALL', 'EEL', 'ELL', 'GAL', 'GEE', 'GEL', 'LAG', 'LEA', 'LEE', 'LEG', 'ALEE', 'GALE', 'GALL', 'GLEE', 'EAGLE', 'LEGAL', 'ALLEGE'],
    // solutions: ['AGE'],
    scramble: 'G A L E L E'
  },
  {
    solutions:['AIR', 'ARC', 'CAR', 'GAR', 'GAS', 'RAG', 'RIG', 'SAC', 'SAG', 'SIC', 'SIR', 'AIRS', 'ARCS', 'CARS', 'CRAG', 'GARS', 'RAGS', 'RIGS', 'SARI', 'SCAR', 'CIGAR', 'CRAGS', 'CIGARS'],
    // solutions:['AIR'],
    scramble: 'S C R I A G'
  },
  {
    solutions:['ALE', 'ASS', 'EEL', 'LEA', 'LEE', 'SEA', 'SEE', 'ALEE', 'ALES', 'EASE', 'EELS', 'ELSE', 'LASS', 'LEES', 'LESS', 'SALE', 'SEAL', 'SEAS', 'SEES', 'EASEL', 'EASES', 'LEASE', 'SALES', 'SEALS', 'EASELS', 'LEASES'],
    // solutions:['ALE'],
    scramble: 'S E L A S E'
  },
  {
    solutions: ['EEL', 'LEE', 'LET', 'SEE', 'SET', 'TEE', 'EELS', 'ELSE', 'LEES', 'LESS', 'LEST', 'LETS', 'SEES', 'SETS', 'TEES', 'SLEET', 'STEEL', 'SLEETS', 'STEELS'],
    // solutions: ['EEL'],
    scramble: 'E S L E S T'
  },
  {
    solutions: ['DOE', 'DOG', 'EGO', 'GEL', 'GOD', 'LED', 'LEG', 'LOG', 'ODE', 'OLD', 'DOLE', 'DOVE', 'GELD', 'GOLD', 'LODE', 'LOGE', 'LOVE', 'OGLE', 'VELD', 'VOLE', 'GLOVE', 'LODGE', 'LOVED', 'OGLED', 'GLOVED'],
    // solutions: ['DOE'],
    scramble: 'D O G V E L'
  },
  {
    solutions: ['ALL', 'LOT', 'OAT', 'SAT', 'SOT', 'ALSO', 'ALTO', 'LAST', 'LOST', 'LOTS', 'OAST', 'OATS', 'SALT', 'SLAT', 'SLOT', 'TALL', 'TOLL', 'ALLOT', 'ALTOS', 'ATOLL', 'STALL', 'TOLLS', 'ALLOTS', 'ATOLLS'],
    // solutions: ['ALL'],
    scramble: 'L A T L O S'
  },
  {
    solutions: ['ADE', 'ARE', 'EAR', 'ERA', 'ERE', 'ERR', 'RED', 'DARE', 'DEAR', 'DEER', 'RARE', 'READ', 'REAR', 'REED', 'ERRED', 'DEARER', 'READER', 'REARED', 'REREAD'],
    // solutions: ['ADE'],
    scramble: 'A R E R D E'
  },
  {
    solutions: ['AND', 'DUN', 'HAD', 'NUN', 'HAND', 'UNHAND'],
    // solutions: ['AND'],
    scramble: 'U D A N H N'
  },
  {
    solutions: ['DUE', 'SEE', 'SUE', 'USE', 'DUES', 'SEED', 'SEES', 'SUDS', 'SUED', 'SUES', 'USED', 'USES', 'SEEDS', 'SUEDE', 'SUEDES'],
    // solutions: ['DUE'],
    scramble: 'S S D E U E'
  },
  {
    solutions: ['ARC', 'ARK', 'ASK', 'CAN', 'CAR', 'RAN', 'SAC', 'ARCS', 'ARKS', 'CANS', 'CARS', 'CASK', 'RACK', 'RANK', 'SACK', 'SANK', 'SCAN', 'CRANK', 'NARCS', 'RACKS', 'RANKS', 'SNACK', 'CRANKS'],
    // solutions: ['ARC'],
    scramble: 'R K C S N A'
  },
  {
    solutions: ['FEN', 'FIE', 'FIN', 'FIT', 'NET', 'NIT', 'TEN', 'TIE', 'TIN', 'FINE', 'TINE', 'FEINT', 'FINITE'],
    // solutions: ['FEN'],
    scramble: 'T F N I E I'
  },
  {
    solutions: ['HER', 'HIE', 'HIS', 'IRE', 'REV', 'SHE', 'SIR', 'VIE', 'HEIR', 'HERS', 'HIES', 'HIRE', 'HIVE', 'REVS', 'RISE', 'RIVE', 'SIRE', 'VIES', 'VISE', 'HEIRS', 'HIRES', 'HIVES', 'RIVES', 'SHIER', 'SHIRE', 'SHIVER'],
    // solutions: ['HER'],
    scramble: 'H R S I E V'
  },
  {
    solutions: ['EEL', 'ERE', 'LEE', 'LET', 'RET', 'TEE', 'LEER', 'REEL', 'TREE', 'LETTER'],
    // solutions: ['EEL'],
    scramble: 'T L E R E T'
  },
]
