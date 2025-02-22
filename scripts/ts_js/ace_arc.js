"use strict";
// now = new Date().getMilliseconds(),
// W = window,
// D = document,
// A = (a: any) => typeof a,
// TYPE = (e: any) => Object.prototype.toString.call(e),
// VOID = void 0,
// _ = '',
// STR = A(''),
// FUN = A(() => { }),
// OBJ = A({}),
// ARR = TYPE([]),
// isFUN = (v: any) => A(v) === FUN,
// isSTR = (v: any) => A(v) === STR,
// isARR = Array.isArray || (e => TYPE(e) === ARR),
// isARS = (e: any) => isARR(e) && e.length > 0,
// isOBJ = (v: any) => A(v) === OBJ,
// ===============================================================
// { log, error } = console,
// _try = (fn:any, ...a:any) => { try { fn(...a) } catch (e) { console.error(e) } },
// _throw = (e: string) => { throw e },
// invalid = (e: string, f?: string, t?: string) => {
//   _throw(['Invalid argument of (' + e + ')', f ? ' for ' + f : _, '.', t ? ' Expecting (' + t + ')' : _].join(_));
// },
// failTo = (e: string) => {
//   _throw('Fail to '+e);
// },
// ===============================================================
// DOC = D.documentElement || D.body, // html or body
// nodeId = (e:string) => D.getElementById(e),
// node = (e:Node, t:any) => { if (t) return A(t) === STR ? e.appendChild(D.createTextNode(t)) : e.appendChild(t); },
// append = add nodes,
// ===============================================================
// getJsonObj = (text: string, reviver?: (this: any, key: string, value: any) => any) => {
//   try {
//     const o = JSON.parse(text, reviver);
//     if (o && A(o) === OBJ) return o;
//   } catch (e) { }
// },
//   , h = (e, t) => {
//     try {
//         const n = JSON.parse(e, t);
//         if (n && "object" == typeof n)
//             return n
//     } catch (e) {}
// }
// ===============================================================
// listenTo = <K extends keyof HTMLElementEventMap>(
//   what: HTMLElement | MediaQueryList | Window,
//   type: K,
//   listener: (e: any) => any,
//   options?: boolean | AddEventListenerOptions
// ): void => { what.addEventListener(type, listener, options) },
// ===============================================================
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
// ===============================================================
// newRegex = (pattern: RegExp | string, flags?: string) => new RegExp(pattern, flags),
// updateClass = (element: HTMLElement, del?: string | null, add?: string | null) => {
// try {
//   const
//     P = ' ',
//     I = '|',
//     X = 'g',
//     SEP = newRegex('[\\.\\|\\s]+', X),
//     TRIM = (s: string, sep = I) => s.trim().replace(SEP, sep).trim(),
//     NEW = add ? TRIM(add, P) : _,
//     DEL = del ? TRIM([del, NEW].join(P)).trim() : _,
//     SEL = newRegex('(^|\\s+)(' + DEL + ')(\\s*(' + DEL + '))*(\\s+|$)', X),
//     RES = element.className.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);
//   // (^|\s+)(DEL)(\s*(DEL))*(\s+|$)
//   // log([
//   //   `TRY =.${element.className.replace(SEL, P)}.`,
//   //   `NEW =.${NEW}.`,
//   //   `DEL =.${DEL}.`,
//   //   `SEL =.${SEL}.`,
//   //   `RES =.${RES}.`,
//   // ].join("\n"));
//   element.className = RES;
//   return element;
// } catch(e) { failTo('updateClass'); }
// },
// ===============================================================
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
// ===============================================================
// S = (() => {
//   const
//     // e = I,
//     KEY = "base",
//     json = e ? (e.validateJson(KEY), e.getJson(KEY)) : {},
//     o = (r, o) => (
//       json[r] = o,
//       !!e && (e.setJson(KEY, json), true)
//     );
//   return e.onChange(
//     () => { e.validateJson(KEY) || e.setJson(KEY, json) }
//   ),
//   {
//     get: (val: string) => json[val],
//     set: o,
//     remove: (val: string) => {
//       o(val, VOID)
//     }
//   }
// }
// )(),
// ===============================================================
