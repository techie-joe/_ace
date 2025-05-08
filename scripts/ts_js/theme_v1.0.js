"use strict";
(() => {
    const ALLOWED_DOMAINS = [
        'localhost',
        'techie-joe.github.io',
        'themejs.pages.dev',
        'preview.themejs.pages.dev',
    ];
    if (!(ALLOWED_DOMAINS.indexOf(window.location.hostname) >= 0)) {
        return;
    }
    const W = window, D = document, DOC = D.documentElement || D.body, A = (a) => typeof a, TYPE = (e) => Object.prototype.toString.call(e), NULL = null, _ = '', STR = A(_), ARR = TYPE([]), isSTR = (v) => A(v) === STR, isARR = Array.isArray || (e => TYPE(e) === ARR), failTo = (e) => {
        throw ('Fail to ' + e);
    }, nodeId = (id) => D.getElementById(id), listenTo = (what, type, listener, options) => { what.addEventListener(type, listener, options); }, newRegex = (pattern, flags) => new RegExp(pattern, flags), updateClass = (element, del, add) => {
        try {
            const P = ' ', I = '|', X = 'g', SEP = newRegex('[\\.\\|\\s]+', X), TRIM = (s, sep = I) => s.trim().replace(SEP, sep).trim(), NEW = add ? TRIM(add, P) : _, DEL = del ? TRIM([del, NEW].join(P)).trim() : _, SEL = newRegex('(^|\\s+)(' + DEL + ')(\\s*(' + DEL + '))*(\\s+|$)', X), RES = element.className.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);
            element.className = RES;
            return element;
        }
        catch (e) {
            failTo('updateClass');
        }
    }, setAttribute = (e, attr, value) => { e.setAttribute(attr, value); }, STORE = (() => {
        const { localStorage: localStore } = W, set = (key, value) => {
            key ?
                isSTR(value) ?
                    localStore.setItem(key, value)
                    : remove(key)
                : failTo('set ' + key);
        }, get = (key) => {
            return key ?
                localStore.getItem(key)
                : (failTo('get ' + key), NULL);
        }, remove = (key) => {
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
        const KEY = 'theme', KEYS = 'themes', DARK = '_dark', COLOR_SCHEME = 'color-scheme', SCHEME = (() => {
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
        var stored_list = parseList(STORE.get(KEYS)), stored_theme = STORE.get(KEY), list = stored_list || [DARK], theme = isSTR(stored_theme) ? stored_theme : media.matches ? DARK : _;
        D.addEventListener('DOMContentLoaded', () => {
            updateClass(DOC, '_hidden', theme);
            syncScheme(theme);
        });
        listenTo(media, 'change', e => { e.matches ? set(DARK) : set(); });
        listenTo(W, 'keyup', e => { e.altKey && 'KeyT' === e.code && change(); });
        return W.theme = {
            reset,
            set,
            change,
            list: () => list,
            current: () => theme,
            fn: {
                updateClass,
                storage: STORE,
            },
        };
    })();
})();
