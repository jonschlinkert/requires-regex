'use strict';

/**
 * Regular expression for matching require statements.
 *
 * @api public
 */

module.exports = function () {
  return /^[ \t]*(var[ \t]*([\w$]+)[ \t]*=[ \t]*)?require\(['"]([\w\W]+?)['"]\)/gm;
};