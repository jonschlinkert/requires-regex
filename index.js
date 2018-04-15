'use strict';

module.exports = function() {
  return /(?:(['"])\s*[_.\w/$]*?\s*require\s*[^\1]*?\s*\1)|\s*(?:(?:var|const|let)?\s*([_.\w/$]+?)\s*=\s*)?require\((['"])((?:@([^/]+?)\/)?([^/]+?)|[-.@\w/$]+?)\3\);?/g;
};
