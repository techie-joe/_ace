/*! Ace Template | v0.1.24 b323.13 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  base: { theme: {}, ignore_keyboard: boolean };
}
(() => {
  const
    w = window,
    d = document,
    // { getElementById:nodeId } = d,
    DOC = d.documentElement || d.body, // html or body
    call = (e: any) => Object.prototype.toString.call(e),
    VOID = void 0,
    // FUN = typeof function () { },
    // OBJ = typeof {},
    STR = typeof '',
    ARR = call([]),
    a = (a: any) => typeof a,
    isARR = Array.isArray || (e => call(e) === ARR),
    // _throw = (e:string) => { throw e },
    { log, error } = console,
    err = (e: string, t?: string) => error(`Invalid argument ${e}${(t ? `. Expecting (${t})` : '')}`),
    // getJsonObj = (text: string, reviver?: (this: any, key: string, value: any) => any) => {
    //   try {
    //     const o = JSON.parse(text, reviver);
    //     if (o && a(o) === OBJ) return o;
    //   } catch (e) { }
    // },
    // node = (e:Node, t:any) => { if (t) return a(t) === STR ? e.appendChild(d.createTextNode(t)) : e.appendChild(t); },
    // append = add nodes,
    // listenTo = <K extends keyof WindowEventMap>(w: Window, t: K, n: (this: Window, ev: WindowEventMap[K]) => any, opt?: boolean | AddEventListenerOptions) => {
    //   // todo
    // },
    storage = (() => {
      const
        KEY = 'base',
        { localStorage: storage } = w;
      if (storage) {
        // todo
      }
      const
        set = (key: string, value: string) => {
          // store key value
        };
      return {
        set: set
      }
    })(),
    theme = (() => {
      const
        KEY = "theme", // storage key
        DARK = '_dark',
        changeClass = (e: HTMLElement, c: string, n?: string) => {
          const
            SEPERATORS = new RegExp('[\\.\\|\\s]+', 'g'),
            r = (s: string, r = "|") => s.replace(SEPERATORS, r).trim(),
            o = n ? r(n, " ") : "",
            a = r(o + "|" + c),
            b = new RegExp("(^|\\s+)(" + a + ")\\s*(?=(\\s|$))", "g");
          e.className = (e.className.replace(b, "") + (o.length ? " " + o : "")).trim();
          return e
        };
      var
        list = [DARK],
        current = ''; // current
      const
        set = (s = '') => {
          changeClass(DOC, current, s);
          storage.set(KEY, s);
          return current = s;
        },
        change = (s?: string | string[]) => {
          s = s || list;
          isARR(s) ? (list = s, set(s[s.indexOf(current) + 1] || '')) : a(s) === STR ? set(s) : err('to change theme');
        };
      return {
        set: set,
        change: change,
        current: () => current
      }
    })();

  var
    { base: b } = w;

  b = b || { theme: theme };

  // b.ignore_keyboard || listenTo(w, "keyup", (
  //   x = (e:Event) => { e.altKey && "KeyT" === e.code && theme.change() },
  //   e => { C && e.isComposing || x(e) }
  // ));
    
  w.base = b;
})()