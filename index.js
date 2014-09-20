'use strict';

/**
 * Regular expression for matching require statements.
 *
 * @api public
 */

module.exports = function () {
  return /^(var[ \t]*([\w$]+)[ \t]*=[ \t]*)?require\(['"]([\w\W]+?)['"]\)/gm;
};