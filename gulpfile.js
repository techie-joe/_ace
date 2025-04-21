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
      "index_2",
      "html_active",
      "html_starter", 
      "html-core_2",
      "html-core_2-view",
      "html-colors",
    ],
    html_w: [
      // "index_2",
      "html_active",
    ],
    php: [
      "index_2",
    ],
    txt: [
      "index_2",
    ],
    md: [
      "index_2",
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
['html', 'php'].forEach(type => {
  _src.site[type] = _src.site[type].map(v => v + "/**/*."+type+".pug");  
});
['txt','md'].forEach(type => {
  _src.site[type] = _src.site[type].map(v => v + "/**/*."+type+".pug");
  _src.builder[type] = _src.builder[type].map(v => v + "/**/*."+type+".pug");  
});
['scss','js'].forEach(type => {
  _src[type] = _src[type].map(v => v + "/**/*."+type);  
});
_src.files = _src.files.map(v => v + "/**/*");

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

function html_w() {
  return src(_src.site.html_w)
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

function html_w() {
  return html(_src.site.html_w,_dest.site);
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

// > gulp html
// > gulp php
// > gulp txt
// > gulp md
// > gulp css
// > gulp js
// ---------------------------------------------------------------

exports.html = html;
exports.php  = php;
exports.txt  = txt;
exports.md   = md;
exports.css  = css;
exports.js   = js;

// > gulp files
// > gulp pages
// > gulp all
// ---------------------------------------------------------------

exports.files = parallel(
  
  builder_txt, builder_md,
  htaccess, manifest, files,

);

exports.pages = parallel(
  
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
// ---------------------------------------------------------------
const watchOpt = { ignoreInitial: false };

function watch_pages() {
  watch(_src.site.html_w, watchOpt, html_w );
  watch(_src.site.php,    watchOpt, php );
  watch(_src.site.txt,    watchOpt, txt );
  watch(_src.site.md,     watchOpt, md );
  watch(_src.scss,        watchOpt, css );
  watch(_src.js,          watchOpt, js );
}
  
exports.watch = watch_pages;

// (default) > gulp
// ---------------------------------------------------------------

exports.default = exports.all;