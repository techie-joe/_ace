/*! Ace Template | v0.1.24 b323.13 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  ace: {
    ignore_keyboard: boolean,
    test: {},
    theme: {},
    storage: {},
  };
}
(() => {
  // now = new Date().getMilliseconds(),
  // VOID = void 0,
  // FUN = A(()=>{}),
  // OBJ = A({}),
  // nodeId = (e:string) => D.getElementById(e),
  // _throw = (e:string) => { throw e },
  // getJsonObj = (text: string, reviver?: (this: any, key: string, value: any) => any) => {
  //   try {
  //     const o = JSON.parse(text, reviver);
  //     if (o && A(o) === OBJ) return o;
  //   } catch (e) { }
  // },
  // node = (e:Node, t:any) => { if (t) return A(t) === STR ? e.appendChild(D.createTextNode(t)) : e.appendChild(t); },
  // append = add nodes,
  // listenTo = <K extends keyof WindowEventMap>(w: Window, t: K, n: (this: Window, ev: WindowEventMap[K]) => any, opt?: boolean | AddEventListenerOptions) => {
  //   // todo
  // },
  const
    W = window,
    D = document,
    A = (a: any) => typeof a,
    TYPE = (e: any) => Object.prototype.toString.call(e),
    STR = A(''),
    ARR = TYPE([]),
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    DOC = D.documentElement || D.body, // html or body
    { log, error } = console,
    invalid = (e: string, f?: string, t?: string) => error(`Invalid argument of (${e})${(f ? ` for ${f}` : '')}.${(t ? ` Expecting (${t})` : '')}`),
    failTo = (e: string) => error(`Fail to ${e}`),
    STORAGE = (() => {
      const
        KEY = 'ace',
        { localStorage: storage } = W;
      if (storage) {
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
      var
        list = ['_dark'],
        current = ''; // current
      const
        KEY = "theme", // storage key
        updateClass = (element: HTMLElement, del_class: string, add_class?: string) => {
          if (element) {
            const
              _ = '',
              P = ' ',
              I = '|',
              X = 'g',
              SEP = new RegExp('[\\.\\|\\s]+', X),
              R = (s: string, sep = I) => s.trim().replace(SEP, sep).trim(),
              NEW = add_class ? R(add_class, P) : _,
              DEL = del_class ? R([NEW, del_class].join(P)).trim() : _,
              SEL = new RegExp('\\s+(' + DEL + ')(\\s*(' + DEL + '))*\\s+', X),
              ADD = (NEW.length ? P + NEW : _),
              RES = element.className.replace(SEL, P).trim() + ADD;
            element.className = RES;
            return element
          } else { invalid(element,'updateClass') }
        },
        set = (s = '') => {
          updateClass(DOC, current, s);
          STORAGE.set(KEY, s);
          return current = s;
        },
        change = (s?: string | string[]) => {
          s = s || list;
          isARR(s) ? (list = s, set(s[s.indexOf(current) + 1] || '')) : A(s) === STR ? set(s) : failTo('change theme');
        };
      return {
        updateClass,
        set,
        change,
        current: () => current
      }
    })();

  const TEST = {
    invalid, failTo,
  };

  var { ace: B } = W;

  B = B || {};
  B.test = TEST;
  B.theme = THEME;
  B.storage = STORAGE;

  // B.ignore_keyboard || listenTo(w, "keyup", (
  //   x = (e:Event) => { e.altKey && "KeyT" === e.code && theme.change() },
  //   e => { C && e.isComposing || x(e) }
  // ));

  W.ace = B;
})()