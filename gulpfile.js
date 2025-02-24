/* ===============================================================

This is the gulper commands definition.
Files that tells gulper how to build your project.
Find more information about Gulp on http://gulpjs.com

=============================================================== */

// CONFIGS
// ===============================================================

const _dest_url = "/ace/";
const _dest = {
  builder : "./",
  site    : "../ace",
  css     : "../ace/assets/css",
  js      : "../ace/assets/js",
};

const _src_manifest = './manifest.js';
const _src = {
  builder : {
    txt : ["builder/**/*.txt.pug"],
    md  : ["builder/**/*.md.pug"],
  },
  site : {
    html  : ["index/*.html.pug","pages/**/*.html.pug"],
    php   : ["index/*.php.pug","pages/**/*.php.pug"],
    txt   : ["index/*.txt.pug","pages/**/*.txt.pug"],
    md    : ["index/*.md.pug","pages/**/*.md.pug"],      
  },
  files : ["files/**/*"],
  scss  : ["styles/gulp_css/**/*.scss"],
  js: [
    "scripts/gulp_js/**/*.js",
    "scripts/wp_js/**/*",
  ],
};

const watchOpt = { ignoreInitial: false };
const pagesOpt = { pretty: true };

// IMPORTS
// ===============================================================

const { log } = console;
const { src, dest, series, parallel, watch } = require('gulp');

const pug         = require("gulp-pug");
const gulp_rename = require('gulp-rename');
const gulp_file   = require('gulp-file');

// FUNCTIONS
// ===============================================================

function ext(extname) {
  return gulp_rename( function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname  = extname;
  })
}

// TASKS
// ===============================================================

// builder
// ---------------------------------------------------------------
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
// ---------------------------------------------------------------
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
  .pipe(dest(_dest.site));
}

// generate manifest file from _src to _dest
function manifest() {
  const _manifest = JSON.stringify(require(_src_manifest), null, 2);
  return gulp_file( 'manifest.json', _manifest, gulp_as_file )
  .pipe(dest(_dest.site));
}

// copy files from _src to _dest
function files() {
  return src(_src.files, { dot: true })
  .pipe(dest(_dest.site));
}

// pages: html, php and txt
// ---------------------------------------------------------------
// : to take pug files from _src to _dest
// : retain the same directory structure

function html() {
  return src(_src.site.html)
  .pipe(pug(pagesOpt))
  .pipe(ext('.html'))
  .pipe(dest(_dest.site));
}

function php() {
  return src(_src.site.php)
  .pipe(pug(pagesOpt))
  .pipe(ext('.php'))
  .pipe(dest(_dest.site));
}

function txt() {
  return src(_src.site.txt)
  .pipe(pug())
  .pipe(ext('.txt'))
  .pipe(dest(_dest.site));
}

function md() {
  return src(_src.site.md)
  .pipe(pug())
  .pipe(ext('.md'))
  .pipe(dest(_dest.site));
}

// sass
// ---------------------------------------------------------------
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

// js
// ---------------------------------------------------------------
// to take js files from _src to _dest

function js() { return src(_src.js)
  .pipe(dest(_dest.js));
}

// deployment
// ---------------------------------------------------------------
// to copy every files from _src to _dest

// const _src_site = '_site/**/*';
// const _dep_site = '../';

// function deploy() {
//   log(`Deploying site to : ${_dep_site}`);
//   return src(_src_site, { dot: true })
//   .pipe(dest(_dep_site));
// }

// exports.deploy = series( deploy );

/* ===============================================================

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

=============================================================== */

exports.builder = parallel(
  
  builder_txt, builder_md

);

exports.html   = series( html );
exports.php    = series( php );
exports.txt    = series( txt );
exports.md     = series( md );
exports.css    = series( css );
exports.js     = series( js );

exports.files = parallel(
  
  htaccess, manifest, files,

);

exports.pages = parallel(
  
  // htaccess, manifest, files,

  html, php, txt, md

);

exports.site = parallel(

  html, php, txt, md, css, js,

);

exports.all = parallel(

  builder_txt, builder_md,

  htaccess, manifest, files,

  html, php, txt, md, css, js,

);

// watch
// ---------------------------------------------------------------

function pagesw() {
  watch(_src.site.html, watchOpt, html);
  watch(_src.site.php,  watchOpt, php);
  watch(_src.site.txt,  watchOpt, txt);
  watch(_src.site.md,   watchOpt, md);
}

function cssw() { watch(_src.scss, watchOpt, css); } 

function jsw() { watch(_src.js, watchOpt, js); }


exports.pagesw = parallel( pagesw );
exports.cssw   = parallel( cssw );
exports.jsw    = parallel( jsw );

exports.watch = parallel(

  pagesw, cssw, jsw,

);

// default
// ---------------------------------------------------------------

exports.default = exports.site;