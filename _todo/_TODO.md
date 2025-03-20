## Update files

<div style="font-family:Consolas,monospace;font-weight:bold;">

### March 21, 2025 - v0.1.25 b11.317
- housekeep: core menu

---

START : [GO](../pages/core/test.html.pug)

CORE update : version & build  
  [CHANGELOGS](../CHANGELOGS.md)  
  [CONFIG____](../core/_CONFIGS.pug)  
  [CSS_CRIGHT](../styles/gulp_css/core/_copyright.scss)  
  [PACKAGE___](../package.json)  
  [PACKAGE__C](../package-copy.json)  

BUILDER update : version & build  
  [README____](../README.md)  
  [LICENSE___](../LICENSE.txt)  

ACE update : version & build  
  [CONFIG____](../_CONFIGS.pug)  
  -- [INDEX_____](../pages/index.html.pug)  
  -- [README____](../../ace/README.md)  
  -- [LICENSE___](../../ace/LICENSE.txt)  

BASIC update : version & build  
  [VARS______](../pages/basic/_vars.pug)  
  [CHANGELOGS](../pages/basic/CHANGELOGS.md)  
  -- [INDEX_____](../pages/basic/index.html.pug)  
  -- [README____](../../ace/basic/README.md)  
  -- [LICENSE___](../../ace/basic/LICENSE.txt)  

</div>

## To do

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
