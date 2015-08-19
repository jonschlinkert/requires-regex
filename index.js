'use strict';

/**
 * Regular expression for matching require statements.
 */

module.exports = function () {
  return /(?:(?:var|const)\s*([\w$]+)\s*=\s*)?require\(['"]([^'"]+)['"]\)/;
};