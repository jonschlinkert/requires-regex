/*!
 * requires-regex <https://github.com/jonschlinkert/requires-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var re = require('./');

describe('requires regex', function () {
  it('should match require statements without a var', function () {
    re().test('require(\'foo\');').should.be.true;
  });

  it('should return the full statement, variable name, and module path', function () {
    var m = re().exec('var isDir = require(\'is-directory\');');
    m[0].should.equal('var isDir = require(\'is-directory\')');
    m[1].should.equal('var isDir = ');
    m[2].should.equal('isDir');
    m[3].should.equal('is-directory');
  });

  it('should return an array of matches', function () {
    var m = 'var path = require(\'path\');\n\nvar list = require(\'dirs\');'.match(re());
    m.should.eql([ 'var path = require(\'path\')', 'var list = require(\'dirs\')' ]);
  });
});