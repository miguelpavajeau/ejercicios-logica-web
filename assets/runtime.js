/*
 * runtime.js — Capa mínima que reproduce en el navegador el comportamiento
 * de las APIs de Java que usan los ejercicios originales: Scanner,
 * System.out, división entera y las excepciones que lanza la JVM.
 */
(function (g) {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Excepciones
   * ------------------------------------------------------------------ */
  function JavaError(javaName, message) {
    this.javaName = javaName;
    this.message = message || '';
  }
  JavaError.prototype.toString = function () {
    return this.javaName + (this.message ? ': ' + this.message : '');
  };

  function InputMismatchException() {
    return new JavaError('java.util.InputMismatchException');
  }
  function ArithmeticException(msg) {
    return new JavaError('java.lang.ArithmeticException', msg);
  }
  function NumberFormatException(raw) {
    return new JavaError('java.lang.NumberFormatException', 'For input string: "' + raw + '"');
  }

  /* Señal interna: corta los bucles que producirían salida infinita. */
  function OutputLimit() {}

  /* ------------------------------------------------------------------ *
   * System.out
   * ------------------------------------------------------------------ */
  var MAX_LINES = 5000;

  function Out() {
    this.parts = [];
    this.lines = 0;
    this.truncated = false;
  }
  Out.prototype._push = function (s) {
    s = String(s);
    this.parts.push(s);
    for (var i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) === 10) this.lines++;
    }
    if (this.lines > MAX_LINES) {
      this.truncated = true;
      throw new OutputLimit();
    }
  };
  Out.prototype.print = function (s) {
    this._push(s === undefined ? '' : s);
  };
  Out.prototype.println = function (s) {
    this._push(s === undefined ? '\n' : s + '\n');
  };
  Out.prototype.printf = function (fmt) {
    this._push(javaFormat(fmt, [].slice.call(arguments, 1)));
  };
  Out.prototype.text = function () {
    return this.parts.join('');
  };

  /* printf / String.format: soporta %d %s %f %n %% con flags - y 0, ancho
     y precisión, que es todo lo que usan los ejercicios. */
  function javaFormat(fmt, args) {
    var i = 0;
    return String(fmt).replace(
      /%([-+ 0]*)(\d+)?(?:\.(\d+))?([a-zA-Z%])/g,
      function (m, flags, width, prec, conv) {
        if (conv === '%') return '%';
        if (conv === 'n') return '\n';
        var v = args[i++];
        var s;
        if (conv === 'd') s = String(Math.trunc(v));
        else if (conv === 'f') s = Number(v).toFixed(prec === undefined ? 6 : +prec);
        else if (conv === 'S') s = String(v).toUpperCase();
        else s = String(v);
        if (width) {
          var w = +width;
          if (s.length < w) {
            var pad = new Array(w - s.length + 1).join(flags.indexOf('0') >= 0 ? '0' : ' ');
            if (flags.indexOf('-') >= 0) {
              s = s + new Array(w - s.length + 1).join(' ');
            } else if (flags.indexOf('0') >= 0 && (conv === 'd' || conv === 'f')) {
              s = s.charAt(0) === '-' ? '-' + pad + s.slice(1) : pad + s;
            } else {
              s = new Array(w - s.length + 1).join(' ') + s;
            }
          }
        }
        return s;
      }
    );
  }

  /* ------------------------------------------------------------------ *
   * Scanner / BufferedReader
   * Cada campo del formulario es un token al que el ejercicio accede por
   * nombre, en el mismo orden en que el programa original lo pedía.
   * ------------------------------------------------------------------ */
  var INT_RE = /^[+-]?\d+$/;
  var DBL_RE = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;

  function Scanner(values) {
    this.v = values || {};
  }
  Scanner.prototype.raw = function (name) {
    var x = this.v[name];
    return x === undefined || x === null ? '' : String(x);
  };
  Scanner.prototype.hasNextInt = function (name) {
    return INT_RE.test(this.raw(name).trim());
  };
  Scanner.prototype.nextInt = function (name) {
    var raw = this.raw(name).trim();
    if (!INT_RE.test(raw)) throw InputMismatchException();
    var n = parseInt(raw, 10);
    if (n > 2147483647 || n < -2147483648) throw InputMismatchException();
    return n;
  };
  Scanner.prototype.nextDouble = function (name) {
    var raw = this.raw(name).trim().replace(',', '.');
    if (!DBL_RE.test(raw)) throw InputMismatchException();
    return parseFloat(raw);
  };
  Scanner.prototype.next = function (name) {
    var t = this.raw(name).trim().split(/\s+/);
    return t[0] || '';
  };
  Scanner.prototype.nextLine = function (name) {
    return this.raw(name);
  };
  /* Integer.parseInt(reader.readLine()) — lanza NumberFormatException */
  Scanner.prototype.parseInt = function (name) {
    var raw = this.raw(name).trim();
    if (!INT_RE.test(raw)) throw NumberFormatException(raw);
    return parseInt(raw, 10);
  };
  /* Lista de enteros separados por espacios, comas o saltos de línea. */
  Scanner.prototype.ints = function (name) {
    var toks = this.raw(name).trim().split(/[\s,]+/).filter(Boolean);
    return toks.map(function (t) {
      if (!INT_RE.test(t)) throw InputMismatchException();
      return parseInt(t, 10);
    });
  };
  /* Líneas no vacías, para las entradas tipo HackerRank. */
  Scanner.prototype.textLines = function (name) {
    return this.raw(name).split(/\r?\n/).map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s.length > 0;
    });
  };

  /* ------------------------------------------------------------------ *
   * Semántica numérica de Java
   * ------------------------------------------------------------------ */
  var J = {
    /* División entera: trunca hacia cero, no hacia -infinito. */
    idiv: function (a, b) {
      if (b === 0) throw ArithmeticException('/ by zero');
      return Math.trunc(a / b);
    },
    imod: function (a, b) {
      if (b === 0) throw ArithmeticException('/ by zero');
      return a % b;
    },
    /* Un double se imprime 20.0, no 20. */
    d: function (x) {
      if (!isFinite(x)) return x > 0 ? 'Infinity' : (x < 0 ? '-Infinity' : 'NaN');
      return Number.isInteger(x) ? x.toFixed(1) : String(x);
    },
    /* char c = 40; println(c) imprime el carácter, no el número. */
    chr: function (code) {
      return String.fromCharCode(code);
    },
    abs: Math.abs,
    min: Math.min,
    max: Math.max,
    sqrt: Math.sqrt,
    pow: Math.pow,
    format: javaFormat
  };

  /* ------------------------------------------------------------------ *
   * Catálogo
   * ------------------------------------------------------------------ */
  var CATALOG = [];
  function reg(ex) {
    CATALOG.push(ex);
  }

  function runExercise(ex, values) {
    var out = new Out();
    var sc = new Scanner(values);
    try {
      ex.run(out, sc, J);
    } catch (e) {
      if (e instanceof OutputLimit) {
        out.parts.push('\n[salida truncada: se alcanzó el límite de ' + MAX_LINES + ' líneas]');
      } else if (e instanceof JavaError) {
        out.parts.push((out.parts.length ? '\n' : '') + 'Exception in thread "main" ' + e.toString());
      } else {
        out.parts.push('\n[error inesperado] ' + (e && e.message ? e.message : String(e)));
      }
    }
    var txt = out.text();
    return txt.length ? txt : '(el programa no produjo salida)';
  }

  g.JLogic = {
    Out: Out,
    Scanner: Scanner,
    J: J,
    JavaError: JavaError,
    InputMismatchException: InputMismatchException,
    ArithmeticException: ArithmeticException,
    NumberFormatException: NumberFormatException,
    javaFormat: javaFormat,
    CATALOG: CATALOG,
    reg: reg,
    runExercise: runExercise,
    MAX_LINES: MAX_LINES
  };
  g.reg = reg;
})(window);
