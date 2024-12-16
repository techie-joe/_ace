// TLDR: pack all entry to output folder

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    // [output-file] : [input-file]
    "script.min.js": path.resolve(__dirname, 'scripts/tjs/script.js'),
    // "gulp.min.js": path.resolve(__dirname, 'scripts/gjs/gulp.js'),
    // "story.min.js": path.resolve(__dirname, 'scripts/cjs/story.js')
  },
  output: {
    path: path.resolve(__dirname, '../ace/assets/js'),
    filename: '[name]'
  }
};