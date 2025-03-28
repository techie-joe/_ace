(() => {  
  window.base = ( (e={}) => {
      const t = window
        , n = document
        , r = void 0
        , o = n.documentElement || n.body
        , a = e => typeof e
        , s = e => Object.prototype.toString.call(e)
        , c = a(( () => {}
      ))
        , i = s([])
        , l = a("")
        , d = Array.isArray ? e => Array.isArray(e) : e => s(e) === i
        , g = e => {
          throw e
      }
        , m = (e, t) => g(`Invalid argument ${e}` + (t ? `. Expecting (${t})` : ""))
        , h = (e, t) => {
          try {
              const n = JSON.parse(e, t);
              if (n && "object" == typeof n)
                  return n
          } catch (e) {}
      }
        , u = (e, t) => {
          if (t)
              return a(t) === l ? e.appendChild(n.createTextNode(t)) : e.appendChild(t)
      }
        , p = (e, t) => {
          if (d(t))
              for (let n = 0; n < t.length; n++)
                  u(e, t[n]);
          else
              u(e, t)
      }
        , v = new RegExp("[\\.\\|\\s]+","g")
        , f = (e, t, n) => {
          const r = (e, t="|") => e.replace(v, t).trim()
            , o = n ? r(n, " ") : ""
            , a = r(o + "|" + t);
          return e.className = (e.className.replace((e => new RegExp("(^|\\s+)(" + e + ")\\s*(?=(\\s|$))","g"))(a), "") + (o.length ? " " + o : "")).trim(),
          e
      }
        , y = e => "addEventListener"in e && "removeEventListener"in e
        , E = e => "attachEvent"in e && "detachEvent"in e
        , b = (e, t, n, r) => {
          if (y(e))
              return e.addEventListener(t, n, r),
              {
                  h: n,
                  stop: () => w(e, t, n, r)
              };
          if (E(e)) {
              const o = a => {
                  n.apply(e, a),
                  r && r.once && e.detachEvent("on" + t, o)
              }
              ;
              return e.attachEvent("on" + t, o),
              {
                  h: o,
                  stop: () => e.detachEvent("on" + t, o)
              }
          }
          g("Fail to add event listener.")
      }
        , w = (e, t, n, r) => {
          y(e) ? e.removeEventListener(t, n, r) : E(e) ? e.detachEvent("on" + t, n) : g("Fail to remove event listener.")
      }
        , J = (e, t) => {
          const n = e.indexOf(t);
          n >= 0 && (delete e[n],
          J(e, t))
      }
        , k = setTimeout
        , I = (e => {
          if (e) {
              const n = []
                , r = e => {
                  J(n, e)
              }
                , o = e => {
                  a(e) === c && n.push(e)
              }
                , s = () => {
                  for (let e = 0; e < n.length; e++)
                      n[e] && a(n[e]) === c && n[e]()
              }
                , i = t => e.getItem(t) || ""
                , l = (t, n) => {
                  e.setItem(t, n),
                  s()
              }
                , d = t => {
                  e.removeItem(t),
                  s()
              }
                , g = t => parseInt("" + (e.getItem(t) || 0))
                , m = (e, t) => l(e, "" + t)
                , u = (t, n="{}") => h(e.getItem(t) || n) || h(n) || {}
                , p = (e, t, n="{}") => l(e, ( (e, t, n) => {
                  try {
                      return JSON.stringify(e, t, n)
                  } catch (e) {}
              }
              )(t) || n)
                , v = t => {
                  const n = e.getItem(t)
                    , r = h(n)
                    , o = n && !r;
                  if (o) {
                      const e = `Base found corrupted data on [${t}].`;
                      console.log("%c" + e, "color:tomato"),
                      k(( () => {
                          if (confirm(`${e} Recover bad data?`)) {
                              const e = `${t}.${Date.now().toString(36)}.x`
                                , r = `Data has been recovered as [${e}].`;
                              I.setString(e, n),
                              k(( () => {
                                  console.log("%c" + r, "color:orange"),
                                  alert(r)
                              }
                              ))
                          }
                      }
                      ))
                  }
                  return !o
              }
                , f = () => {
                  let t = 0;
                  for (let n = 0; n < e.length; n++) {
                      const r = e.key(n);
                      r && (t += i(r).length)
                  }
                  return t
              }
              ;
              return b(t, "storage", s),
              {
                  storage: e,
                  getString: i,
                  setString: l,
                  getNumber: g,
                  setNumber: m,
                  getJson: u,
                  setJson: p,
                  validateJson: v,
                  onChange: o,
                  cleanOnChange: r,
                  remove: d,
                  size: f
              }
          }
      }
      )(t.localStorage)
        , S = ( () => {
          const e = I
            , t = "base"
            , n = e ? (e.validateJson(t),
          e.getJson(t)) : {}
            , o = (r, o) => (n[r] = o,
          !!e && (e.setJson(t, n),
          true));
          return e.onChange(( () => {
              e.validateJson(t) || e.setJson(t, n)
          }
          )),
          {
              get: e => n[e],
              set: o,
              remove: e => {
                  o(e, r)
              }
          }
      }
      )()
        , $ = ( () => {
          const e = "_color-scheme"
            , s = "theme";
          let c = ""
            , i = ["_dark"]
            , g = (e => n.getElementById(e || ""))(e);
          g || (g = ( (e, t, r) => {
              const o = n.createElement(e);
              if (t)
                  for (const e in t)
                      o.setAttribute(e, t[e]);
              return r && p(o, r),
              o
          }
          )("meta", {
              name: "color-scheme",
              content: "normal",
              id: e
          }),
          n.head.appendChild(g));
          const h = g
            , u = t.matchMedia
            , v = e => {
              if (!d(e))
                  return m("to change theme");
              i = e
          }
            , y = (e="") => {
              f(o, c, e);
              let t = "normal";
              return "dark" === e.slice(1, 5) && (t = "dark"),
              h.setAttribute("content", t),
              S.set(s, e),
              c = e
          }
          ;
          if (u) {
              const e = u("(prefers-color-scheme: dark)");
              S.get(s) !== r ? y(S.get(s)) : e.matches ? y("_dark") : y(),
              b(e, "change", (e => {
                  e.matches ? y("_dark") : y()
              }
              ))
          } else
              y(S.get(s));
          return {
              list: v,
              set: y,
              change: (e=i) => a(e) === l ? y(e) : d(e) ? (v(e),
              y(e[e.indexOf(c) + 1] || "")) : m("to change theme"),
              current: () => c
          }
      }
      )();
      return e.ignore_keyboard || b(t, "keyup", (x = e => {
          e.altKey && "KeyT" === e.code && $.change()
      }
      ,
      e => {
          C && e.isComposing || x(e)
      }
      )),
      e.theme = $,
      e;
      var x, C
  }
  )(window.base)
}
)();