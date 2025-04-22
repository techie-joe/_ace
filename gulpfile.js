// ===============================================================
// This is the gulper task definitions.
// - telling gulper how to build the project.
// Find more information about Gulp on http://gulpjs.com
// ===============================================================
// To list available tasks, run: > gulp --tasks
// ===============================================================
// IMPORTS
// ===============================================================

const { src, dest, series, parallel, watch } = require('gulp');
const pug = require('gulp-pug'); // pug
const gulp_file   = require('gulp-file'); // to generate files
const sass = require("gulp-sass")(require("sass")); // sass
const cleanCSS = require('gulp-clean-css'); // sass

// ===============================================================
// FUNCTIONS
// ===============================================================

const gulp_rename = require('gulp-rename');
function ext(extname) {
  return gulp_rename( function (path) {
    path.basename = path.basename.substring(0, path.basename.lastIndexOf('.'));
    path.extname  = extname;
  })
}

// ===============================================================
// TASKS
// ===============================================================

// ---------------------------------------------------------------
// > gulp ace
// > gulp ace_files
// > gulp ace_pages
// ---------------------------------------------------------------

const _ace = (() => {

  // -------------------------------------------------------------
  // CONFIGS
  // -------------------------------------------------------------

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
      txt: [
        "builder"
      ],
      md: [
        "builder"
      ],
    },
    site : {
      html: [
        "index_2",
        "html_active",
        "html_starter", 
        "html-core_2",
        "html-core_2-view",
        "html-colors",
        "test",
      ],
      html_w: [
        // "index_2",
        "html_active",
        // "html_starter", 
        // "html-core_2",
        // "html-core_2-view",
        // "html-colors",
        "test",
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
    scss: [
      "styles/gulp_css"
    ],
    js: [
      "scripts/gulp_js",
    ],
    files: [
      "files"
    ],
  };

  // -------------------------------------------------------------
  // MAP _src
  // -------------------------------------------------------------
  ['html', 'php', 'txt', 'md'].forEach(type => {
    _src.site[type] = _src.site[type].map(v => v + `/**/*.${type}.pug`);
  });
  ['txt', 'md'].forEach(type => {
    _src.builder[type] = _src.builder[type].map(v => v + `/**/*.${type}.pug`);
  });
  ['scss','js'].forEach(type => {
    _src[type] = _src[type].map(v => v + "/**/*."+type);  
  });
  ['files'].forEach(type => {
    _src[type] = _src[type].map(v => v + "/**/*");
  });

  // -------------------------------------------------------------
  // builder files like README, LICENSE, CHANGELOGS
  // -------------------------------------------------------------
  // to take pug files from _src to _dest
 
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

  // -------------------------------------------------------------
  // generate files
  // -------------------------------------------------------------

  // generate .htaccess file to _dest
  // { src: true } indicates that the string provided as the second
  // argument should be treated as file contents rather than a path
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

  // -------------------------------------------------------------
  // files: all types
  // : to copy all types of files from _src to _dest
  // -------------------------------------------------------------
  function files() {
    return src(_src.files, { dot: true })
    .pipe(dest(_dest.site));
  }

  // -------------------------------------------------------------
  // pages: html, php, txt and md
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // css
  // -------------------------------------------------------------
  // to take scss files from _src to _dest
  // outputStyle: compressed | expanded
  const sassOpt  = { outputStyle: 'compressed' };
  
  function css() {
    return src(_src.scss)
      .pipe(sass(sassOpt).on("error", sass.logError))
      .pipe(cleanCSS())
      .pipe(dest(_dest.css));
  }
  
  // -------------------------------------------------------------
  // js
  // -------------------------------------------------------------
  // to copy js files from _src to _dest
  function js() {
    return src(_src.js)
      .pipe(dest(_dest.js));
  }
  
  // -------------------------------------------------------------
  // watchers
  // -------------------------------------------------------------
  const watchOpt = { ignoreInitial: false };
  
  function _watch_assets() {
    watch(_src.scss,        watchOpt, css     )
    watch(_src.js,          watchOpt, js      )
  }

  function _watch_pages() {
    watch(_src.site.html_w, watchOpt, html_w  )
    watch(_src.site.php,    watchOpt, php     )
    watch(_src.site.txt,    watchOpt, txt     )
    watch(_src.site.md,     watchOpt, md      )
  }

  return {
    files:parallel(
      builder_txt, builder_md,
      htaccess, manifest, files,
    ),
    pages:parallel(
      html, php, txt, md,
    ),
    assets:parallel(
      css, js,
    ),
    watch_assets:_watch_assets,
    watch_pages:_watch_pages,
  };

})();

exports.ace_files  = _ace.files;
exports.ace_pages  = _ace.pages;
exports.ace_assets = _ace.assets;

const ace = exports.ace = parallel(
  _ace.files,
  _ace.pages,
  _ace.assets,
);

// ---------------------------------------------------------------
// > gulp all
// ---------------------------------------------------------------
exports.all = parallel(
  ace
);

// ---------------------------------------------------------------
// (default task)
// > gulp
// ---------------------------------------------------------------
exports.default = exports.all;


// ---------------------------------------------------------------
// > gulp watch
// ---------------------------------------------------------------
exports.watch = parallel(
  _ace.watch_pages,
  // _ace.watch_assets,
);


// ===============================================================
// DEPLOYMENTS
// ===============================================================
//
// const _src_site = '_site/**/*';
// const _dep_site = '../';
//
// function deploy() {
//   return src(_src, { dot: true })
//   .pipe(dest(_dest));
// }
//
// > gulp deploy
// ---------------------------------------------------------------
// exports.deploy = series( deploy );
// 
// ===============================================================
