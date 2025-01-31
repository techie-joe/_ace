// ============================================================== define gulper

const { watch, series, parallel, src, dest } = require('gulp');
const rename = require('gulp-rename');
const file = require('gulp-file');
const watchOpt = { ignoreInitial: false };
const pagesOpt = { pretty: true };

function ext(ext) {
  return function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname = ext;
  }
}

// ============================================================= builder gulper

const _builder = {
  txt   : ["builder/**/*.txt.pug"],
  md    : ["builder/**/*.md.pug"],
  dest  : "./",
};

function builder_txt() {
  return src(_builder.txt)
  .pipe(pug())
  .pipe(rename(ext('.txt')))
  .pipe(dest(_builder.dest));
}

function builder_md() {
  return src(_builder.md)
  .pipe(pug())
  .pipe(rename(ext('.md')))
  .pipe(dest(_builder.dest));
}
exports.builder = parallel( builder_txt, builder_md );

// =============================================================== site gulper

const _src = {
  root  : "_ace",
  files : [
    '.gitattributes',
    '.editorconfig',
    'robots.txt'
  ],
  manifest : './manifest.js',
  html  : ["pages/**/*.html.pug"],
  php   : ["pages/**/*.php.pug"],
  txt   : ["pages/**/*.txt.pug"],
  md    : ["pages/**/*.md.pug"],
  js    : ["scripts/gjs/**/*.js"],
  scss  : ["styles/scss/**/*.scss"],
};

const _dest = {
  url  : "/ace/",
  root : "../ace",
  css  : "../ace/assets/css",
  js   : "../ace/assets/gjs",
};

// files: .htaccess
// : task to generate file to _dest
function htaccess() {

  const ErrorDocuments = [];  
  [
    ['404','404.html'],
    ['500','500.html'],
  ].forEach(function addErrorDocument(code) {
    ErrorDocuments.push(`ErrorDocument ${code[0]} ${_dest.url}${code[1]}`);
  });

  return file(
    '.htaccess', ErrorDocuments.join('\n'),
    { src: true } // indicates that the string provided as the second argument should be treated as file contents rather than a file path
  )
  .pipe(dest(_dest.root));
}

// files: manifest
// : task to generate file from _src to _dest
function manifest() {
  return file(
    'manifest.json', JSON.stringify(require(_src.manifest),null,2),
    { src: true } // indicates that the string provided as the second argument should be treated as file contents rather than a file path
  )
  .pipe(dest(_dest.root));
}

// files: (others)
// : task to copy files from _src to _dest
function files() {
  return src(_src.files)
  .pipe(dest(_dest.root));
}

exports.files = parallel( htaccess, manifest, files );

// pages: html, php and txt
// : retain the same directory structure
// : task to take pug files from _src to _dest
const pug = require("gulp-pug");

function html() {
  return src(_src.html)
  .pipe(pug(pagesOpt))
  .pipe(rename(ext('.html')))
  .pipe(dest(_dest.root));
}

function php() {
  return src(_src.php)
  .pipe(pug(pagesOpt))
  .pipe(rename(ext('.php')))
  .pipe(dest(_dest.root));
}

function txt() {
  return src(_src.txt)
  .pipe(pug())
  .pipe(rename(ext('.txt')))
  .pipe(dest(_dest.root));
}

function md() {
  return src(_src.md)
  .pipe(pug())
  .pipe(rename(ext('.md')))
  .pipe(dest(_dest.root));
}

function pagesw() {
  watch(_src.html, watchOpt, html);
  watch(_src.php,  watchOpt, php);
  watch(_src.txt,  watchOpt, txt);
  watch(_src.md,   watchOpt, md);
}

exports.pages = parallel( html, php, txt, md );
exports.pagesw = pagesw;

// sass
// : task to take scss files from _src to _dest
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');

function css() {
  return src(_src.scss)
  // : outputStyle: compressed | expanded
  .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
  .pipe(cleanCSS())
  .pipe(dest(_dest.css));
}

function cssw() { watch(_src.scss, watchOpt, css); } 

exports.css = css;
exports.cssw = cssw;

// js
// : task to take js files from _src to _dest
function js() {
  return src(_src.js)
  .pipe(dest(_dest.js));
}

function jsw() { watch(_src.js, watchOpt, js); }

exports.js = js;
exports.jsw = jsw;

// ===================================================================== gulper

exports.default = parallel(
  builder_txt, builder_md,
  htaccess, manifest, files,
  html, php, txt, md,
  css,
  js,
);

exports.site = parallel(
  htaccess, manifest, files,
  html, php, txt, md,
  css,
  js,
);

exports.watch = parallel(
  pagesw,
  cssw,
  jsw,
);