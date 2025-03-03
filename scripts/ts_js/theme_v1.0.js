/*! ThemeJs | v1.0.0 b334.29 | Copyright 2025 - Techie Joe | https://themejs.pages.dev */
/* ===============================================================
// IMPORTANT: must compile to ES5 or above.
// ECMAScript 5 (ES5) aka ECMAScript 2009,
// See tsconfig.json > compilerOptions.target = 'ES5';
// USING: "use strict", Array.isArray, JSON, get and set keywords,
// Date.now(), String.trim(), Number.
//
// ADVANCE: compile to ES6.
// ECMAScript 6 (ES6), also known as ECMAScript 2015.
// PAY ATTENTION TO: Template literals and regex.
// USING:
// - Template literals: embedded expression and backticks `${v}`.
// - Rest and Spread Operators: fn(...args).
// - Destructuring Assignment: { var } = obj, [a,b] = [b,a].
// - Classes: Introduces class syntax for constructors.
// - Modules: support for using import and export statements.
// - Promises: new Promise().
// ============================================================ */
"use strict";
((CODE = '') => {
    const VERIFIED = (code) => CODE.indexOf(btoa(code).substring(0, 5)) >= 0, W = window, D = document, DOC = D.documentElement || D.body, // html or body
    A = (a) => typeof a, TYPE = (e) => Object.prototype.toString.call(e), NULL = null, _ = '', STR = A(_), ARR = TYPE([]), isSTR = (v) => A(v) === STR, isARR = Array.isArray || (e => TYPE(e) === ARR), failTo = (e) => {
        throw ('Fail to ' + e);
    }, nodeId = (id) => D.getElementById(id), listenTo = (what, type, listener, options) => { what.addEventListener(type, listener, options); }, newRegex = (pattern, flags) => new RegExp(pattern, flags), updateClass = (element, del, add) => {
        try {
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
        }
        catch (e) {
            failTo('updateClass');
        }
    }, setAttribute = (e, attr, value) => { e.setAttribute(attr, value); }, STORE = (() => {
        const { localStorage: localStore } = W, set = (key, value) => {
            // store key value
            key ?
                isSTR(value) ?
                    localStore.setItem(key, value)
                    : remove(key)
                : failTo('set ' + key);
        }, get = (key) => {
            // get key value
            return key ?
                localStore.getItem(key)
                : (failTo('get ' + key), NULL);
        }, remove = (key) => {
            // get key value
            key ?
                localStore.removeItem(key)
                : failTo('remove ' + key);
        };
        return {
            set,
            get,
            remove,
        };
    })(), THEME = (() => {
        const KEY = 'theme', // storage key to store current theme
        KEYS = 'themes', // storage key to store current list
        DARK = '_dark', COLOR_SCHEME = 'color-scheme', SCHEME = (() => {
            var e = (() => {
                var e = nodeId('_color_scheme');
                if (!e) {
                    var a = D.getElementsByName(COLOR_SCHEME);
                    if (isARR(a)) {
                        e = a[a.length - 1];
                    }
                }
                if (!e) {
                    e = D.createElement('meta');
                    var t = [['name', COLOR_SCHEME]];
                    for (var i in t) {
                        setAttribute(e, t[i][0], t[i][1]);
                    }
                    D.head && D.head.appendChild(e);
                }
                return e;
            })();
            return { set: (v) => { e && setAttribute(e, 'content', v); } };
        })(), set = (new_theme, begin) => {
            // set & store current theme and list
            var old_theme = theme || _;
            if (isARR(new_theme)) {
                list = new_theme;
                STORE.set(KEYS, JSON.stringify(list));
                new_theme = list[isSTR(begin) ? list.indexOf(begin || _) : 0];
            }
            theme = isSTR(new_theme) ? (new_theme || _) : _;
            updateClass(DOC, old_theme, theme);
            syncScheme(theme);
            STORE.set(KEY, theme);
        }, change = () => { set(list[list.indexOf(theme || _) + 1] || _); }, parseList = (stored_list) => {
            try {
                return stored_list && JSON.parse(stored_list);
            }
            catch (e) {
                console.error('Fail to parse stored themes: ' + stored_list);
            }
            return NULL;
        }, reset = () => {
            list = [DARK];
            var old_theme = theme || _;
            theme = media.matches ? DARK : _;
            updateClass(DOC, old_theme, theme);
            syncScheme(theme);
            STORE.remove(KEY);
            STORE.remove(KEYS);
        }, syncScheme = (v) => { (v && v.substring(0, 2) === '_d') ? SCHEME.set('dark') : SCHEME.set('light'); }, media = W.matchMedia('(prefers-color-scheme: dark)');
        if (VERIFIED(W.location.hostname)) {
            // prepare presets
            var stored_list = parseList(STORE.get(KEYS)), // load user decided list
            stored_theme = STORE.get(KEY), // load user decided theme
            list = stored_list || [DARK], // list: were decided by user or ace
            theme = isSTR(stored_theme) ? stored_theme : media.matches ? DARK : _; // theme: were decided by user or refers to media-matches.
            // apply load theme
            updateClass(DOC, NULL, theme);
            syncScheme(theme);
            // open to changes
            listenTo(media, 'change', e => { e.matches ? set(DARK) : set(); });
            listenTo(W, 'keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
            // export
            return W.theme = {
                reset,
                set,
                change,
                list: () => list,
                current: () => theme,
                fn: {
                    // A, TYPE, STR, ARR, isSTR, isARR, DOC,
                    // failTo,
                    // listenTo, newRegex,
                    updateClass,
                    storage: STORE,
                },
            };
        }
    })(); // THEME
})('bG9jY dGVja dGhlb cHJld');
