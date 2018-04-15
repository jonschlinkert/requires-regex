const regex = require('./');
const match = regex().exec('const foo = require(\'@bar/baz\');');
console.log(match);
// [ 'const foo = require(\'@bar/baz\');',
//   undefined,
//   'foo',
//   '\'',
//   '@bar/baz',
//   '@bar/baz',
//   'bar',
//   'baz',
//   index: 0,
//   input: 'const foo = require(\'@bar/baz\');' ]

console.log(regex().exec('require(\'foo\', "whatever")'))
