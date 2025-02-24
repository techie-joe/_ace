/*! ThemeJs | v1.0.0 b329.25 | Copyright 2025 - Techie Joe | https://themejs.pages.dev */
/* ===============================================================
// IMPORTANT: must compile to ES5 or above.
// ECMAScript 5 (ES5) aka ECMAScript 2009,
// See tsconfig.json > compilerOptions.target = 'ES5';
// USING: "use strict", Array.isArray, JSON, get and set keywords,
// Date.now(), String.trim(), Number.
// 
// ADVANCE: compile to ES6.
// ECMAScript 6 (ES6), also known as ECMAScript 2015.
// PAY ATTENTION TO: Template literals and regex.
// USING:
// - Template literals: embedded expression and backticks `${v}`.
// - Rest and Spread Operators: fn(...args).
// - Destructuring Assignment: { var } = obj, [a,b] = [b,a].
// - Classes: Introduces class syntax for constructors.
// - Modules: support for using import and export statements.
// - Promises: new Promise().
// ============================================================ */
"use strict";
interface Window {
  theme: {}
}
(() => {
  const
    W = window,
    D = document,
    DOC = D.documentElement || D.body, // html or body
    A = (a: any) => typeof a,
    TYPE = (e: any) => Object.prototype.toString.call(e),
    NULL = null,
    _ = '',
    STR = A(_),
    ARR = TYPE([]),
    isSTR = (v: any) => A(v) === STR,
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    failTo = (e: string) => {
      throw ('Fail to ' + e);
    },
    listenTo = <K extends keyof HTMLElementEventMap>(
      what: HTMLElement | MediaQueryList | Window,
      type: K,
      listener: (e: any) => any,
      options?: boolean | AddEventListenerOptions
    ): void => { what.addEventListener(type, listener, options) },
    newRegex = (pattern: RegExp | string, flags?: string) => new RegExp(pattern, flags),
    updateClass = (element: HTMLElement, del?: string | null, add?: string | null) => {
      try {
        const
          P = ' ',
          I = '|',
          X = 'g',
          SEP = newRegex('[\\.\\|\\s]+', X),
          TRIM = (s: string, sep = I) => s.trim().replace(SEP, sep).trim(),
          NEW = add ? TRIM(add, P) : _,
          DEL = del ? TRIM([del, NEW].join(P)).trim() : _,
          SEL = newRegex('(^|\\s+)(' + DEL + ')(\\s*(' + DEL + '))*(\\s+|$)', X),
          RES = element.className.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);

        // (^|\s+)(DEL)(\s*(DEL))*(\s+|$)
        // log([
        //   `TRY =.${element.className.replace(SEL, P)}.`,
        //   `NEW =.${NEW}.`,
        //   `DEL =.${DEL}.`,
        //   `SEL =.${SEL}.`,
        //   `RES =.${RES}.`,
        // ].join("\n"));

        element.className = RES;
        return element;
      } catch (e) { failTo('updateClass'); }
    },
    THEME = (() => {
      const
        { localStorage: STORE } = W,
        KEY = 'theme', // storage key to store current theme
        KEYS = 'themes', // storage key to store current list
        DARK = '_dark',
        set = (new_theme?: string | string[], begin?: string) => {
          // set & store current theme and list
          var old_theme = theme || _;
          if (isARR(new_theme)) {
            list = new_theme;
            STORE[KEYS] = JSON.stringify(list);
            new_theme = list[begin ? list.indexOf(begin || _) : 0];
          }
          theme = isSTR(new_theme) ? new_theme : _;
          updateClass(DOC, old_theme, theme);
          STORE[KEY] = theme;
        },
        change = () => { set(list[list.indexOf(theme || _) + 1] || _) },
        parseList = (stored_list: string | null): string[] | null => {
          try { return stored_list && JSON.parse(stored_list) } catch (e) { console.error('Fail to parse stored themes: ' + stored_list) }
          return NULL;
        },
        media = W.matchMedia('(prefers-color-scheme: dark)'),
        preferDark = media.matches;

      // prepare presets
      var
        stored_list = parseList(STORE[KEYS]), // load user decided list
        stored_theme = STORE[KEY], // load user decided theme
        list: string[] = stored_list || [DARK], // list: were decided by user or ace
        theme: string | undefined | null = isSTR(stored_theme) ? stored_theme : preferDark ? DARK : _; // theme: were decided by user or refers to media matches.

      // apply load theme
      updateClass(DOC, NULL, theme);

      // open to changes
      listenTo(media, 'change', e => { e.matches ? set(DARK) : set() });
      listenTo(W, 'keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
      return {
        set,
        change,
        list: () => list,
        current: () => theme,
        fn: {
          // A, TYPE, STR, ARR, isSTR, isARR, DOC,
          // failTo,
          // listenTo, newRegex,
          updateClass,
        },
      }
    })();

  // export theme ================================================
  W.theme = THEME;
})()