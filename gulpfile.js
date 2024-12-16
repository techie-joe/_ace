const _src = {
  root: "_ace",
  html: "pages",
  php: "pages",
  js: ["scripts/gjs_/**/*.js"],
  scss: ["styles/scss/**/*.scss"]
};
const _dest = {
  root: "../ace",
  css: "../ace/assets/css",
  js: "scripts/gjs"
};
const _gulp = {
  js : "gulp.js"
}

const { watch, series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');

function clean(callback) {
  callback(); // place code for your task here
}
exports.clean = clean;

function css(callback) {
  callback(); // place code for your task here
}
exports.css = css;

function js() {
  return src(_src.js)
    .pipe(dest(_dest.js));
}
exports.js = js;

function build(callback) {
  callback(); // place code for your task here
}
exports.build = build;


exports.default = series(
  clean,
  parallel( css, js ),
  build
);

const watchOpt = { ignoreInitial: false };

exports.watch = function() {
  watch(_src.scss, watchOpt, css);
  watch(_src.js, watchOpt, js);
};