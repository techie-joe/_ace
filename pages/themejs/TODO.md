## ThemeJs to do

### May 8, 2025 - v1.0.0 b336.01
- fix themejs verification

### March 3, 2025 - v1.0.0 b335.31
- initial release.

<div style="font-family:Consolas,monospace;font-weight:bold;">

update : version & build  
  [CHANGELOGS](CHANGELOGS.md)  
  [VARS______](_vars.pug)  
  [TEST_CSS__](../../styles/themejs/_copyright.scss)
source :  
  [SCRIPT____](../../scripts/ts/theme_v1.0.ts)  
  [WEBPACK___](../../webpack.config.js)  
test   :  
  [TEST______](../../scripts/gulp_js/test_theme_v1.0.js)  
output :  
  [TS_JS_____](../../scripts/ts_js/theme_v1.0.js)  
  [WP_JS_____](../../scripts/wp_js/theme_v1.0.js)  
  [WP_JS____L](../../scripts/wp_js/theme_v1.0.js.LICENSE.txt)  
  [LICENSE___](../../../ace/themejs/LICENSE.txt)  
  [README____](../../../ace/themejs/README.md)  

</div>

### Webpack configuration

```json
mode: 'production',
entry {  
   "theme_v1.0.js"  : path.resolve(__dirname, 'scripts/ts_js/theme_v1.0.js'),  
}
```  

### more..

#### CSS, fonts and resources dynamic load

#### Time Based Dark Mode
Easily schedule dark mode based on your preferences with Darkify. Benefit from the advanced time-based settings to effortlessly start and end dark mode on your website.

#### Scheduled Dark Mode Activation
This functionality enables automatic switching to dark mode according to the user’s local time, allowing for a time-sensitive adaptation of the interface.

#### Themed By Default
Automatically set your website to dark mode as the default view, while allowing visitors the choice to disable it if they wish.

#### Operating System Aware Dark Mode
This feature intelligently identifies the user’s operating system preferences and adapts to dark mode automatically, ensuring a tailored viewing experience.

#### Easy Toggle Keyboard Shortcut
Switch seamlessly between light and dark modes using Darkify. Use the simple keyboard shortcut Ctrl+Alt+T, or opt for automatic activation based on your device’s operating system settings.

#### Various Floating Switch Styles
Pick a switch style that fits your website. There are many floating switch styles to choose from, so you can find one that goes well with your site’s design.

#### Adjustable Switch Design
Align the switch with your brand identity. Personalize the look of the switch to complement your brand’s color scheme and style.

#### Switcher using shortcode
Display the switch at any location on your site. By using the shortcode, you can make the switch appear on any page or post, ensuring it’s accessible everywhere.

#### Pre-Defined and Customizable Color Options
Select from a variety of color presets or design your own. This feature allows you to choose preset colors or create a custom color scheme that aligns with your brand’s identity.

#### Selective Customization
Tailored experience by choosing specific elements to activate or deactivate. Use element tags, class names, or IDs for accurate and targeted adjustments.

#### Personalized Style with Custom CSS
Improve the look by adding your own custom CSS. This lets you style elements uniquely to perfectly fit your brand’s aesthetic.

#### Compatible with site builders
The plugin works well with popular page builders including WordPress, Fusion Builder for Avada Divi Builder, WP Bakery, Visual Composer, Beaver Builder, Oxygen Builder, and Elementor.

#### Tested
The plugin has been rigorously tested with a variety of top WordPress themes to ensure flawless integration and performance, guaranteeing a seamless experience across different website styles and layouts.

## Key Features

- Frontend darkmode.
- Enabled dark mode by default.
- enabled/disabled by default based on user device time.
- enabled/disable by default based on user device operating system setting.
- Can be used in dark mode with keyboard shortcuts. For mac: Ctrl + Opt|Start T d and for windows users Ctrl + Alt + T.
- 8 color awesome presets for dark mode
- 12 floating toggle switcher with lots of customize options
- Shortcode for toggle switcher
- Custom CSS option.
- RTL and multi-language ready.