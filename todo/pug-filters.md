###### [TODO](TODO.md)
---
### To use pug filters on mixins and all.

//- see : https://pugjs.org/language/filters.html

#### Try out these pug codes

`npm install pug-plugin-markdown`

```pug
block content
  include:php myphpfile.php

mixin html(filename)
  include #{filename}

mixin textfile(filename)
  include #{filename}

mixin markdown(filename)
  include:markdown #{filename}

+markdown('markdownFile.md')
```


#### Markdown filters

```js
const gulp = require('gulp');
const markdown = require('gulp-markdown');
const rename = require('gulp-rename'); // For renaming the output file

function markdownToHTML() {
  return gulp.src('src/markdown//*.md') // Source of your Markdown files
    .pipe(markdown()) // Convert Markdown to HTML
    .pipe(rename({ // Rename the output files (important!)
      extname: '.html' // Change the extension to .html
    }))
    .pipe(gulp.dest('dist')); // Destination for the generated HTML files
}

exports.default = markdownToHTML; // Make the task runnable with "gulp"
```

```pug
div
  :markdown
    # Heading 1
    This is a paragraph.
```

#### PHP filters

`npm install pug-php`

```pug
mixin include_php(file)
  include:php #{file}

mixin php(file)
  :php
    include #{file}

div
  :php
    <?php echo "Hello, World!"; ?>
```

#### Custom filters

```js
const pug = require('pug');
pug.filters.myFilter = function (text) {
  return text.toUpperCase();
};
```

```pug
div
  :myFilter
    This text will be converted to uppercase.
```