// __TLDR: pack all entry to output folder.

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    // [output-file] : [input-file]
    // "ts.min.js"  : path.resolve(__dirname, 'scripts/ts_js/ts.js'),
    // "gulp.min.js"    : path.resolve(__dirname, 'scripts/gulp_js/gulp.js'),
    // "custom.min.js"  : path.resolve(__dirname, 'scripts/custom_js/custom.js'),
  },
  output: {
    path: path.resolve(__dirname, '../ace/assets/wpjs'),
    filename: '[name]'
  }
};