# requires-regex [![NPM version](https://badge.fury.io/js/requires-regex.svg)](http://badge.fury.io/js/requires-regex)

> Regular expressions for matching javascript require statements.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i requires-regex --save
```

## Usage

```js
var re = require('requires-regex');

re().exec('var foo = require(\'bar\');');
//=>
// [ 'var foo = require(\'bar\')',
//   'foo',
//   'bar',
//   index: 0,
//   input: 'var foo = require(\'bar\');' ]

var str = '    var path = require(\'path\');\n\nvar foo = require(\'bar\');';
var regex = new RegExp(re().source, 'gm');
console.log(str.match(regex));
//=> [ 'var path = require(\'path\')', 'var foo = require(\'bar\')' ]

re().test('require(\'foo\');');
//=> true
```

## Related projects

* [lint-deps](https://github.com/jonschlinkert/lint-deps): CLI tool that tells you when dependencies are missing from package.json and offers you a… [more](https://github.com/jonschlinkert/lint-deps)
* [match-requires](https://github.com/jonschlinkert/match-requires): Match require statements in a string. Returns an array of matching require statements. Each match… [more](https://github.com/jonschlinkert/match-requires)
* [regex-cache](https://github.com/jonschlinkert/regex-cache): Memoize the results of a call to the RegExp constructor, avoiding repetitious runtime compilation of… [more](https://github.com/jonschlinkert/regex-cache)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/requires-regex/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 19, 2015._