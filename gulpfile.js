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
    txt : ["builder"],
    md  : ["builder"],
  },
  site : {
    html: [
      "index",
      "html",
    ],
    php: [
      "index",
    ],
    txt: [
      "index",
    ],
    md: [
      "index",
    ],      
  },
  files : ["files"],
  scss  : ["styles/gulp_css"],
  js: [
    "scripts/gulp_js",
    "scripts/wp_js",
  ],
};

// MAP _src
// ===============================================================
_src.site.html = _src.site.html.map(v => v + "/**/*.html.pug");
_src.site.php  = _src.site.php.map(v  => v + "/**/*.php.pug");
_src.site.txt  = _src.site.txt.map(v  => v + "/**/*.txt.pug");
_src.site.md   = _src.site.md.map(v   => v + "/**/*.md.pug");
_src.builder.txt = _src.builder.txt.map(v => v + "/**/*.txt.pug");
_src.builder.md = _src.builder.md.map(v => v + "/**/*.md.pug");
_src.files = _src.files.map(v => v + "/**/*");
_src.scss = _src.scss.map(v => v + "/**/*.scss");
_src.js = _src.js.map(v => v + "/**/*.js");

// IMPORTS
// ===============================================================

const { src, dest, series, parallel, watch } = require('gulp');
const pug         = require('gulp-pug');

// FUNCTIONS
// ===============================================================

const gulp_rename = require('gulp-rename');
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

function builder_md() {
  return src(_src.builder.md)
  .pipe(pug())
  .pipe(ext('.md'))
  .pipe(dest(_dest.builder));
}

// site files
// ---------------------------------------------------------------
// gulp site files

const gulp_file   = require('gulp-file');
// { src: true } indicates that the string provided as the second
// argument should be treated as file contents rather than a path

// generate .htaccess file to _dest
function htaccess() {
  const _htaccess = [
    `ErrorDocument 404 ${_dest_url}404.html`,
    `ErrorDocument 500 ${_dest_url}500.html`,
  ].join(`\n`);  
  return gulp_file( '.htaccess', _htaccess, { src: true } )
  .pipe(dest(_dest.site));
}

// generate manifest file from _src to _dest
function manifest() {
  const _manifest = JSON.stringify(require(_src_manifest), null, 2);
  return gulp_file( 'manifest.json', _manifest, { src: true } )
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
  .pipe(pug({ pretty: true }))
  .pipe(ext('.html'))
  .pipe(dest(_dest.site));
}

function php() {
  return src(_src.site.php)
  .pipe(pug({ pretty: true }))
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

function css() {
  return src(_src.scss)
  .pipe(sass(sassOpt).on("error", sass.logError))
  .pipe(cleanCSS())
  .pipe(dest(_dest.css));
}

// js
// ---------------------------------------------------------------

function js() {
  return src(_src.js)
  .pipe(dest(_dest.js));
}

// deployment
// ---------------------------------------------------------------
//
// const _src_site = '_site/**/*';
// const _dep_site = '../';
//
// function deploy() {
//   return src(_src, { dot: true })
//   .pipe(dest(_dest));
// }

/* ===============================================================

To list available tasks, run: > gulp --tasks

=============================================================== */

// > gulp deploy
// ---------------------------------------------------------------
// exports.deploy = series( deploy );


// > gulp builder
// ---------------------------------------------------------------

exports.builder = parallel(
  
  builder_txt, builder_md

);

// > gulp css
// > gulp js
// ---------------------------------------------------------------

exports.html = series( html );
exports.php  = series( php  );
exports.txt  = series( txt  );
exports.md   = series( md   );

exports.css  = series(css   );
exports.js   = series( js   );

// > gulp files
// > gulp pages
// > gulp site
// > gulp all
// ---------------------------------------------------------------

exports.files = parallel(
  
  htaccess, manifest, files,

);

exports.pages = parallel(
  
  html, php, txt, md,

);

exports.site = parallel(

  html, php, txt, md,
  css, js,

);

exports.all = parallel(

  builder_txt, builder_md,

  htaccess, manifest, files,
  html, php, txt, md,  
  css, js,

);

// > gulp watch
// > gulp watch_pages
// > gulp watch_css
// > gulp watch_js
// ---------------------------------------------------------------
const watchOpt = { ignoreInitial: false };

function watch_pages() {
  watch(_src.site.html, watchOpt, html );
  watch(_src.site.php,  watchOpt, php  );
  watch(_src.site.txt,  watchOpt, txt  );
  watch(_src.site.md,   watchOpt, md   );
}
function watch_css() { watch(_src.scss, watchOpt, css ); }
function watch_js()  { watch(_src.js,   watchOpt, js  ); }
  
exports.watch_pages = parallel( watch_pages );
exports.watch_css   = parallel( watch_css );
exports.watch_js    = parallel( watch_js  );
exports.watch       = parallel(

  watch_pages,
  watch_css,
  watch_js,

);

// (default) > gulp
// ---------------------------------------------------------------

exports.default = exports.site;