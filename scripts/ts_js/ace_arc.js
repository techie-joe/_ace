"use strict";
// now = new Date().getMilliseconds(),
// W = window,
// D = document,
// A = (a: any) => typeof a,
// TYPE = (e: any) => Object.prototype.toString.call(e),
// VOID = void 0,
// FUN = A(() => { }),
// OBJ = A({}),
// STR = A(''),
// ARR = TYPE([]),
// isFUN = (v: any) => A(v) === FUN,
// isSTR = (v: any) => A(v) === STR,
// isARR = Array.isArray || (e => TYPE(e) === ARR),
// isARS = (e: any) => isARR(e) && e.length > 0,
// isOBJ = (v: any) => A(v) === OBJ,
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
