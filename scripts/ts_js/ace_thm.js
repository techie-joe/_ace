/*! Ace Template | v0.1.24 b325.19 | Copyright 2025 - Techie Joe | https://github.com/techie-joe/ace */
"use strict";
(() => {
    const W = window, D = document, DOC = D.documentElement || D.body, // html or body
    A = (a) => typeof a, TYPE = (e) => Object.prototype.toString.call(e), _ = '', STR = A(_), ARR = TYPE([]), isSTR = (v) => A(v) === STR, isARR = Array.isArray || (e => TYPE(e) === ARR), _throw = (e) => { throw e; }, 
    // _try = (fn: any, ...a: any) => { try { fn(...a) } catch (e) { console.error(e) } },
    invalid = (e, f, t) => {
        _throw(`Invalid argument of (${e})${(f ? ` for ${f}` : _)}.${(t ? ` Expecting (${t})` : _)}`);
    }, failTo = (e) => {
        _throw(`Fail to ${e}`);
    }, listenTo = (what, type, listener, options) => { what.addEventListener(type, listener, options); }, newRegex = (pattern, flags) => new RegExp(pattern, flags), updateClass = (element, del, add) => {
        if (!element) {
            invalid(element, 'updateClass');
            return;
        }
        const P = ' ', I = '|', X = 'g', SEP = newRegex('[\\.\\|\\s]+', X), TRIM = (s, sep = I) => s.trim().replace(SEP, sep).trim(), NEW = add ? TRIM(add, P) : _, DEL = del ? TRIM([del, NEW].join(P)).trim() : _, SEL = newRegex('(^|\\s+)(' + DEL + ')(\\s*(' + DEL + '))*(\\s+|$)', X), RES = element.className.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);
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
    }, STORE = (() => {
        const KEY = 'ace', { localStorage: store } = W;
        if (store) {
            // todo
        }
        const set = (key, value) => {
            // store key value
            // console.log(key, value);
            // store both current theme and list
        }, get = (key) => {
            // get key value
        };
        return {
            set,
            get,
        };
    })(), THEME = (() => {
        const KEY = 'theme', // storage key
        DARK = '_dark', set = (new_theme, begin) => {
            var old_theme = theme;
            if (isARR(new_theme)) {
                list = new_theme;
                theme = list[begin ? list.indexOf(begin || _) : 0];
            }
            else if (isSTR(new_theme)) {
                theme = new_theme;
            }
            else {
                failTo(`set theme`);
                return;
            }
            updateClass(DOC, old_theme, theme);
            STORE.set(KEY, theme);
        }, change = () => { set(list[list.indexOf(theme) + 1] || _); }, media = W.matchMedia('(prefers-color-scheme: dark)');
        var list = [DARK], theme = _;
        media.matches && set(DARK);
        listenTo(media, 'change', e => { e.matches ? set(DARK) : set(); });
        listenTo(W, 'keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
        return {
            set,
            change,
            list: () => list,
            current: () => theme,
        };
    })(), ACE = {
        // A, TYPE, STR, ARR, isSTR, isARR, DOC,
        // _throw, _try, invalid, failTo,
        // listenTo, newRegex,
        updateClass,
        storage: STORE,
        // theme: THEME,
    };
    // export theme ================================================
    W.theme = THEME;
    W.ace = ACE;
})();
