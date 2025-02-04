// TLDR : This is the gulper tasks definition that builds your project.
//      : Find more information about Gulp on http://gulpjs.com

/*

> gulp
> gulp site

> gulp builder
> gulp files
> gulp pages
> gulp css
> gulp js

> gulp watch
> gulp pagesw
> gulp cssw
> gulp jsw

*/

// ============================================================== define gulper

const { watch, parallel, src, dest } = require('gulp');
const gulp_rename = require('gulp-rename');
const gulp_file   = require('gulp-file');

const _dest_root = "/ace/";
const _dest = {
  builder : "./",
  root    : "../ace",
  css     : "../ace/assets/css",
  js      : "../ace/assets/gjs",
};

const _src_manifest = './manifest.js';
const _src = {
  builder : {
    txt : ["builder/**/*.txt.pug"],
    md  : ["builder/**/*.md.pug"],
  },
  files : ["files/**/*"],
  html  : ["pages/**/*.html.pug"],
  php   : ["pages/**/*.php.pug"],
  txt   : ["pages/**/*.txt.pug"],
  md    : ["pages/**/*.md.pug"],
  js    : ["scripts/gulp_js/**/*.js"],
  scss  : ["styles/gulp_css/**/*.scss"],
};

const watchOpt = { ignoreInitial: false };
const pagesOpt = { pretty: true };

function ext(extname) {
  return gulp_rename( function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname  = extname;
  })
}

// ============================================================= builder gulper

function builder_txt() { return src(_src.builder.txt)
  .pipe(pug())
  .pipe(ext('.txt'))
  .pipe(dest(_dest.builder));
}

function builder_md() { return src(_src.builder.md)
  .pipe(pug())
  .pipe(ext('.md'))
  .pipe(dest(_dest.builder));
}

exports.builder = parallel( builder_txt, builder_md );

// =============================================================== site gulper

// { src: true } indicates that the string provided as the second argument should be treated as file contents rather than a file path
const gulp_as_file = { src: true };

// : task to generate .htaccess file to _dest
function htaccess() {
  const _htaccess = [
    `ErrorDocument 404 ${_dest_root}404.html`,
    `ErrorDocument 500 ${_dest_root}500.html`,
  ].join(`\n`);  
  return gulp_file( '.htaccess', _htaccess, gulp_as_file )
  .pipe(dest(_dest.root));
}

function manifest() { // : task to generate manifest file from _src to _dest
  const _manifest = JSON.stringify(require(_src_manifest), null, 2);
  return gulp_file( 'manifest.json', _manifest, gulp_as_file )
  .pipe(dest(_dest.root));
}

function files() { // task to copy files from _src to _dest
  return src(_src.files, { dot: true })
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
  .pipe(ext('.html'))
  .pipe(dest(_dest.root));
}

function php() {
  return src(_src.php)
  .pipe(pug(pagesOpt))
  .pipe(ext('.php'))
  .pipe(dest(_dest.root));
}

function txt() {
  return src(_src.txt)
  .pipe(pug())
  .pipe(ext('.txt'))
  .pipe(dest(_dest.root));
}

function md() {
  return src(_src.md)
  .pipe(pug())
  .pipe(ext('.md'))
  .pipe(dest(_dest.root));
}

function pagesw() {
  watch(_src.html, watchOpt, html);
  watch(_src.php,  watchOpt, php);
  watch(_src.txt,  watchOpt, txt);
  watch(_src.md,   watchOpt, md);
}

exports.html = html;
exports.php  = php;
exports.txt  = txt;
exports.md   = md;

exports.pages  = parallel( html, php, txt, md );
exports.pagesw = pagesw;

// sass
// : task to take scss files from _src to _dest
// : outputStyle: compressed | expanded
const sass     = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');
const sassOpt  = { outputStyle: 'compressed' };

function css() { return src(_src.scss)
  .pipe(sass(sassOpt).on("error", sass.logError))
  .pipe(cleanCSS())
  .pipe(dest(_dest.css));
}

function cssw() { watch(_src.scss, watchOpt, css); } 

exports.css  = css;
exports.cssw = cssw;

// js
// : task to take js files from _src to _dest
function js() { return src(_src.js)
  .pipe(dest(_dest.js));
}

function jsw() { watch(_src.js, watchOpt, js); }

exports.js  = js;
exports.jsw = jsw;

// ===================================================================== gulper

exports.all = parallel(
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

exports.default = exports.site;