/*!
 * requires-regex <https://github.com/jonschlinkert/requires-regex>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var re = require('./');

function match(str) {
  var matches = [], m;
  while (m = re().exec(str)) {
    matches.push(m[2]);
    str = str.slice(m.index + m[0].length);
  }
  return matches;
}

describe('requires regex', function () {
  it('should match require statements without a var', function () {
    assert(re().test('require(\'foo\');'))
    assert(re().test('require(\'foo\')'))
  });

  it('should match require statements without a var', function () {
    assert(re().test('require(\'foo\');'))
    assert(re().test('require(\'foo\')'))
  });

  it('should return the full statement, variable name, and module name', function () {
    var a = re().exec('var isDir = require(\'is-directory\');');
    assert.equal(a[0], 'var isDir = require(\'is-directory\');');
    assert.equal(a[1], 'isDir');
    assert.equal(a[2], 'is-directory');

    var b = re().exec('var isDir = require(\'is-directory\')');
    assert.equal(b[0], 'var isDir = require(\'is-directory\')');
    assert.equal(b[1], 'isDir');
    assert.equal(b[2], 'is-directory');
  });

  it('should return an array of matches', function () {
    var str = 'var path = require(\'path\')var list = require(\'dirs\');'
    assert.deepEqual(match(str), ['path', 'dirs']);
    assert.deepEqual(match('require(\'path\')\nrequire(\'dirs\');'), ['path', 'dirs']);
    assert.deepEqual(match('require("path")\nrequire("dirs");'), ['path', 'dirs']);
    assert.deepEqual(match('require("path")require("dirs");'), ['path', 'dirs']);
    assert.deepEqual(match('var foo = require("path")require("dirs");'), ['path', 'dirs']);
    assert.deepEqual(match('var\nfoo\n=\nrequire("path")require("dirs");'), ['path', 'dirs']);
    assert.deepEqual(match('var foo = require("path")require("dirs")'), ['path', 'dirs']);
    assert.deepEqual(match('foo = require("path")require("dirs")'), ['path', 'dirs']);
    assert.deepEqual(match('foo = require("path")bar = require("dirs")'), ['path', 'dirs']);
    assert.deepEqual(match('foo = require("a-b")bar = require("c-d-e")'), ['a-b', 'c-d-e']);
    assert.deepEqual(match('foo = require("./path")bar = require("./dirs")'), ['./path', './dirs']);
    assert.deepEqual(match('const foo = require("./path")bar = require("./dirs")'), ['./path', './dirs']);
  });

  it('should match indented variables', function () {
    var str = '    var path = require(\'path\');\n\nvar list = require(\'dirs\');';
    assert.deepEqual(match(str),['path', 'dirs']);
  });
});
