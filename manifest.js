// manifest.js to gulp as manifest.json
const manifest = {
  "short_name": "Ace",
  "name": "Ace Template",
  "description": "Ace Web Application Template",
  "background_color": "#222222",
  "theme_color": "#222222",
}
module.exports = {
  "short_name": manifest.short_name,
  "name": manifest.name,
  "description": manifest.description,
  "background_color": manifest.background_color,
  "theme_color": manifest.theme_color,
  "display": "standalone",
  "scope": "./",
  "start_url": "./?utm_source=homescreen",
  "shortcuts": [
    {
      "short_name": manifest.short_name,
      "name": manifest.name,
      "description": manifest.description,
      "url": "./?source=pwa",
      "icons": [
        {
          "src": "./icons/android-chrome-512x512.png",
          "sizes": "512x512"
        },
        {
          "src": "./icons/android-chrome-192x192.png",
          "sizes": "192x192"
        },
        {
          "src": "./icons/apple-touch-icon.png",
          "sizes": "180x180"
        },
        {
          "src": "./icons/favicon-32x32.png",
          "sizes": "32x32"
        },
        {
          "src": "./icons/favicon-16x16.png",
          "sizes": "16x16"
        }
      ]
    }
  ],
  "icons": [
    {
      "src": "./icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "./icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "./icons/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "./icons/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "./icons/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png",
      "purpose": "any"
    }
  ]
};