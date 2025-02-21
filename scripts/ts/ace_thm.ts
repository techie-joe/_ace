/*! Ace Template | v0.1.24 b324.18 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  theme: {
    o: any,
    fn: {}
  }
}
(() => {
  const
    W = window,
    D = document,
    A = (a: any) => typeof a,
    TYPE = (e: any) => Object.prototype.toString.call(e),
    STR = A(''),
    ARR = TYPE([]),
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    DOC = D.documentElement || D.body, // html or body
    { error } = console,
    invalid = (e: string, f?: string, t?: string) => error(`Invalid argument of (${e})${(f ? ` for ${f}` : '')}.${(t ? ` Expecting (${t})` : '')}`),
    failTo = (e: string) => error(`Fail to ${e}`),
    newRegex = (pattern: RegExp | string, flags?: string) => new RegExp(pattern, flags),
    updateClass = (element: HTMLElement, del?: string, add?: string) => {
      if (element) {
        const
          _ = '',
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
        return element
      } else { invalid(element, 'updateClass') }
    },
    STORE = (() => {
      const
        KEY = 'ace',
        { localStorage: store } = W;
      if (store) {
        // todo
      }
      const
        set = (key: string, value: string) => {
          // store key value
        },
        get = (key: string) => {
          // get key value
        };
      return {
        set,
        get,
      }
    })(),
    THEME = (() => {
      const
        KEY = 'theme', // storage key
        DARK = '_dark',
        set = (new_theme = '') => {
          updateClass(DOC, current, new_theme);
          STORE.set(KEY, new_theme);
          current = new_theme;
        },
        change = (new_theme?: string | string[]) => {
          var s = new_theme || current_list;
          isARR(s) ? (current_list = s, set(s[s.indexOf(current) + 1] || '')) : A(s) === STR ? set(s) : failTo('change theme');
        },
        media = W.matchMedia('(prefers-color-scheme: dark)');
      var
        current_list = [DARK],
        current = '';
      media.matches && set(DARK);
      media.addEventListener('change', e => { e.matches ? set(DARK) : set() });
      W.addEventListener('keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
      return {
        o: W.theme,
        set,
        change,
        current: () => current,
        fn: {
          // invalid, failTo,
          updateClass,
          storage: STORE,
        }
      }
    })();

  // export theme ================================================
  W.theme = THEME;

})()