/* =============================================================

This is the gulper commands definition.
Files that tells gulper how to build your project.
Find more information about Gulp on http://gulpjs.com

============================================================= */


// CONFIGS
// =============================================================

const _src_site = '_site/**/*';
const _dep_site = '../';

const _dest_url = "/ace/";
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

// IMPORTS
// =============================================================

const { src, dest, series, parallel, watch } = require('gulp');
const log = console.log;

const pug         = require("gulp-pug");
const gulp_rename = require('gulp-rename');
const gulp_file   = require('gulp-file');

// FUNCTIONS
// =============================================================

function ext(extname) {
  return gulp_rename( function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname  = extname;
  })
}

// TASKS
// =============================================================

// builder
// -------------------------------------------------------------
// gulp builder files

function builder_txt() {
  return src(_src.builder.txt)
  .pipe(pug())
  .pipe(ext('.txt'))
  .pipe(dest(_dest.builder));
}

function builder_md() { return src(_src.builder.md)
  .pipe(pug())
  .pipe(ext('.md'))
  .pipe(dest(_dest.builder));
}

// site files
// -------------------------------------------------------------
// gulp site files

// { src: true } indicates that the string provided as the second argument should be treated as file contents rather than a file path
const gulp_as_file = { src: true };

// generate .htaccess file to _dest
function htaccess() {
  const _htaccess = [
    `ErrorDocument 404 ${_dest_url}404.html`,
    `ErrorDocument 500 ${_dest_url}500.html`,
  ].join(`\n`);  
  return gulp_file( '.htaccess', _htaccess, gulp_as_file )
  .pipe(dest(_dest.root));
}

// generate manifest file from _src to _dest
function manifest() {
  const _manifest = JSON.stringify(require(_src_manifest), null, 2);
  return gulp_file( 'manifest.json', _manifest, gulp_as_file )
  .pipe(dest(_dest.root));
}

// copy files from _src to _dest
function files() {
  return src(_src.files, { dot: true })
  .pipe(dest(_dest.root));
}

// pages: html, php and txt
// -------------------------------------------------------------
// : to take pug files from _src to _dest
// : retain the same directory structure

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

// sass
// -------------------------------------------------------------
// to take scss files from _src to _dest
// - outputStyle: compressed | expanded

const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');
const sassOpt  = { outputStyle: 'compressed' };

function css() { return src(_src.scss)
  .pipe(sass(sassOpt).on("error", sass.logError))
  .pipe(cleanCSS())
  .pipe(dest(_dest.css));
}

function cssw() { watch(_src.scss, watchOpt, css); } 

// js
// -------------------------------------------------------------
// to take js files from _src to _dest

function js() { return src(_src.js)
  .pipe(dest(_dest.js));
}

function jsw() { watch(_src.js, watchOpt, js); }

// deployment
// -------------------------------------------------------------
// to copy every files from _src to _dest

function deploy() {
  log(`Deploying site to : ${_dep_site}`);
  return src(_src_site, { dot: true })
  .pipe(dest(_dep_site));
}

/* =============================================================

List of available commands:

// > gulp deploy
// > gulp
// > gulp all
// > gulp site

// > gulp builder
// > gulp files
// > gulp pages
// > gulp css
// > gulp js

// > gulp watch
// > gulp pagesw
// > gulp cssw
// > gulp jsw

To list available tasks, try running: > gulp --tasks

============================================================= */

exports.html   = series( html );
exports.php    = series( php );
exports.txt    = series( txt );
exports.md     = series( md );
exports.pages  = parallel( html, php, txt, md );
exports.css    = series( css );
exports.js     = series( js );

exports.builder = parallel(

  builder_txt, builder_md

);

exports.files = parallel(
  
  htaccess, manifest, files

);

exports.site = parallel(

  htaccess, manifest, files,

  html, php, txt, md, css, js,

);

exports.all = parallel(

  builder_txt, builder_md,

  htaccess, manifest, files,

  html, php, txt, md, css, js,

);

exports.pagesw = parallel( pagesw );
exports.cssw   = parallel( cssw );
exports.jsw    = parallel( jsw );

exports.watch = parallel(

  pagesw, cssw, jsw,

);

exports.deploy = series( deploy );

exports.default = exports.site;