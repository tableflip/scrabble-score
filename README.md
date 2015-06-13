Scrabble Score
==============

**Map words to their scrabble scores.**

Exports a single js function; takes a string, returns a number.

Case is unimportant, scrabble-score don't care.

Unknown characters are given a 0, `' ' => 0`, as does `'!?' => 0`.


**Example**
```js
var wordscore = require('../index.js')

var score = wordscore('tableflip')
console.assert(score === 16, "tableflip is worth 16 points")
```

Use `npm test` to run the tests.

Letter score data lovingly transcribed from google.com via: http://www.hasbro.com/scrabble/en_US/discover/faq.cfm

## New usage

```js
var Score = require('scrabble-score').Score
var Letter = require('scrabble-score').Letter

var score = new Score()

var points = score.play([
  new Letter('T', 0, 0),
  new Letter('A', 1, 0),
  new Letter('B', 2, 0),
  new Letter('L', 3, 0),
  new Letter('E', 4, 0),
  new Letter('F', 5, 0),
  new Letter('L', 6, 0),
  new Letter('I', 7, 0),
  new Letter('P', 8, 0)
])

console.log('Points for word TABLEFLIP: ', points)
```