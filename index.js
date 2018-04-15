'use strict';

module.exports = function() {
  return /(?:(['"])[^\1]*require[^\1]*\1)|\s*(?:(?:var|const|let)?\s*([\s\S]+?)\s*=\s*)?require\((['"])((?:@([^/]+?)\/)?([^/]+?)|[\s\S]+?)\3\);?/g;
};
