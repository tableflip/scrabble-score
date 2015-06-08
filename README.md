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
