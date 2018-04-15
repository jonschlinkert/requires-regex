/*!
 * requires-regex <https://github.com/jonschlinkert/requires-regex>
 *
 * Copyright (c) 2014-2018 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var re = require('./');

function match(str) {
  var matches = [];
  var regex = re();
  var m;
  while ((m = regex.exec(str))) {
    if (!m[2] && !m[4]) continue;
    var tok = {};
    tok[m[2] || m[4]] = m[4];
    matches.push(tok);
  }
  return matches;
}

describe('requires regex', function() {
  it('should not match require statements in quotes', function() {
    assert.deepEqual(match('"require(\'foo\');"'), []);
    assert.deepEqual(match('"require(\'foo\')require(\'bar\');"'), []);
    assert.deepEqual(match('"require("foo")const foo = require(\'bar\');"'), []);
    assert.deepEqual(match('"require(\'foo\')const foo = require(\'bar\');"require("bar")'), [{bar: 'bar'}]);
  });

  it('should correctly detect the word "require" in statements in quoted strings', function() {
    assert.deepEqual(match('"this is not a require statement"'), []);
    assert.deepEqual(match('"this is not a require("") statement"'), []);
    assert.deepEqual(match('"this is not a require() statement"'), []);
  });

  it('should detect require statements before and after quoted strings with "require"', function() {
    assert.deepEqual(match('require("bar")"require(\'foo\');"require("baz")'), [{bar: 'bar'}, {baz: 'baz'}]);
    assert.deepEqual(match('\nrequire("bar")"\nrequire(\'foo\');"\n\nrequire("baz")'), [{bar: 'bar'}, {baz: 'baz'}]);
    assert.deepEqual(match('require("bar")"require(\'foo\');require(\'zzz\');"'), [{bar: 'bar'}]);
    assert.deepEqual(match('require("bar")"require(\'foo\');"'), [{bar: 'bar'}]);
  });

  it('should match require statements with no leading characters', function() {
    assert.deepEqual(match("const one = require('two');"), [{ one: 'two' }]);
    assert.deepEqual(match("require('foo')"), [{ foo: 'foo' }]);
    assert.deepEqual(match('require("foo")'), [{ foo: 'foo' }]);
    assert.deepEqual(match('require("./")'), [{ './': './' }]);
  });

  it('should work with backticks', function() {
    assert.deepEqual(match("const one = require(`two`);"), [{ one: 'two' }]);
    assert.deepEqual(match("\n\nrequire(`foo`);"), [{ foo: 'foo' }]);
    assert.deepEqual(match("\nrequire(`foo`);\n\n"), [{ foo: 'foo' }]);
    assert.deepEqual(match("require(`foo`);"), [{ foo: 'foo' }]);
    assert.deepEqual(match('require(`foo`)'), [{ foo: 'foo' }]);
  });

  it('should match requires with leading whitespace and parens', function() {
    assert.deepEqual(match('    app.use(require("foo"));'), [{ foo: 'foo' }]);
    assert.deepEqual(match('app.use(require("foo"));'), [{ foo: 'foo' }]);
    assert.deepEqual(match('    .use(require("foo"));'), [{ foo: 'foo' }]);
  });

  it('should match variable name and module name', function() {
    var a = re().exec("var isDir = require('is-directory');");
    assert.equal(a[0], "var isDir = require('is-directory');");
    assert.equal(a[2], 'isDir');
    assert.equal(a[4], 'is-directory');

    var b = re().exec("const isDir = require('is-directory')");
    assert.equal(b[0], "const isDir = require('is-directory')");
    assert.equal(b[2], 'isDir');
    assert.equal(b[4], 'is-directory');

    assert.deepEqual(match("const path = require('path')let list = require('dirs');"), [
      { path: 'path' },
      { list: 'dirs' }
    ]);
    assert.deepEqual(match("require('path')\nrequire('dirs');"), [{ path: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('require("path")\nrequire("dirs");'), [{ path: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('require("path")require("dirs");'), [{ path: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('var foo = require("path")require("dirs");'), [{ foo: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('var\nfoo\n=\nrequire("path")require("dirs");'), [{ foo: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('var foo = require("path")require("dirs")'), [{ foo: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('foo = require("path")require("dirs")'), [{ foo: 'path' }, { dirs: 'dirs' }]);
    assert.deepEqual(match('foo = require("path")bar = require("dirs")'), [{ foo: 'path' }, { bar: 'dirs' }]);
    assert.deepEqual(match('foo = require("a-b")bar = require("c-d-e")'), [{ foo: 'a-b' }, { bar: 'c-d-e' }]);
    assert.deepEqual(match('foo = require("./path")bar = require("./dirs")'), [{ foo: './path' }, { bar: './dirs' }]);
    assert.deepEqual(match('const foo = require("./path")bar = require("./dirs")'), [
      { foo: './path' },
      { bar: './dirs' }
    ]);
  });

  it('should match indented variables', function() {
    var str = "    var path = require('path');\n\nvar list = require('dirs');";
    assert.deepEqual(match(str), [{ path: 'path' }, { list: 'dirs' }]);
  });

  it('should match scoped names', function() {
    var str = "const bar = require('@foo/bar')";
    assert.deepEqual(match(str), [{ bar: '@foo/bar' }]);
  });

  it('should match requires in parens', function() {
    var str = 'const bar = require(\'@foo/bar\')(require("@one/two"))';
    assert.deepEqual(match(str), [{ bar: '@foo/bar' }, { '@one/two': '@one/two' }]);
  });

  it('should match scoped package names', function() {
    var str = "    var bar = require('@foo/bar');\n\nvar qux = require('@baz/qux');";
    assert.deepEqual(match(str), [{ bar: '@foo/bar' }, { qux: '@baz/qux' }]);
  });
});
