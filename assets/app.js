/*
 * app.js — Navegación, formularios de entrada, consola de salida y
 * visor del código Java original.
 */
(function () {
  'use strict';

  var REPO_URL = 'https://github.com/miguelpavajeau/ejercicios-logica-web';
  var SRC_PREFIX = 'src/';
  var VISITED_KEY = 'ejercicios-vistos';

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
    progress: document.getElementById('progress'),
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('overlay'),
    menuBtn: document.getElementById('menuBtn'),
    themeBtn: document.getElementById('themeBtn'),
    themeIcon: document.getElementById('themeIcon'),
    repoLink: document.getElementById('repoLink'),
    brandSub: document.getElementById('brandSub')
  };

  var state = { current: null, codeFile: null, filter: '', visited: loadVisited() };

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
  function indexOfId(id) {
    for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return i;
    return -1;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function countFiles() {
    var n = 0;
    ALL.forEach(function (ex) { n += 1 + (ex.extraFiles ? ex.extraFiles.length : 0); });
    return n;
  }

  /* ------- Ejercicios ya visitados (solo en este navegador) ------- */
  function loadVisited() {
    try { return JSON.parse(localStorage.getItem(VISITED_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function markVisited(id) {
    if (state.visited[id]) return;
    state.visited[id] = 1;
    try { localStorage.setItem(VISITED_KEY, JSON.stringify(state.visited)); }
    catch (e) { /* modo privado */ }
  }
  function visitedCount() {
    var n = 0;
    ALL.forEach(function (ex) { if (state.visited[ex.id]) n++; });
    return n;
  }

  /* =============================== Navegación =========================== */

  function matches(ex, q) {
    if (!q) return true;
    var hay = (ex.title + ' ' + ex.statement + ' ' + ex.file + ' ' +
      catLabel(ex.cat) + ' ' + (ex.num || '')).toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function renderProgress() {
    var n = visitedCount();
    var pct = ALL.length ? Math.round((n / ALL.length) * 100) : 0;
    el.progress.innerHTML =
      '<div class="progress" role="progressbar" aria-valuenow="' + n +
      '" aria-valuemin="0" aria-valuemax="' + ALL.length + '">' +
      '<i style="width:' + pct + '%"></i></div>' +
      '<span>' + n + ' de ' + ALL.length + ' explorados</span>';
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
        var cls = 'nav-item';
        if (state.current === ex.id) cls += ' is-active';
        if (state.visited[ex.id]) cls += ' is-visited';
        html += '<button class="' + cls + '" data-go="' + esc(ex.id) + '">' +
          '<span class="nav-num">' + (ex.num || '·') + '</span>' +
          '<span class="nav-label">' + esc(ex.title) + '</span>' +
          '<span class="nav-seen" aria-hidden="true"></span></button>';
      });
      html += '</div>';
    });
    el.nav.innerHTML = html;
    renderProgress();
  }

  /* ================================ Portada ============================= */

  function renderHome() {
    state.current = null;
    var totalCat = CATS.filter(function (c) {
      return ALL.some(function (ex) { return ex.cat === c.id; });
    }).length;

    var h = '<div class="home">';

    h += '<div class="hero">';
    h += '<div class="hero-text">';
    h += '<span class="chip">Portafolio · Java</span>';
    h += '<h2>Ejercicios de lógica<br>de programación</h2>';
    h += '<p class="lede">Los programas que escribí mientras aprendía a programar, ahora ejecutables ' +
      'aquí mismo. Pon tus propios datos, mira la salida y compárala con el código Java original.</p>';
    h += '<div class="hero-actions">';
    h += '<button class="btn primary" data-go="' + esc(ALL[0].id) + '">Empezar por el primero</button>';
    h += '<a class="btn ghost" href="' + REPO_URL + '" target="_blank" rel="noopener">Ver el código</a>';
    h += '</div>';
    h += '</div>';

    /* Muestra estática de cómo se ve una ejecución. */
    h += '<div class="hero-term term">';
    h += '<div class="term-bar"><span class="dot r"></span><span class="dot y"></span>' +
      '<span class="dot g"></span><span class="term-title">Ejercicio1.java</span></div>';
    h += '<pre class="term-body">' +
      '1.Leer un número entero y determinar si es un número terminado en 4.\n' +
      'Ingrese un número entero:\n' +
      '<span class="in">24</span>\n' +
      'El número termina en 4.</pre>';
    h += '</div>';
    h += '</div>';

    h += '<div class="stats">';
    h += '<div class="stat"><b>' + ALL.length + '</b><span>programas ejecutables</span></div>';
    h += '<div class="stat"><b>' + countFiles() + '</b><span>archivos Java</span></div>';
    h += '<div class="stat"><b>' + totalCat + '</b><span>categorías</span></div>';
    h += '<div class="stat"><b>0</b><span>dependencias de ejecución</span></div>';
    h += '</div>';

    h += '<h3 class="section-title">Categorías</h3>';
    h += '<div class="cat-grid">';
    CATS.forEach(function (cat) {
      var items = ALL.filter(function (ex) { return ex.cat === cat.id; });
      if (!items.length) return;
      h += '<button class="cat-card" data-go="' + esc(items[0].id) + '">' +
        '<span class="cat-count">' + items.length + '</span>' +
        '<b>' + esc(cat.label) + '</b>' +
        '<span class="cat-blurb">' + esc(cat.blurb) + '</span>' +
        '<span class="cat-go">Abrir →</span></button>';
    });
    h += '</div>';

    h += '<div class="home-note"><b>¿Cómo funciona?</b> Los programas originales leen por consola con ' +
      '<code>Scanner</code> y escriben con <code>System.out</code>. Para que corran en el navegador se ' +
      'portaron a JavaScript conservando su comportamiento —división entera, excepciones de la JVM y el ' +
      'formato de <code>printf</code>—, e incluso los errores del código original, que se señalan con una ' +
      'nota en vez de corregirse en silencio. Lo que escribes en el formulario aparece en la consola ' +
      '<span class="in-sample">en verde</span>, igual que el eco de una terminal real.</div>';

    h += footerHtml();
    h += '</div>';

    el.main.innerHTML = h;
    window.scrollTo(0, 0);
    document.title = 'Ejercicios de Lógica — Miguel Pavajeau';
    buildNav();
  }

  function footerHtml() {
    return '<footer class="foot">' +
      '<span>Código original de Miguel Pavajeau · ' + countFiles() + ' archivos Java</span>' +
      '<a href="' + REPO_URL + '" target="_blank" rel="noopener">Repositorio</a>' +
      '</footer>';
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

  function neighbourHtml(ex) {
    var i = indexOfId(ex.id);
    var prev = i > 0 ? ALL[i - 1] : null;
    var next = i >= 0 && i < ALL.length - 1 ? ALL[i + 1] : null;
    var h = '<nav class="ex-nav" aria-label="Ejercicio anterior y siguiente">';
    h += prev
      ? '<button class="ex-nav-btn" data-go="' + esc(prev.id) + '"><span>← Anterior</span><b>' +
        esc(prev.title) + '</b></button>'
      : '<span></span>';
    h += next
      ? '<button class="ex-nav-btn next" data-go="' + esc(next.id) + '"><span>Siguiente →</span><b>' +
        esc(next.title) + '</b></button>'
      : '<span></span>';
    h += '</nav>';
    return h;
  }

  function renderExercise(ex) {
    state.current = ex.id;
    state.codeFile = ex.file;
    markVisited(ex.id);

    var files = [ex.file].concat(ex.extraFiles || []);
    var hasInputs = !!(ex.inputs && ex.inputs.length);
    var h = '<article class="ex">';

    h += '<div class="ex-head">';
    h += '<span class="chip">' + esc(catLabel(ex.cat)) + (ex.num ? ' · ' + ex.num : '') + '</span>';
    h += '<h2>' + esc(ex.title) + '</h2>';
    h += '<p class="statement">' + esc(ex.statement) + '</p>';
    h += '<p class="filepath">' + esc(SRC_PREFIX + ex.file) + '</p>';
    h += '</div>';

    /* Pestañas solo en pantallas estrechas: en anchas se ven las dos a la vez. */
    h += '<div class="tabs">';
    h += '<button class="tab is-active" data-tab="run">Ejecutar</button>';
    h += '<button class="tab" data-tab="code">Código Java' +
      (files.length > 1 ? ' <span class="tab-count">' + files.length + '</span>' : '') + '</button>';
    h += '</div>';

    h += '<div class="panels" data-active="run">';

    /* -- Ejecutar -- */
    h += '<section class="panel panel-run">';
    if (ex.note) h += '<div class="note">' + esc(ex.note) + '</div>';
    if (hasInputs) {
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
      (hasInputs ? '<span class="term-legend"><i></i>lo que ingresaste</span>' : '') +
      '<button class="term-copy" id="copyOutBtn">Copiar</button>' +
      '</div>';
    h += '<pre class="term-body" id="termOut"></pre>';
    h += '</div>';
    h += '</section>';

    /* -- Código -- */
    h += '<section class="panel panel-code">';
    h += '<div class="panel-label">Código Java original</div>';
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

    h += '</div>'; /* .panels */

    h += neighbourHtml(ex);
    h += footerHtml();
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

  function flash(btn, texto) {
    var antes = btn.textContent;
    btn.textContent = texto;
    btn.classList.add('is-done');
    setTimeout(function () {
      btn.textContent = antes;
      btn.classList.remove('is-done');
    }, 1400);
  }

  /* ================================ Rutas =============================== */

  function go(id, push) {
    var ex = byId(id);
    if (!ex) { renderHome(); return; }
    if (push !== false) location.hash = '#' + id;
    renderExercise(ex);
    closeDrawer();
  }

  function step(delta) {
    var i = indexOfId(state.current);
    if (i < 0) return;
    var next = ALL[i + delta];
    if (next) go(next.id);
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
    var t = e.target;
    if (!t.closest) return;

    var goBtn = t.closest('[data-go]');
    if (goBtn) { go(goBtn.getAttribute('data-go')); return; }

    var tab = t.closest('.tab');
    if (tab) {
      var name = tab.getAttribute('data-tab');
      el.main.querySelectorAll('.tab').forEach(function (x) {
        x.classList.toggle('is-active', x === tab);
      });
      var panels = el.main.querySelector('.panels');
      if (panels) panels.setAttribute('data-active', name);
      return;
    }

    var fileTab = t.closest('.file-tab');
    if (fileTab) { showCode(fileTab.getAttribute('data-file')); return; }

    if (t.id === 'runBtn') { e.preventDefault(); runCurrent(); return; }

    if (t.id === 'copyBtn' || t.id === 'copyOutBtn') {
      var texto = t.id === 'copyBtn'
        ? (window.JAVA_SOURCES && window.JAVA_SOURCES[state.codeFile]) || ''
        : (document.getElementById('termOut') || {}).textContent || '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(function () { flash(t, 'Copiado'); });
      }
      return;
    }

    if (t === el.overlay) { closeDrawer(); return; }
    if (t.closest('#menuBtn')) {
      if (el.sidebar.classList.contains('is-open')) closeDrawer();
      else openDrawer();
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
    } else if (!typing && state.current && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      step(e.key === 'ArrowRight' ? 1 : -1);
    } else if (e.key === 'Escape') {
      if (el.sidebar.classList.contains('is-open')) closeDrawer();
      else if (document.activeElement === el.search) {
        el.search.value = '';
        state.filter = '';
        buildNav();
        el.search.blur();
      }
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
