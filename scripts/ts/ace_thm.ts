/*! Ace Template | v0.1.24 b325.19 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  ace: {},
  theme: {}
}
(() => {
  const
    W = window,
    D = document,
    A = (a: any) => typeof a,
    TYPE = (e: any) => Object.prototype.toString.call(e),
    _ = '',
    STR = A(_),
    ARR = TYPE([]),
    isSTR = (v: any) => A(v) === STR,
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    DOC = D.documentElement || D.body, // html or body
    { error } = console,
    invalid = (e: string, f?: string, t?: string) => error(`Invalid argument of (${e})${(f ? ` for ${f}` : _)}.${(t ? ` Expecting (${t})` : _)}`),
    failTo = (e: string) => error(`Fail to ${e}`),
    listenTo = <K extends keyof HTMLElementEventMap>(
      what: HTMLElement | MediaQueryList | Window,
      type: K,
      listener: (e: any) => any,
      options?: boolean | AddEventListenerOptions
    ): void => { what.addEventListener(type, listener) },
    newRegex = (pattern: RegExp | string, flags?: string) => new RegExp(pattern, flags),
    updateClass = (element: HTMLElement, del?: string, add?: string) => {
      if (!element) { invalid(element, 'updateClass'); return }
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
      return element
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
          // console.log(key, value);
          // store both current theme and list
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
        set = (new_theme?: string | string[], begin?: string) => { // todo: add begin with.
          var old_theme = theme;
          if (isARR(new_theme)) {
            list = new_theme as string | string[];
            theme = list[begin ? list.indexOf(begin || _) : 0];
          }
          else if (isSTR(new_theme)) {
            theme = new_theme as string
          }
          else {
            failTo(`set theme`);
            return;
          }
          updateClass(DOC, old_theme, theme);
          STORE.set(KEY, theme);
        },
        change = () => { set(list[list.indexOf(theme) + 1] || _) },
        media = W.matchMedia('(prefers-color-scheme: dark)');
      var
        list: string | string[] = [DARK],
        theme: string = _;
      media.matches && set(DARK);
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
      // invalid, failTo,
      // listenTo, newRegex,
      updateClass,
      storage: STORE,
      // theme: THEME,
    };

  // export theme ================================================
  W.theme = THEME;
  W.ace = ACE;
})()