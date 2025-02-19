(() => {
  const
    NOW = new Date().getMilliseconds(),
    RED = 'color:tomato;',
    GREEN = 'color:lime;',
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
    const { test, theme, storage } = W.ace;

    // ====================================================== test
    if (TEST(test, 'window.ace.test')) {
      test.invalid('err');
      test.invalid('xxx', 'fff');
      test.invalid('xxx', 'fff', 'yyy');
      test.failTo('xxx');
    }

    // =================================================== storage
    if (TEST(storage, 'window.ace.storage')) {
      storage.set('cuba', 'simpan');
    }

    // ===================================================== theme
    if (TEST(theme, 'window.ace.theme')) {

      const DOC = D.documentElement || D.body; // html or body

      // updateClass
      if (TEST(isFUN(theme.updateClass), 'window.ace.theme.updateClass')) {

        const
          doc_class = '  _nojs   _light  _purple  _scrollbar _a  _dark  ',
          del_class = '  _purple  ',
          add_class = '  _dark   _light  ';

        hr();
        note([
          `now = ${doc_class}`,
          `del = ${del_class}`,
          `add = ${add_class}`,
        ].join("\n"));
        hr();

        ((doc_class, del_class, add_class) => {
          const
            _ = '',
            P = ' ',
            I = '|',
            X = 'g',
            SEP = new RegExp('[\\.\\|\\s]+', X),
            R = (s, sep = I) => s.trim().replace(SEP, sep).trim(),
            NEW = add_class ? R(add_class, P) : _,
            DEL = del_class ? R([NEW, del_class].join(P)) : _,
            SEL = new RegExp('\\s+(' + DEL + ')(\\s*(' + DEL + '))*\\s+', X),
            ADD = NEW.length ? P + NEW : _,
            RES = doc_class.replace(SEL, P).trim() + ADD;

          note([
            `NEW = ${NEW}`,
            `DEL = ${DEL}`,
            `ADD = ${ADD}`,
            `RES = ${RES}`,
            `SEL = ${SEL}`,
            `SEP = ${SEP}`,
          ].join("\n"));
          hr();

        })(doc_class, del_class, add_class);

      }

      if (TEST(isFUN(theme.current), 'window.ace.theme.current')) {
        note(`current = ${theme.current()}`);
        note(`DOC.className = ${DOC.className}`);
      }

      if (TEST(isFUN(theme.set), 'window.ace.theme.set')) {
        theme.set('_dark');
        note(`set = _dark`);
        note(`current = ${theme.current()}`);
        note(`DOC.className = ${DOC.className}`);
      }

      if (TEST(isFUN(theme.change), 'window.ace.theme.change')) {
        for (var i = 0; i < 3; i++) {
          theme.change();
          note('theme.change()');
          note(`DOC.className = ${DOC.className}`);
        }
      }

    }

  } // if ( TEST(W.ace, 'window.ace') )

  // ==================================================== finished
  note(`Finished in ${new Date().getMilliseconds() - NOW}ms`);
})();