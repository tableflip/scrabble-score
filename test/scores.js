var test = require('tape')
var wordscore = require('../index.js')

test('scoring', function (t) {
  t.plan(2)
  t.equal(17, wordscore('helloworld'), 'helloworld is 17 points.')
  t.equal(16, wordscore('tableflip'), 'tableflip is 16 points, but worth so much more.')
})
