var scrabbleBoardScores = require('scrabble-board')

var points = {
  1: 'AEIOULNSTR',
  2: 'DG',
  3: 'BCMP',
  4: 'FHVWY',
  5: 'K',
  8: 'JX',
  10: 'QZ'
}

// {A: 1, B: 3, C: 3 ...}
var letterScores = Object.keys(points).reduce(function (res, score) {
  var letters = points[score].split('')
  letters.forEach(function (letter) {
    res[letter] = parseInt(score)
  })
  return res
}, {})

// 'helloword' => 17
function wordScore (word) {
  return word.toUpperCase().split('').map(letterScore).reduce(sum, 0)
}

// 'h' => 4
// any chars not found in the points map, is a 0.
function letterScore (char) {
  return letterScores[char] || 0
}

function sum (a, b) {
  return a + b
}

var Direction = {
  Horizontal: 0,
  Vertical: 1
}

function Letter (char, x, y) {
  this.char = char
  this.x= x
  this.y = y
}

function Score (opts) {
  opts = opts || {}
  opts.points = opts.points || {}

  // Allows for custom boards and letter scores
  this._points = {
    board: opts.points.board || scrabbleBoardScores(),
    letter: opts.points.letter || letterScores
  } 

  // Create an empty played letters grid based on the board
  this._letters = this._points.board.slice().reduce(function (letters, row) {
    row.push(letters.map(function () { return null }))
    return row
  }, [])

  this._plays = []
}

Score.prototype.play = function (letters) {
  if (letters.length < 2) throw new Error('Minimum letters in a word is 2')

  this._validateLetters(letters)

  // Infer direction
  var dir = Direction.Horizontal

  if (letters[0].x == letters[1].x) {
    dir = Direction.Vertical
  }

  var points = 0

  if (dir == Direction.Horizontal) {
    points = this._pointsHorizontal(letters)
  } else {
    points = this._pointsVertical(letters)
  }

  this._placeLetters(letters)
  this._plays.push(letters)

  return points
}

Score.prototype._pointsHorizontal = function (letters) {
  var mainWord = this._getWord(letters[0].x, letters[0].y, Direction.Horizontal, letters)

  var otherWords = letters.reduce(function (words, letter) {
    var word = this._getWord(letter.x, letter.y, Direction.Vertical, letters)
    if (word) words.push(word)
    return words
  }.bind(this), [])

  // Now we have all the words applicable for the letters played
  // TODO: Enumerate points for each word
  return 0
}

Score.prototype._pointsVertical = function (letters) {
  var mainWord = this._getWord(letters[0].x, letters[0].y, Direction.Vertical, letters)

  var otherWords = letters.reduce(function (words, letter) {
    var word = this._getWord(letter.x, letter.y, Direction.Horizontal, letters)
    if (word) words.push(word)
    return words
  }.bind(this), [])

  // Now we have all the words applicable for the letters played
  // TODO: Enumerate points for each word
  return 0
}

// Get a word on the scrabble board comprised of existing board letters and new ones passed
Score.prototype._getWord = function (startX, startY, dir, letters) {
  var word = []
  var startLetter = this._findLetter(x, y, letters) || this._getLetter(x, y)
  var x = startLetter.x
  var y = startLetter.y
  var letter = null

  if (dir == Direction.Horizontal) {
    // Move left until we find a square with no letter
    while (this._findLetter(x - 1, y, letters) || this._getLetter(x - 1, y)) {
      startLetter = this._letters[x - 1][y]
      x--
    }

    // Move right until we find a square with no letter
    letter = startLetter

    while (letter) {
      word.push(letter)
      x++
      letter = this._findLetter(x, y) || this._getLetter(x, y)
    }
  } else {
    // Move up until we find a square with no letter
    while (this._findLetter(x, y - 1, letters) || this._getLetter(x, y - 1)) {
      startLetter = this._letters[x][y - 1]
      y--
    }

    // Move right until we find a square with no letter
    letter = startLetter

    while (letter) {
      word.push(letter)
      y++
      letter = this._findLetter(x, y) || this._getLetter(x, y)
    }
  }

  return word.length > 1 ? word : null
}

// Get an existing letter on the board
Score.prototype._getLetter = function (x, y) {
  if (x < 0 || x > this._letters.length - 1) return null
  if (y < 0 || y > this._letters[0].length - 1) return null
  return this._letters[x][y]
}

// Find a letter with the given coords in the list of letters
Score.prototype._findLetter = function (x, y, letters) {
  for (var i = 0; i < letters.length; i++) {
    if (x == letters[i].x && y == letters[i].y) return letters[i]
  }
}

Score.prototype._validateLetters = function (letters) {
  letters.forEach(function (letter) {
    if (letter.x < 0 || letter.x > this._letters.length) {
      throw new RangeError('Letter x coord is not on the board')
    }

    if (letter.y < 0 || letter.y > this._letters[0].length) {
      throw new RangeError('Letter y coord is not on the board')
    }
  }.bind(this))
}

Score.prototype._placeLetters = function (letters) {
  letters.forEach(function (letter) {
    this._letters[letter.x][letter.y] = letter
  }.bind(this))
}

exports.Score = Score
exports.Letter = Letter
