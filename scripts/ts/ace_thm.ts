/*! Ace Template | v0.1.24 b323.17 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
interface Window {
  ace: {
    fn: {},
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
    updateClass = (element: HTMLElement, del: string, add?: string) => {
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
        //   `TRY = .${element.className.replace(SEL, P)}.`,
        //   `NEW = .${NEW}.`,
        //   `DEL = .${DEL}.`,
        //   `SEL = .${SEL}.`,
        //   `RES = .${RES}.`,
        // ].join("\n"));

        element.className = RES;
        return element
      } else { invalid(element, 'updateClass') }
    },
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
    })();

  // const
  //   listenTo = (what: EventTarget, when: string, handler: EventListenerOrEventListenerObject, opt?: EventListenerOptions | boolean): { start:any, stop: any } | undefined => {
  //     if ("addEventListener" in what && "removeEventListener" in what) {
  //       what.addEventListener(when, handler, opt);
  //       var h = handler;
  //       return {
  //         start: () => { handler = h },
  //         stop: () => { handler = () => { } }, //silentTo(what, when, handler, opt),
  //       }
  //     }
  //     if ("attachEvent" in what && "detachEvent" in what) {
  //     }
  //   };
  //   w = (e, t, n, r) => {
  //     y(e) ? e.removeEventListener(t, n, r) : E(e) ? e.detachEvent("on" + t, n) : g("Fail to remove event listener.")
  // }
  //   , b = (e, t, n, r) => {
  //     if (y(e))
  //         return e.addEventListener(t, n, r),
  //         {
  //             h: n,
  //             stop: () => w(e, t, n, r)
  //         };
  //     if (E(e)) {
  //         const o = a => {
  //             n.apply(e, a),
  //             r && r.once && e.detachEvent("on" + t, o)
  //         }
  //         ;
  //         return e.attachEvent("on" + t, o),
  //         {
  //             h: o,
  //             stop: () => e.detachEvent("on" + t, o)
  //         }
  //     }
  //     g("Fail to add event listener.")
  // }
  // enableShortcut = () => {
  //   return shortcut = listenTo(W, "keyup", (e: Event) => {
  //     // 'altKey' in e && 'code' in e &&
  //     e.altKey && "KeyT" === e.code && change();
  //   });
  // },
  // disableShortcut = () => {
  //   shortcut && shortcut.stop();
  // };
  // var shortcut: { start:any, stop: any } | undefined = enableShortcut();

  const
    THEME = (() => {
      const
        KEY = 'theme', // storage key
        DARK = '_dark',
        set = (new_theme = '') => {
          updateClass(DOC, current, new_theme);
          STORAGE.set(KEY, new_theme);
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
      media.addEventListener('change',e => { e.matches ? set(DARK) : set() });
      W.addEventListener('keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
      return {
        set,
        change,
        current: () => current
      }
    })();

  // =============================================================

  var { ace: ACE } = W;
  ACE = ACE || {};

  // test ========================================================



  // =============================================================

  ACE.theme = THEME;
  ACE.storage = STORAGE;
  ACE.fn = {
    // invalid, failTo,
  };

  // export ace ==================================================
  W.ace = ACE;
})()