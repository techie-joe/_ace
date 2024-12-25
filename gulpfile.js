const _folder = {
  pages  : 'pages',
  files  : '_files',
};

const root = '/ace/';

const _builder = {
  root  : "./",
  txt   : [_folder.files+"/**/*.txt.pug"],
  md    : [_folder.files+"/**/*.md.pug"],
};

const _src = {
  root  : "_ace",
  files: [
    '.gitattributes',
    '.editorconfig',
    'robots.txt'
  ],
  html  : [_folder.pages+"/**/*.html.pug"],
  php   : [_folder.pages+"/**/*.php.pug"],
  txt   : [_folder.pages+"/**/*.txt.pug"],
  md    : [_folder.pages+"/**/*.md.pug"],
  js    : ["scripts/gjs/**/*.js"],
  scss  : ["styles/scss/**/*.scss"],
};

const _dest = {
  root: "../ace",
  css : "../ace/assets/css",
  js  : "../ace/assets/gjs",
};

const manifestData = require('./manifest.js');
const manifestFile = 'manifest.json';

const { watch, series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');
const file = require('gulp-file');
const watchOpt = { ignoreInitial: false };
const pagesOpt = { pretty: false }

function builder_txt() {
  return src(_builder.txt)
  .pipe(pug())
  .pipe(rename(function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname = '.txt';
  }))
  .pipe(dest(_builder.root));
}
function builder_md() {
  return src(_builder.md)
  .pipe(pug())
  .pipe(rename(function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname = '.md';
  }))
  .pipe(dest(_builder.root));
}
exports.builder = parallel( builder_txt, builder_md );

// pages: html, php and txt
// : task to take pug files from _src to _dest
// : retain the same directory structure
const pug = require("gulp-pug");
function html() {
  return src(_src.html)
    .pipe(pug(pagesOpt))
    .pipe(rename(function (path) {
      path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    }))
    .pipe(dest(_dest.root));
}
function php() {
  return src(_src.php)
    .pipe(pug(pagesOpt))
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
    path.extname = '.txt';
  }))
  .pipe(dest(_dest.root));
}
function md() {
  return src(_src.md)
  .pipe(pug())
  .pipe(rename(function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname = '.md';
  }))
  .pipe(dest(_dest.root));
}
function pagesw() {
  watch(_src.html, watchOpt, html);
  watch(_src.php,  watchOpt, php);
  watch(_src.txt,  watchOpt, txt);
  watch(_src.md,   watchOpt, md);
}

exports.pages  = parallel( html, php, txt, md );
exports.pagesw = pagesw;

// .htaccess
function htaccess() {

  const errDocs = [];
  ['404', '500', '503'].forEach(function (code) {
    errDocs.push(`ErrorDocument ${code} ${root}${code}.html`);
  });

  return file(
    '.htaccess',
    errDocs.join('\n'),
    { src: true } // indicates that the string provided as the second argument should be treated as file contents rather than a file path
  )
  .pipe(dest(_dest.root));
}

// manifest
function manifest() {
  return file(
    manifestFile,
    JSON.stringify(manifestData,null,2),
    { src: true } // indicates that the string provided as the second argument should be treated as file contents rather than a file path
  )
  .pipe(dest(_dest.root));
}

// files: gitattribute
// : task to copy files from _src to _dest
function files() {
  return src(_src.files)
  .pipe(dest(_dest.root));
}

exports.files = parallel( htaccess, manifest, files );

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

exports.default = parallel(
  html, php, txt, md,
  htaccess, manifest, files,
  css, js
);

exports.watch = parallel(
  pagesw, cssw, jsw
);