/*! Ace Template | v0.1.24 b323.13 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  base: { theme: {} };
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
    // append = (e:Node, t:any) => { if (t) return a(t) === STR ? e.appendChild(d.createTextNode(t)) : e.appendChild(t); },
    // append = add nodes,
    CLASSES = new RegExp('[\\.\\|\\s]+', 'g'),
    fClass = (e: HTMLElement, t: string, n: string) => {
      const
        r = (e: string, t = "|") => e.replace(CLASSES, t).trim(),
        o = n ? r(n, " ") : "",
        a = r(o + "|" + t),
        b = new RegExp("(^|\\s+)(" + a + ")\\s*(?=(\\s|$))", "g");
      e.className = (e.className.replace(b, "") + (o.length ? " " + o : "")).trim();
      return e
    },
    storage = (() => {
      const
        KEY = 'base',
        { localStorage: S } = w;
      if (S) {
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
        DARK = '_dark';
      var
        list = [DARK],
        current = ''; // current
      const
        set = (s = '') => {
          fClass(DOC, current, s);
          storage.set(KEY, s);
          return current = s;
        },
        change = (s: string | string[]) => {
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
  w.base = b;
})()