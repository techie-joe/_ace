// TLDR: this manifest.js will be gulped into manifest.json

const manifest = {
  __TLDR            : "This is the PWA metadata for this project.",
  short_name        : "Ace",
  name              : "Ace Template",
  description       : "Ace Web Application Template",
  background_color  : "#222222",
  theme_color       : "#222222",
  display           : "standalone",
  scope             : "./",
  start_url         : "./?utm_source=homescreen",
  icons : [
    {
      src     : "./icons/favicon-16x16.png",
      sizes   : "16x16",
      type    : "image/png",
      purpose : "any"
    },
    {
      src     : "./icons/favicon-32x32.png",
      sizes   : "32x32",
      type    : "image/png",
      purpose : "any"
    },
    {
      src     : "./icons/apple-touch-icon.png",
      sizes   : "180x180",
      type    : "image/png",
      purpose : "any"
    },
    {
      src     : "./icons/android-chrome-192x192.png",
      sizes   : "192x192",
      type    : "image/png",
      purpose : "any"
    },
    {
      src     : "./icons/android-chrome-512x512.png",
      sizes   : "512x512",
      type    : "image/png",
      purpose : "any"
    }
  ]
};

manifest.shortcuts = [
  {
    short_name    : manifest.short_name,
    name          : manifest.name,
    description   : manifest.description,
    url           : "./?source=pwa",
    icons         : manifest.icons
  }
];

module.exports = manifest;