(() => {
  const
    NOW = new Date().getMilliseconds(),
    RED = 'color:tomato;',
    GREEN = 'color:green;',
    ORANGE = 'color:#916900;',
    W = window,
    D = document,
    A = (a) => typeof a,
    TYPE = (e) => Object.prototype.toString.call(e),
    VOID = void 0,
    FUN = A(() => { }),
    OBJ = A({}),
    STR = A(''),
    ARR = TYPE([]),
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    isFUN = (v) => A(v) === FUN,
    nodeId = e => D.getElementById(e),
    jsout = nodeId('jsout'),
    hr = () => {
      jsout.append(D.createElement('hr'));
    },
    out = (v, style) => {
      var e = D.createElement('span');
      e.append(v);
      style && e.setAttribute('style', style);
      jsout.append(e, `\n`);
    },
    note = (v, style) => {
      out(v, style);
      style ? log('%c' + v, style) : log(v);
    },
    TEST = (what, label) => {
      what ? note(label + ' ☑', GREEN) : note(label + ' ☒', RED);
      return what;
    },
    { log } = console;

  // ================================================ add listener
  W.onerror = (event) => { out(event.toString(), RED) };

  // ================================================== test AceJs
  log('Testing AceJs');

  if (TEST(W.ace, 'window.ace')) {

    log(W.ace)
    const { fn, theme, storage } = W.ace;

    // ========================================== test updateClass

    hr();
    note('testing logic for updateClass', ORANGE);
    const updateClass = (doc, del, add) => {

      note([
        `now = .${doc}.`,
        `del = .${del}.`,
        `add = .${add}.`,
      ].join("\n"));

      const
        _ = '',
        P = ' ',
        I = '|',
        X = 'g',
        newRegex = (pattern, flags) => new RegExp(pattern, flags),
        SEP = newRegex('[\\.\\|\\s]+', X),
        TRIM = (s, sep = I) => s.trim().replace(SEP, sep).trim(),
        NEW = add ? TRIM(add, P) : _,
        DEL = del ? TRIM([del, NEW].join(P)).trim() : _,
        SEL = newRegex('(^|\\s+)(' + DEL + ')(\\s*(' + DEL + '))*(\\s+|$)', X),
        RES = doc.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);
        // (^|\s+)(DEL)(\s*(DEL))*(\s+|$)

      note([
        `NEW = .${NEW}.`,
        `DEL = .${DEL}.`,
        `SEL = .${SEL}.`,
        `RES = .${RES}.`,
      ].join("\n"));
      hr();

    };

    updateClass(
      '  a  _ox_  b  c  _oo_  d  ',
      '  a  b  c  d  ',
      '  e  f  '
    );

    updateClass(
      'A _ox_ B C _oo D',
      'A B C D',
      'E F'
    );

    // ======================================================== fn
    if (TEST(fn, 'window.ace.fn')) {

      // const { invalid, failTo } = fn;
      // invalid('err');
      // invalid('xxx', 'fff');
      // invalid('xxx', 'fff', 'yyy');
      // failTo('xxx');
      
      // if (TEST(isFUN(fn.updateClass), 'window.ace.fn.updateClass')) { }

    }

    // =================================================== storage
    if (TEST(storage, 'window.ace.storage')) {
      storage.set('cuba', 'simpan');
    }

    // ===================================================== theme
    if (TEST(theme, 'window.ace.theme')) {

      const DOC = D.documentElement || D.body; // html or body

      if (TEST(isFUN(theme.current), 'window.ace.theme.current')) {
        note(`current = ${theme.current()}`);
        note(`DOC.className = ${DOC.className}`);
      }

      if (TEST(isFUN(theme.set), 'window.ace.theme.set')) {

        // theme.set('AT');
        // note(`set           = AT`);
        // note(`current       = ${theme.current()}`);
        // note(`DOC.className = .${DOC.className}.`);

        // theme.set('BT');
        // note(`set           = BT`);
        // note(`current       = ${theme.current()}`);
        // note(`DOC.className = .${DOC.className}.`);

      }

      if (TEST(isFUN(theme.change), 'window.ace.theme.change')) {

        // theme.change(['pink','light','_dark']);
        // note(`DOC.className = ${DOC.className}`);

        // for (var i = 0; i < 3; i++){
        //   theme.change();
        //   note(`DOC.className = ${DOC.className}`);
        // }

        // theme.change(['_dark']);
        // note(`DOC.className = ${DOC.className}`);

      }

    }

  } // if ( TEST(W.ace, 'window.ace') )

  // ==================================================== finished
  hr();
  note(`Finished in ${new Date().getMilliseconds() - NOW}ms`);
})();