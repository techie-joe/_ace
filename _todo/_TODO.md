## Ace Builder Updates

### April 22, 2025 - v0.2.0 b1.6
- prepare for Header-A
- add test: Full-Scroll
- housekeep gulp, typescript and webpack compiler
- update gulper watch
- rewrite Ace Builder

------------------------------------------------------------------

**< UPDATE >**
CORE : version & build  
[CHANGELOGS](../CHANGELOGS.md)  
[CONFIG____](../core_2/_CONFIGS.pug)  
[CSS_CRIGHT](../styles/gulp_css/core_2/_copyright.scss)  
[PACKAGE___](../package.json)  
[PACKAGE__C](../package-copy.json)  

**< DEV >**
DEV : builds
[GULP______](../gulpfile.js)
[TYPESCRIPT](../tsconfig.json)
[WEBPACK___](../webpack.config.js)

**< CHECK >**
BUILDER : version & build  
[README____](../README.md)  
[LICENSE___](../LICENSE.txt)  

**< CHECK >**
ACE : version & build  
[README____](../../ace/README.md)  
[LICENSE___](../../ace/LICENSE.txt)  
[CHANGELOGS](../../ace/CHANGELOGS.md)

**< UPDATE >**
BASIC : version & build  
[VARS______](../pages/basic/_vars.pug)  
[CHANGELOGS](../pages/basic/CHANGELOGS.md)  
-- [INDEX_____](../pages/basic/index.html.pug)  
-- [README____](../../ace/basic/README.md)  
-- [LICENSE___](../../ace/basic/LICENSE.txt)  

------------------------------------------------------------------

### Deprecation Notice

Following files will be deprecated soon

> Right now `pages` still use `pugs` and `_CONFIGS.pug`.  
> Will update to `core_2`. 
```
_CONFIGS.pug
/ pugs / **
/ pages / **
/ vanamir / **
```

Following files has been deprecated

```
/ core / **
/ index / **
/ pages / core / **
```

------------------------------------------------------------------

### Next To Do

  - Try detach license tag to improve chances of passing Envato QC.

  - TODO: validate themejs stored value.

  - To add: ace.back; if history.length = 0 : back to homeUrl + href = homeUrl

  - To add: ace.print dialog box to add css print.
    - option to display url or not.
    - option to single column or flex column.

  - To add: settings dialog box.
    - to set theme collection. play with css, and local storage.

  - To add: admin settings box. ?? where admin can get suggestion to what to edit.

  - To style error template a bit.
    - add background :before, logo, and theme changer.

  - To improve gulp.

  - To add CSS Norm.

  - To add fixed and absolute panel.

  - To add layouts.

  - To use [pug filters](pug-filters.md) on mixins and all.

  - To implement [service worker](service-worker.md).

  - To add more icons.

  - To add PWA installation process. create install.js.

  - ~~Edit Builder readme and add builder link.~~

  - To improve template.
    - See my notes on website building : https://drive.google.com/drive/folders/1zTCllyZYATKdoICxfwNkiUhPVYa6HJEC .
    - and this video : https://youtu.be/OjEg0IBR_ak?si=0Tdo3evd1AkTD864 .

  - To add imagemin to gulp
    - https://github.com/sindresorhus/gulp-imagemin#readme

  - To add autoprefixer to gulp
    - import autoprefixer from 'gulp-autoprefixer';
    - https://github.com/sindresorhus/gulp-autoprefixer?tab=readme-ov-file#readme
