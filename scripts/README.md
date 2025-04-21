## README : scripts

- scripts : are used to generate javascript assets for the project.

------------------------------------------------------------------

- _backup: backup scripts.

- custom_js: customary javascripts that to be packed by webpack.

- gulp_js: javascripts to be gulped to production.
  - !! dont create the same filenames in wp_js.

- test_js: typed javascripts to test javascripts.

- ts: typescript: typed scripts.

- ts_js: compiled javascript according to tsconfig.json.

- wp_js: minified javascript by webpack,
  according to webpack.config.js
  - all files in this folder will be gulped to production.
  - !! dont create the same filenames in gulp_js.