
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

module.exports = wordScore
module.exports.letterScores = letterScores
