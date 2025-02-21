(() => {
  const
    now = () => new Date().getMilliseconds(),
    RED = 'color:#e22200;',
    GREEN = 'color:#008800;',
    ORANGE = 'color:#916900;',
    W = window,
    D = document,
    A = a => typeof a,
    TYPE = e => Object.prototype.toString.call(e),
    VOID = void 0,
    FUN = A(() => { }),
    OBJ = A({}),
    STR = A(''),
    ARR = TYPE([]),
    isARR = Array.isArray || (e => TYPE(e) === ARR),
    isFUN = v => A(v) === FUN,
    isOBJ = v => A(v) === OBJ,
    nodeId = e => D.getElementById(e),
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

  // ============================================= initializations
  const
    jsout = nodeId('jsout'),
    jstest = nodeId('jstest'),
    element = nodeId('element'),
    hr = () => { jsout.append(D.createElement('hr')); },
    roll = () => { jso.scrollTo(0, jso.scrollHeight); },
    DOC = D.documentElement || D.body; // html or body

  // ================================================ add listener
  W.onerror = (event) => {
    out(event.toString(), RED);
    jstest && (jstest.setAttribute('style', RED), jstest.innerHTML = '[JS:ER]');
  };

  note('Initiate test.run() to begin.', ORANGE);

  // ========================================================= run
  const run = () => {
    const THEN = now();
    hr();

    // ================================================ test theme
    log('Testing AceJs Theme');

    const { theme } = W;

    if (!TEST(theme, 'window.theme')) { return }

    log(theme)
    note(`theme.o = ${A(theme.o)}`);
    note(`theme.current = ${theme.current()}`);

    // ======================================================== fn

    const { fn } = theme;

    if (!TEST(fn, 'window.theme.fn')) { return }

    // note(`Testing invalid and failTo. See console.`, ORANGE)
    // const { invalid, failTo } = fn;
    // invalid('err');
    // invalid('xxx', 'fff');
    // invalid('xxx', 'fff', 'yyy');
    // failTo('xxx');

    // =================================================== storage
    if (!TEST(fn.storage, 'window.theme.fn.storage')) { return }

    fn.storage.set('cuba', 'simpan');


    // ===================================================== theme

    if (!TEST(isFUN(theme.current), 'window.theme.current')) { return }

    note(`DOC.className = ${DOC.className}`);
    note(`theme.current = ${theme.current()}`);

    hr();
    note(`Finished in ${now() - THEN}ms`);
    roll();
  }; // run

  // ============================================= run_updateClass
  const run_updateClass = () => {
    const THEN = now();
    hr();
    const { fn } = theme;

    note('testing logic for updateClass', ORANGE);
    const updateClass = (element, del, add) => {

      note([
        `now =.${element.className}.`,
        `del =.${del}.`,
        `add =.${add}.`,
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
        RES = element.className.replace(SEL, P).trim() + (NEW.length ? P + NEW : _);
      // (^|\s+)(DEL)(\s*(DEL))*(\s+|$)

      note([
        `NEW =.${NEW}.`,
        `DEL =.${DEL}.`,
        `SEL =.${SEL}.`,
        `RES =.${RES}.`,
      ].join("\n"));
      hr();

    };

    element.className = '  a  _ox_  b  c  _oo_  d  ';
    updateClass(
      element,
      '  a  b  c  d  ',
      '  e  f  '
    );

    element.className = 'A _ox_ B C _oo D';
    updateClass(
      element,
      'A B C D',
      'E F'
    );

    // =============================================== updateClass
    if (!TEST(isFUN(fn.updateClass), 'window.theme.fn.updateClass')) { return }

    note(`DOC.className = ${DOC.className}`);
    fn.updateClass(DOC, null, 'TEST');
    note(`DOC.className = ${DOC.className}`);
    fn.updateClass(DOC, 'TEST');
    note(`DOC.className = ${DOC.className}`);

    hr();
    note(`Finished in ${now() - THEN}ms`);
    roll();
  }; // run

  // ===================================================== run_set
  const run_set = () => {
    hr();

    if (!TEST(isFUN(theme.set), 'window.theme.set')) { return }

    var new_theme = 'T'+now();
    var before = theme.current()|| 'none';
    theme.set(new_theme);
    var after = theme.current() || 'none';
    note(`theme.set = from ${before} to ${after}`);
    note(`DOC.className =.${DOC.className}.`);

    roll();
  }; // run_set

  // ================================================== run_change
  const run_change = () => {
    hr();

    if (!TEST(isFUN(theme.change), 'window.theme.change')) { return }

    var before = theme.current()|| 'none';
    theme.change(['pink','light','_dark']);
    var after = theme.current() || 'none';
    note(`theme.change ['pink','light','_dark'] = from ${before} to ${after}`);

    roll();
  }; // run_theme

  // ================================================== run_change
  const run_change_reset = () => {
    hr();

    if (!TEST(isFUN(theme.change), 'window.theme.change')) { return }

    var before = theme.current()|| 'none';
    theme.change(['_dark']);
    var after = theme.current() || 'none';
    note(`theme.change ['_dark'] = from ${before} to ${after}`);

    roll();
  }; // run_theme
    
  // ==================================================== finished

  const clear = () => {
    console.clear();
    jsout.innerHTML = '';
    note('Initiate test.run() to begin.', ORANGE);
  }; // clear

  W.test = {
    clear,
    run,
    run_updateClass,
    run_set,
    run_change, run_change_reset,
  };

})();