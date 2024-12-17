const root = '/ace/';

const _src = {
  root: "_ace",
  html: ["pages/**/*.html.pug"],
  php : ["pages/**/*.php.pug"],
  txt : ["pages/**/*.txt.pug"],
  js  : ["scripts/gjs/**/*.js"],
  scss: ["styles/scss/**/*.scss"]
};

const _dest = {
  root: "../ace",
  css : "../ace/assets/css",
  js  : "../ace/assets/gjs",
};

const { watch, series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');
const watchOpt = { ignoreInitial: false };

// pages: html, php and txt
// : task to take pug files from _src to _dest
// : retain the same directory structure
const pug = require("gulp-pug");
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
function txt() {
  return src(_src.txt)
  .pipe(pug())
  .pipe(rename(function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname = '';
  }))
  .pipe(dest(_dest.root));
}
function pagesw() {
  watch(_src.html, watchOpt, html);
  watch(_src.php,  watchOpt, php);
  watch(_src.txt,  watchOpt, txt);
}

exports.pages  = parallel( html, php );
exports.pagesw = pagesw;

// .htaccess
const file = require('gulp-file');
function htaccess() {
  return file(
    '.htaccess',
    `ErrorDocument 404 ${root}404.html\n`+
    `ErrorDocument 500 ${root}500.html\n`+
    `ErrorDocument 503 ${root}503.html`,
    { src: true } // indicates that the string provided as the second argument should be treated as file contents rather than a file path
  )
  .pipe(dest(_dest.root));
}

exports.files = parallel( txt, htaccess );

// sass
// : task to take scss files from _src to _dest
// : outputStyle: compressed | expanded
const sassOpt = { outputStyle: 'compressed' };
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');
function css() {
  return src(_src.scss)
    .pipe(sass(sassOpt).on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(dest(_dest.css));
}
function cssw() { watch(_src.scss, watchOpt, css); }
exports.css  = css;
exports.cssw = cssw;

// js
// : task to take js files from _src to _dest
function js() {
  return src(_src.js)
    .pipe(dest(_dest.js));
}
function jsw() { watch(_src.js, watchOpt, js) }
exports.js  = js;
exports.jsw = jsw;

exports.default = parallel( html, php, txt, htaccess, css, js );
exports.watch   = parallel( pagesw, cssw, jsw );