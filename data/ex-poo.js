/* Programación orientada a objetos — src/EjerciciosPOO */
(function () {
  'use strict';
  var CAT = 'poo';
  var DIR = 'EjerciciosPOO/';

  reg({
    id: 'poo-seleccion', cat: CAT, num: 1,
    title: 'Selección de fútbol: herencia',
    statement: 'Una clase base SeleccionFutbol con id, nombre, apellidos y edad, y tres clases que la extienden: Futbolista, Entrenador y Masajista. Cada una añade sus propios atributos y comportamientos.',
    file: DIR + 'Main.java',
    extraFiles: [
      DIR + 'SeleccionFutbol.java',
      DIR + 'Futbolista.java',
      DIR + 'Entrenador.java',
      DIR + 'Masajista.java'
    ],
    note: 'El constructor de SeleccionFutbol recibe los cuatro parámetros pero tiene el cuerpo vacío: no asigna nada. Por eso los datos solo aparecen cuando Main los vuelve a fijar con los setters de Lombok.',
    inputs: [],
    run: function (out, sc, J) {
      function SeleccionFutbol(id, nombre, apellidos, edad) {
        /* El constructor original está vacío: no asigna los parámetros. */
      }
      SeleccionFutbol.prototype.setId = function (id) { this.id = id; };
      SeleccionFutbol.prototype.getId = function () { return this.id; };
      SeleccionFutbol.prototype.concentrarse = function () { out.println('Concentrarse'); };
      SeleccionFutbol.prototype.viajar = function () { out.println('Viajar'); };

      function extiende(Hija) {
        Hija.prototype = Object.create(SeleccionFutbol.prototype);
        Hija.prototype.constructor = Hija;
        return Hija;
      }

      var Futbolista = extiende(function (id, nombre, apellidos, edad, dorsal, demarcacion) {
        SeleccionFutbol.call(this, id, nombre, apellidos, edad);
        this.dorsal = dorsal;
        this.demarcacion = demarcacion;
      });
      Futbolista.prototype.entrenar = function () { out.println('Entrenar'); };
      Futbolista.prototype.jugarPartido = function () { out.println('Jugar Partido'); };

      var Entrenador = extiende(function (id, nombre, apellidos, edad, idFederacion) {
        SeleccionFutbol.call(this, id, nombre, apellidos, edad);
        this.idFederacion = idFederacion;
      });
      Entrenador.prototype.dirigirPartido = function () { out.println('Dirigir Partido'); };
      Entrenador.prototype.dirigirEntrenamiento = function () { out.println('Dirigir Entrenamiento'); };

      var Masajista = extiende(function (id, nombre, apellidos, edad, titulacion, aniosExperiencia) {
        SeleccionFutbol.call(this, id, nombre, apellidos, edad);
        this.titulacion = titulacion;
        this.aniosExperiencia = aniosExperiencia;
      });
      Masajista.prototype.darMasaje = function () { out.println('Dar Masaje'); };
      Masajista.prototype.setTitulacion = function (t) { this.titulacion = t; };
      Masajista.prototype.getTitulacion = function () { return this.titulacion; };
      Masajista.prototype.setAniosExperiencia = function (a) { this.aniosExperiencia = a; };
      Masajista.prototype.getAniosExperiencia = function () { return this.aniosExperiencia; };

      /* ---- Main.main() ---- */
      out.println('Hola Mundo!');

      var futbolista1 = new Futbolista(1, 'Juan', 'Perez', 25, 1, 'Delantero');
      out.println('Datos del futbolista');
      futbolista1.setId(1);
      futbolista1.concentrarse();
      futbolista1.jugarPartido();
      futbolista1.viajar();

      var entrenador1 = new Entrenador(2, 'Pedro', 'Gomez', 35, 1);
      out.println('Datos del entrenador');
      entrenador1.setId(2);
      entrenador1.concentrarse();
      entrenador1.dirigirEntrenamiento();
      entrenador1.dirigirPartido();
      entrenador1.viajar();

      var masajista1 = new Masajista(3, 'Ana', 'Gomez', 30, 'Licenciada en Fisioterapia', 10);
      out.println('Datos de la masajista');
      masajista1.setId(3);
      masajista1.setTitulacion('Licenciada en Fisioterapia');
      masajista1.setAniosExperiencia(10);
      out.println('Id: ' + masajista1.getId());
      out.println('Titulación: ' + masajista1.getTitulacion());
      out.println('Años de experiencia: ' + masajista1.getAniosExperiencia());
      masajista1.concentrarse();
      masajista1.darMasaje();
      masajista1.viajar();
    }
  });
})();
