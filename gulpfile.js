const _src = {
  root: "_ace",
  html: ["pages/**/*.html.pug"],
  php : ["pages/**/*.php.pug"],
  js  : ["scripts/gjs_/**/*.js"],
  scss: ["styles/scss/**/*.scss"]
};

const _dest = {
  root: "../ace",
  css : "../ace/assets/css",
  js  : "scripts/gjs"
};

const _gulp = {
  js : "gulp.js"
}

const { watch, series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');
const pug = require("gulp-pug");
const watchOpt = { ignoreInitial: false };

function clean(callback) {
  callback(); // place code for your task here
}
exports.clean = clean;

function html() {
  return src(_src.html)
    .pipe(pug({ pretty: false }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    }))
    .pipe(dest(_dest.root));
}
function php() {
  return src(_src.php)
    .pipe(pug({ pretty: false }))
    .pipe(rename(function (path) {
      path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
      path.extname = '.php';
    }))
    .pipe(dest(_dest.root));
}
function pagesw() {
  watch(_src.html, watchOpt, html);
  watch(_src.php, watchOpt, php);
}

exports.pages = parallel(html, php);
exports.pagesw = pagesw;

// sass
// : task to take scss files from _src to _dest
// : outputStyle: compressed | expanded
const sass = require("gulp-sass")(require("sass"));
function css() {
  return src(_src.scss)
    .pipe(sass({ outputStyle: 'compressed' })
    .on("error", sass.logError))
    .pipe(dest(_dest.css));
}
function cssw() {
  watch(_src.scss, watchOpt, css);
}
exports.css = css;
exports.cssw = cssw;

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
  parallel( html, php, css, js ),
  build
);

exports.watch = function () {
  pagesw();
  cssw();
  watch(_src.js, watchOpt, js);
};