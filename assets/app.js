/*
 * app.js — Navegación, formularios de entrada, consola de salida y
 * visor del código Java original.
 */
(function () {
  'use strict';

  var REPO_URL = 'https://github.com/miguelpavajeau/ejercicios-logica-web';
  var SRC_PREFIX = 'src/';

  var CATS = [
    { id: 'condicionales', label: 'Condicionales', blurb: 'Decisiones con if / else: dígitos, primos, comparaciones y clasificaciones.' },
    { id: 'ciclos', label: 'Ciclos', blurb: 'Repetición con for y while: rangos, divisores, múltiplos y acumuladores.' },
    { id: 'arreglos', label: 'Arreglos', blurb: 'Vectores: buscar el mayor, serie de Fibonacci, primos e histogramas.' },
    { id: 'libres', label: 'Ejercicios libres', blurb: 'Práctica suelta: conversión a binario, series y detección de spam.' },
    { id: 'hackerrank', label: 'HackerRank', blurb: 'Retos resueltos de la plataforma, con su formato de salida exacto.' },
    { id: 'poo', label: 'POO', blurb: 'Clases, herencia y sobrescritura con una selección de fútbol.' }
  ];

  var ALL = JLogic.CATALOG.slice().sort(function (a, b) {
    var ca = catIndex(a.cat), cb = catIndex(b.cat);
    if (ca !== cb) return ca - cb;
    return (a.num || 0) - (b.num || 0);
  });

  var el = {
    nav: document.getElementById('nav'),
    main: document.getElementById('main'),
    search: document.getElementById('search'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('overlay'),
    menuBtn: document.getElementById('menuBtn'),
    themeBtn: document.getElementById('themeBtn'),
    themeIcon: document.getElementById('themeIcon'),
    repoLink: document.getElementById('repoLink'),
    brandSub: document.getElementById('brandSub')
  };

  var state = { current: null, codeFile: null, filter: '' };

  /* ============================== Utilidades ============================= */

  function catIndex(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return i;
    return 99;
  }
  function catLabel(id) {
    var i = catIndex(id);
    return i < CATS.length ? CATS[i].label : id;
  }
  function byId(id) {
    for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i];
    return null;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function countFiles() {
    var n = 0;
    ALL.forEach(function (ex) {
      n += 1 + (ex.extraFiles ? ex.extraFiles.length : 0);
    });
    return n;
  }

  /* =============================== Navegación =========================== */

  function matches(ex, q) {
    if (!q) return true;
    var hay = (ex.title + ' ' + ex.statement + ' ' + ex.file + ' ' +
      catLabel(ex.cat) + ' ' + (ex.num || '')).toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function buildNav() {
    var q = state.filter.trim().toLowerCase();
    var visible = ALL.filter(function (ex) { return matches(ex, q); });

    if (!visible.length) {
      el.nav.innerHTML = '<p class="nav-empty">Ningún ejercicio coincide con «' + esc(state.filter) + '».</p>';
      return;
    }

    var html = '';
    CATS.forEach(function (cat) {
      var items = visible.filter(function (ex) { return ex.cat === cat.id; });
      if (!items.length) return;
      html += '<div class="nav-group">';
      html += '<div class="nav-title">' + esc(cat.label) +
        '<span class="count">' + items.length + '</span></div>';
      items.forEach(function (ex) {
        var active = state.current === ex.id ? ' is-active' : '';
        html += '<button class="nav-item' + active + '" data-go="' + esc(ex.id) + '">' +
          '<span class="nav-num">' + (ex.num || '·') + '</span>' +
          '<span>' + esc(ex.title) + '</span></button>';
      });
      html += '</div>';
    });
    el.nav.innerHTML = html;
  }

  /* ================================ Portada ============================= */

  function renderHome() {
    state.current = null;
    var html = '<div class="home">';
    html += '<span class="chip">Portafolio · Java</span>';
    html += '<h2>Ejercicios de lógica de programación</h2>';
    html += '<p class="lede">Una colección de programas Java escritos mientras aprendía a programar. ' +
      'Cada uno se puede ejecutar aquí mismo con tus propios datos y comparar con su código fuente original.</p>';

    html += '<div class="stats">';
    html += '<div class="stat"><b>' + ALL.length + '</b><span>programas ejecutables</span></div>';
    html += '<div class="stat"><b>' + countFiles() + '</b><span>archivos Java</span></div>';
    html += '<div class="stat"><b>' + CATS.length + '</b><span>categorías</span></div>';
    html += '</div>';

    html += '<div class="cat-grid">';
    CATS.forEach(function (cat) {
      var n = ALL.filter(function (ex) { return ex.cat === cat.id; }).length;
      if (!n) return;
      var first = ALL.filter(function (ex) { return ex.cat === cat.id; })[0];
      html += '<button class="cat-card" data-go="' + esc(first.id) + '">' +
        '<b>' + esc(cat.label) + ' · ' + n + '</b>' +
        '<span>' + esc(cat.blurb) + '</span></button>';
    });
    html += '</div>';

    html += '<div class="home-note"><b>¿Cómo funciona?</b> Los programas originales leen por consola con ' +
      '<code>Scanner</code> y escriben con <code>System.out</code>. Para que corran en el navegador se ' +
      'portaron a JavaScript conservando su comportamiento exacto —incluida la división entera, las ' +
      'excepciones de la JVM y hasta los errores del código original, que se señalan cuando aparecen.</div>';

    html += '</div>';
    el.main.innerHTML = html;
    el.main.scrollTop = 0;
    window.scrollTo(0, 0);
    document.title = 'Ejercicios de Lógica — Miguel Pavajeau';
    buildNav();
  }

  /* ========================= Detalle del ejercicio ====================== */

  function fieldHtml(inp) {
    var wide = inp.type === 'lines' || inp.type === 'ints';
    var h = '<div class="field' + (wide ? ' wide' : '') + '">';
    h += '<label for="in-' + esc(inp.name) + '">' + esc(inp.label) + '</label>';
    if (inp.type === 'lines') {
      h += '<textarea id="in-' + esc(inp.name) + '" data-input="' + esc(inp.name) + '" rows="' +
        (inp.rows || 4) + '">' + esc(inp.def || '') + '</textarea>';
    } else {
      var mode = (inp.type === 'int' || inp.type === 'double') ? ' inputmode="decimal"' : '';
      h += '<input id="in-' + esc(inp.name) + '" data-input="' + esc(inp.name) + '" type="text"' +
        mode + ' value="' + esc(inp.def || '') + '" spellcheck="false">';
    }
    h += '</div>';
    return h;
  }

  function renderExercise(ex) {
    state.current = ex.id;
    state.codeFile = ex.file;

    var files = [ex.file].concat(ex.extraFiles || []);
    var h = '<article class="ex">';

    h += '<div class="ex-head">';
    h += '<span class="chip">' + esc(catLabel(ex.cat)) + (ex.num ? ' · ' + ex.num : '') + '</span>';
    h += '<h2>' + esc(ex.title) + '</h2>';
    h += '<p class="statement">' + esc(ex.statement) + '</p>';
    h += '<p class="filepath">' + esc(SRC_PREFIX + ex.file) + '</p>';
    h += '</div>';

    h += '<div class="tabs">';
    h += '<button class="tab is-active" data-tab="run">Ejecutar</button>';
    h += '<button class="tab" data-tab="code">Código Java' +
      (files.length > 1 ? ' <span class="nav-num">' + files.length + '</span>' : '') + '</button>';
    h += '</div>';

    /* -- Panel: ejecutar -- */
    h += '<section class="panel" data-panel="run">';
    if (ex.note) h += '<div class="note">' + esc(ex.note) + '</div>';
    if (ex.inputs && ex.inputs.length) {
      h += '<form class="inputs" id="exForm" autocomplete="off">';
      ex.inputs.forEach(function (inp) { h += fieldHtml(inp); });
      h += '</form>';
    } else {
      h += '<p class="no-inputs">Este programa no pide datos: solo pulsa Ejecutar.</p>';
      h += '<form class="inputs" id="exForm"></form>';
    }
    h += '<div class="run-bar">';
    h += '<button class="btn primary" id="runBtn">Ejecutar</button>';
    h += '<span class="hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd></span>';
    h += '</div>';
    h += '<div class="term">';
    h += '<div class="term-bar"><span class="dot r"></span><span class="dot y"></span>' +
      '<span class="dot g"></span><span class="term-title">salida del programa</span>' +
      (ex.inputs && ex.inputs.length
        ? '<span class="term-legend"><i></i>lo que ingresaste</span>' : '') +
      '</div>';
    h += '<pre class="term-body" id="termOut"></pre>';
    h += '</div>';
    h += '</section>';

    /* -- Panel: código -- */
    h += '<section class="panel" data-panel="code" hidden>';
    if (files.length > 1) {
      h += '<div class="file-tabs">';
      files.forEach(function (f, i) {
        h += '<button class="file-tab' + (i === 0 ? ' is-active' : '') + '" data-file="' + esc(f) + '">' +
          esc(f.split('/').pop()) + '</button>';
      });
      h += '</div>';
    }
    h += '<div class="code-wrap">';
    h += '<button class="copy-btn" id="copyBtn">Copiar</button>';
    h += '<pre><code class="language-java" id="codeOut"></code></pre>';
    h += '</div>';
    h += '</section>';

    h += '</article>';
    el.main.innerHTML = h;
    window.scrollTo(0, 0);

    showCode(ex.file);
    runCurrent();

    document.title = ex.title + ' — Ejercicios de Lógica';
    buildNav();
  }

  function showCode(file) {
    state.codeFile = file;
    var code = document.getElementById('codeOut');
    if (!code) return;
    var src = (window.JAVA_SOURCES && window.JAVA_SOURCES[file]) ||
      '// No se encontró el archivo ' + file;
    if (window.hljs && window.hljs.highlight) {
      try {
        code.innerHTML = window.hljs.highlight(src, { language: 'java' }).value;
      } catch (e) {
        code.textContent = src;
      }
    } else {
      code.textContent = src;
    }
    var tabs = el.main.querySelectorAll('.file-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle('is-active', tabs[i].getAttribute('data-file') === file);
    }
  }

  function runCurrent() {
    var ex = byId(state.current);
    var term = document.getElementById('termOut');
    if (!ex || !term) return;

    var values = {};
    var fields = el.main.querySelectorAll('[data-input]');
    for (var i = 0; i < fields.length; i++) {
      values[fields[i].getAttribute('data-input')] = fields[i].value;
    }

    var text = JLogic.runExercise(ex, values);
    var html = text.split('\n').map(function (line) {
      return /^(Exception in thread|\[error inesperado\]|\[salida truncada)/.test(line)
        ? '<span class="err">' + esc(line) + '</span>'
        : esc(line);
    }).join('\n');
    /* Las marcas de eco se convierten en spans después de escapar el HTML. */
    term.innerHTML = html
      .split(JLogic.ECHO_OPEN).join('<span class="in">')
      .split(JLogic.ECHO_CLOSE).join('</span>');
    term.scrollTop = 0;
  }

  /* ================================ Rutas =============================== */

  function go(id, push) {
    var ex = byId(id);
    if (!ex) { renderHome(); return; }
    if (push !== false) location.hash = '#' + id;
    renderExercise(ex);
    closeDrawer();
  }

  function fromHash() {
    var id = (location.hash || '').replace(/^#\/?/, '');
    if (id && byId(id)) renderExercise(byId(id));
    else renderHome();
  }

  /* ================================ Tema ================================ */

  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    el.themeIcon.textContent = t === 'dark' ? '☀' : '☾';
    try { localStorage.setItem('tema', t); } catch (e) { /* modo privado */ }
  }

  /* ============================== Menú móvil ============================ */

  function openDrawer() {
    el.sidebar.classList.add('is-open');
    el.overlay.hidden = false;
    el.menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    el.sidebar.classList.remove('is-open');
    el.overlay.hidden = true;
    el.menuBtn.setAttribute('aria-expanded', 'false');
  }

  /* =============================== Eventos ============================== */

  document.addEventListener('click', function (e) {
    var goBtn = e.target.closest ? e.target.closest('[data-go]') : null;
    if (goBtn) { go(goBtn.getAttribute('data-go')); return; }

    var tab = e.target.closest ? e.target.closest('.tab') : null;
    if (tab) {
      var name = tab.getAttribute('data-tab');
      el.main.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
      });
      el.main.querySelectorAll('.panel').forEach(function (p) {
        p.hidden = p.getAttribute('data-panel') !== name;
      });
      return;
    }

    var fileTab = e.target.closest ? e.target.closest('.file-tab') : null;
    if (fileTab) { showCode(fileTab.getAttribute('data-file')); return; }

    if (e.target.id === 'runBtn') { e.preventDefault(); runCurrent(); return; }

    if (e.target.id === 'copyBtn') {
      var src = (window.JAVA_SOURCES && window.JAVA_SOURCES[state.codeFile]) || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(src).then(function () {
          e.target.textContent = 'Copiado';
          setTimeout(function () { e.target.textContent = 'Copiar'; }, 1400);
        });
      }
      return;
    }

    if (e.target === el.overlay) { closeDrawer(); return; }
    if (e.target.closest && e.target.closest('#menuBtn')) {
      el.sidebar.classList.contains('is-open') ? closeDrawer() : openDrawer();
    }
  });

  el.main.addEventListener('submit', function (e) {
    e.preventDefault();
    runCurrent();
  });

  el.themeBtn.addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  el.search.addEventListener('input', function () {
    state.filter = el.search.value;
    buildNav();
  });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) {
      e.preventDefault();
      el.search.focus();
      el.search.select();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCurrent();
    } else if (e.key === 'Escape') {
      if (el.sidebar.classList.contains('is-open')) closeDrawer();
      else if (document.activeElement === el.search) { el.search.value = ''; state.filter = ''; buildNav(); el.search.blur(); }
    }
  });

  window.addEventListener('hashchange', fromHash);

  /* ================================ Inicio ============================== */

  var saved = null;
  try { saved = localStorage.getItem('tema'); } catch (e) { /* modo privado */ }
  if (saved === 'dark' || saved === 'light') applyTheme(saved);
  else el.themeIcon.textContent = currentTheme() === 'dark' ? '☀' : '☾';

  el.repoLink.href = REPO_URL;
  el.brandSub.textContent = ALL.length + ' programas · ' + countFiles() + ' archivos Java';

  fromHash();
})();
