/*! Ace Template | v0.1.24 b327.22 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
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
  ace: {},
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
    _throw = (e: string) => { throw e },
    failTo = (e: string) => {
      _throw('Fail to ' + e);
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
    STORE = (() => {
      const
        { localStorage: localStore } = W,
        set = (key?: string, value?: string) => {
          // store key value
          key ?
            isSTR(value) ?
              localStore.setItem(key, value as string)
              : remove(key)
            : failTo('set ' + key);
        },
        get = (key: string): string | null => {
          // get key value
          return key ?
            localStore.getItem(key)
            : (failTo('get ' + key), NULL);
        },
        remove = (key: string) => {
          // get key value
          key ?
            localStore.removeItem(key)
            : failTo('remove ' + key);
        };
      return {
        set,
        get,
        remove,
      }
    })(),
    THEME = (() => {
      const
        KEY = 'theme', // storage key to store current theme
        KEYS = 'themes', // storage key to store current list
        DARK = '_dark',
        set = (new_theme?: string | string[], begin?: string) => {
          // set & store current theme and list
          var old_theme = theme || _;
          if (isARR(new_theme)) {
            list = new_theme;
            STORE.set(KEYS, JSON.stringify(list));
            new_theme = list[begin ? list.indexOf(begin || _) : 0];
          }
          theme = isSTR(new_theme) ? new_theme : _;
          updateClass(DOC, old_theme, theme);
          STORE.set(KEY, theme);
        },
        change = () => { set(list[list.indexOf(theme || _) + 1] || _) },
        parseList = (stored_list: string | null): string[] | null => {
          try { return stored_list && JSON.parse(stored_list) } catch (e) { console.error('Fail to parse stored themes: '+stored_list) }
          return NULL;
        },
        media = W.matchMedia('(prefers-color-scheme: dark)'),
        preferDark = media.matches;

      // prepare presets
      var
        stored_list = parseList(STORE.get(KEYS)), // load user decided list
        stored_theme = STORE.get(KEY), // load user decided theme
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
      }
    })(),
    ACE = {
      // A, TYPE, STR, ARR, isSTR, isARR, DOC,
      // _throw, failTo,
      // listenTo, newRegex,
      updateClass,
      storage: STORE,
      // theme: THEME,
    };

  // export theme ================================================
  W.theme = THEME;
  W.ace = ACE;
})()