/* Ciclos — src/B/EjericiosCiclos */
(function () {
  'use strict';
  var CAT = 'ciclos';
  var DIR = 'B/EjericiosCiclos/';

  reg({
    id: 'ciclo-1', cat: CAT, num: 1,
    title: 'Enteros del 1 al número leído',
    statement: 'Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.',
    file: DIR + 'Ejercicio1.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '10' }],
    run: function (out, sc, J) {
      out.println('1. Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.');
      out.println('Ingrese un número entero:');
      try {
        var entero = sc.nextInt('e');
        out.println('El número entero ingresado es : ' + entero);
        if (entero >= 1) {
          for (var i = 1; i <= entero; ++i) out.println(i);
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-2', cat: CAT, num: 2,
    title: 'Pares del 1 al número leído',
    statement: 'Leer un número entero y mostrar todos los pares comprendidos entre 1 y el número leído.',
    file: DIR + 'Ejercicio2.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '20' }],
    run: function (out, sc, J) {
      out.println('2. Leer un número entero y mostrar todos los pares comprendidos entre 1 y el número leído.');
      out.println('Ingrese un número entero:');
      try {
        var entero = sc.nextInt('e');
        out.println('El número entero ingresado es : ' + entero);
        if (entero >= 1) {
          for (var i = 1; i <= entero; ++i) {
            if (J.imod(i, 2) === 0) out.println(i);
          }
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-3', cat: CAT, num: 3,
    title: 'Divisores exactos',
    statement: 'Leer un número entero y mostrar todos los divisores exactos del número comprendidos entre 1 y el número leído.',
    file: DIR + 'Ejercicio3.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '36' }],
    run: function (out, sc, J) {
      out.println('3. Leer un número entero y mostrar todos los divisores exactos del número comprendidos entre 1 \ny el número leído.');
      out.println('Ingrese un número entero:');
      try {
        var entero = sc.nextInt('e');
        out.println('El número entero ingresado es : ' + entero);
        if (entero >= 1) {
          for (var divisor = 1; divisor <= entero; divisor++) {
            if (J.imod(entero, divisor) === 0) out.println(divisor);
          }
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-4', cat: CAT, num: 4,
    title: 'Enteros entre dos números',
    statement: 'Leer dos números y mostrar todos los enteros comprendidos entre ellos.',
    file: DIR + 'Ejercicio4.java',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '5' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '12' }
    ],
    run: function (out, sc, J) {
      out.println('4. Leer dos números y mostrar todos los enteros comprendidos entre ellos.');
      out.println('Ingrese dos números enteros:');
      try {
        var entero = sc.nextInt('e1');
        var entero1 = sc.nextInt('e2');
        out.println('El primer número entero ingresado es : ' + entero + ' el segundo número entero ingresado es : ' + entero1 + '.');
        if (entero !== entero1) {
          if (entero > entero1) {
            for (var i = 1; entero1 <= entero; i++) {
              out.println(entero1);
              entero1++;
            }
          } else {
            for (var k = 1; entero <= entero1; k++) {
              out.println(entero);
              entero++;
            }
          }
        } else {
          out.println('Los numeros son iguales.');
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero.');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-5', cat: CAT, num: 5,
    title: 'Terminados en 4 entre dos números',
    statement: 'Leer dos números y mostrar todos los números terminados en 4 comprendidos entre ellos.',
    file: DIR + 'Ejercicio5.java',
    note: 'Si el primer número es mayor que el segundo, el bucle de la rama else nunca se ejecuta y el programa no imprime nada: es el comportamiento del código original.',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '1' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '50' }
    ],
    run: function (out, sc, J) {
      out.println('5. Leer dos números y mostrar todos los números terminados en 4 comprendidos entre ellos.');
      out.println('Ingrese dos números enteros:');
      try {
        var entero = sc.nextInt('e1');
        var entero1 = sc.nextInt('e2');
        out.println('El primer número entero ingresado es : ' + entero + ' el segundo número entero ingresado es : ' + entero1 + '.');
        if (entero !== entero1) {
          if (entero < entero1) {
            for (var i = 1; entero <= entero1; i++) {
              if (J.imod(entero, 10) === 4) out.println(entero);
              entero++;
            }
          } else {
            for (var k = 1; entero <= entero1; k++) {
              out.println(entero);
              entero++;
            }
          }
        } else {
          out.println('Los numeros son iguales.');
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero.');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-6', cat: CAT, num: 6,
    title: 'Enteros hasta cada dígito',
    statement: 'Leer un número entero de tres dígitos y mostrar todos los enteros comprendidos entre 1 y cada uno de los dígitos.',
    file: DIR + 'Ejercicio6.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '345' }],
    run: function (out, sc, J) {
      out.println('6.Leer un número entero de tres dígitos y mostrar todos los enteros comprendidos entre 1 y cada\nuno de los dígitos.');
      out.println('Ingrese un número entero:');
      var e1 = sc.nextInt('e1');
      if (e1 > 99 && e1 < 1000) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var centesima = J.idiv(dos, 10);
        out.println(e1);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        out.println(' ');
        for (var i = 1; i <= unidad; i++) out.println(i);
        out.println(' ');
        for (var j = 1; j <= decima; j++) out.println(j);
        out.println(' ');
        for (var k = 1; k <= centesima; k++) out.println(k);
        out.println(' ');
      } else {
        out.println('El numero no es de tres dígitos.');
      }
    }
  });

  reg({
    id: 'ciclo-7', cat: CAT, num: 7,
    title: 'Enteros del 1 al 100',
    statement: 'Mostrar en pantalla todos los enteros comprendidos entre 1 y 100.',
    file: DIR + 'Ejercicio7.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('7. Mostrar en pantalla todos los enteros comprendidos entre 1 y 100.');
      for (var i = 1; i <= 100; i++) out.print(i + ', ');
    }
  });

  reg({
    id: 'ciclo-8', cat: CAT, num: 8,
    title: 'Pares entre 20 y 200',
    statement: 'Mostrar en pantalla todos los pares comprendidos entre 20 y 200.',
    file: DIR + 'Ejercicio8.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('8. Mostrar en pantalla todos los pares comprendidos entre 20 y 200.');
      for (var i = 20; i <= 200; i++) {
        if (J.imod(i, 2) === 0) out.print(i + ', ');
      }
    }
  });

  reg({
    id: 'ciclo-9', cat: CAT, num: 9,
    title: 'Terminados en 6 entre 25 y 205',
    statement: 'Mostrar en pantalla todos los números terminados en 6 comprendidos entre 25 y 205.',
    file: DIR + 'Ejercicio9.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('9.Mostrar en pantalla todos los números terminados en 6 comprendidos entre 25 y 205.');
      for (var i = 25; i <= 205; i++) {
        if (J.imod(i, 10) === 6) out.print(i + ', ');
      }
    }
  });

  reg({
    id: 'ciclo-10', cat: CAT, num: 10,
    title: 'Suma de los enteros hasta N',
    statement: 'Leer un número entero y determinar a cuánto es igual la suma de todos los enteros comprendidos entre 1 y el número leído.',
    file: DIR + 'Ejercicio10.java',
    inputs: [{ name: 'num', label: 'Número entero', type: 'int', def: '100' }],
    run: function (out, sc, J) {
      out.println('10. Leer un número entero y determinar a cuánto es igual la suma de todos los enteros\ncomprendidos entre 1 y el número leído.');
      out.print('Ingrese un número entero: ');
      var num = sc.nextInt('num');
      out.println();
      var sum = 0;
      for (var i = 1; i <= num; i++) sum += i;
      out.println('La suma de todos los enteros comprendidos entre 1 y ' + num + ' es: ' + sum);
    }
  });

  reg({
    id: 'ciclo-11', cat: CAT, num: 11,
    title: 'Enteros entre un dígito y otro',
    statement: 'Leer un número entero de dos dígitos y mostrar en pantalla todos los enteros comprendidos entre un dígito y otro.',
    file: DIR + 'Ejercicio11.java',
    inputs: [{ name: 'e', label: 'Número de dos dígitos', type: 'int', def: '38' }],
    run: function (out, sc, J) {
      out.println('11. . Leer un número entero de dos dígitos y mostrar en pantalla todos los enteros comprendidos\nentre un dígito y otro.');
      out.print('Ingrese un número entero de dos dígitos: ');
      var entero = sc.nextInt('e');
      out.println();
      var enteroUnidad = J.imod(entero, 10);
      var enteroDecima = J.idiv(entero, 10);
      if (entero < 100 && entero > 9) {
        out.println('El numero tiene 2 digitos.');
        if (enteroUnidad > enteroDecima) {
          for (var i = enteroDecima; i <= enteroUnidad; i++) out.println(i);
        } else {
          for (var j = enteroUnidad; j <= enteroDecima; j++) out.println(j);
        }
      } else {
        out.println('El numero no tiene 2 digitos.');
      }
    }
  });

  reg({
    id: 'ciclo-12', cat: CAT, num: 12,
    title: 'Contiene el dígito 1',
    statement: 'Leer un número entero de 3 dígitos y determinar si tiene el dígito 1.',
    file: DIR + 'Ejercicio12.java',
    inputs: [{ name: 'e', label: 'Número de tres dígitos', type: 'int', def: '415' }],
    run: function (out, sc, J) {
      out.println('12. Leer un número entero de 3 dígitos y determinar si tiene el dígito 1.');
      out.print('Ingrese un número entero de tres dígitos: ');
      var entero = sc.nextInt('e');
      out.println();
      var unidad = J.imod(entero, 10);
      var dos = J.idiv(entero, 10);
      var decima = J.imod(dos, 10);
      var centesima = J.idiv(dos, 10);
      if (entero < 1000 && entero > 99) {
        out.println('El numero tiene 3 digitos.');
        if (unidad === 1 || decima === 1 || centesima === 1) out.println('El numero tiene el digito 1.');
        else out.println('El numero no tiene el digito 1.');
      } else {
        out.println('El numero no tiene 3 digitos.');
      }
    }
  });

  reg({
    id: 'ciclo-13', cat: CAT, num: 13,
    title: 'Múltiplos de 5 hasta N',
    statement: 'Leer un entero y mostrar todos los múltiplos de 5 comprendidos entre 1 y el número leído.',
    file: DIR + 'Ejercicio13.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '50' }],
    run: function (out, sc, J) {
      out.println('13. Leer un entero y mostrar todos los múltiplos de 5 comprendidos entre 1 y el número leído.');
      out.print('Ingrese un número entero: ');
      var entero = sc.nextInt('e');
      out.println();
      if (entero > 0) {
        for (var i = 1; i <= entero; i++) {
          if (J.imod(i, 5) === 0) out.println(i);
        }
      } else {
        out.println('El numero no es positivo.');
      }
    }
  });

  reg({
    id: 'ciclo-14', cat: CAT, num: 14,
    title: 'Primeros 20 múltiplos de 3',
    statement: 'Mostrar en pantalla los primeros 20 múltiplos de 3.',
    file: DIR + 'Ejercicio14.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('14. Mostrar en pantalla los primeros 20 múltiplos de 3.');
      out.print('Los primeros 20 multiplos de 3 son: ');
      for (var i = 1; i <= 20; i++) out.print(i * 3 + ' ');
    }
  });

  reg({
    id: 'ciclo-15', cat: CAT, num: 15,
    title: 'Suma de los 20 múltiplos de 3',
    statement: 'Escribir en pantalla el resultado de sumar los primeros 20 múltiplos de 3.',
    file: DIR + 'Ejercicio15.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('15. Escribir en pantalla el resultado de sumar los primeros 20 múltiplos de 3.');
      out.print('Los primeros 20 multiplos de 3 son: ');
      var suma = 0;
      for (var i = 1; i <= 20; i++) {
        out.print(i * 3 + ' ');
        suma = suma + i * 3;
      }
      out.println('\nLa suma de los primeros 20 multiplos de 3 es: ' + suma);
    }
  });

  reg({
    id: 'ciclo-primo', cat: CAT, num: 16,
    title: 'Determinar si un número es primo',
    statement: 'Método esPrimo() recorrido con un ciclo: devuelve true o false para el número leído.',
    file: DIR + 'EjercicioNumeroPrimo.java',
    note: 'El enunciado que imprime es una copia del ejercicio 1. Además esPrimo() devuelve true para 2, 3 y para cualquier negativo, porque el bucle no llega a ejecutarse.',
    inputs: [{ name: 'n', label: 'Número entero', type: 'int', def: '29' }],
    run: function (out, sc, J) {
      function esPrimo(n) {
        if (n === 0 || n === 1 || n === 4) return false;
        for (var i = 2; i < n; i++) {
          if (J.imod(n, i) === 0) return false;
        }
        return true;
      }
      out.println('1. Leer un número entero y mostrar todos los enteros comprendidos entre 1 y el número leído.');
      out.println('Ingrese un número entero:');
      try {
        var n = sc.nextInt('n');
        esPrimo(n);
        out.println(esPrimo(n));
      } catch (e) {
        if (e instanceof JLogic.JavaError) out.println('No es un número entero');
        else throw e;
      }
    }
  });

  reg({
    id: 'ciclo-primo-util', cat: CAT, num: 17,
    title: 'seraPrimo(): clase de utilidad',
    statement: 'Clase auxiliar con el método seraPrimo(int). No tiene main: es solo la utilidad que reutilizan otros ejercicios.',
    file: DIR + 'EjercicioPrimo.java',
    note: 'El archivo original no tiene main, así que no es ejecutable por sí solo. Aquí se añadió una llamada al método para poder probarlo.',
    inputs: [{ name: 'n', label: 'Número entero', type: 'int', def: '97' }],
    run: function (out, sc, J) {
      function seraPrimo(n) {
        if (n === 0 || n === 1 || n === 4) return false;
        for (var i = 2; i < n; i++) {
          if (J.imod(n, i) === 0) return false;
        }
        return true;
      }
      var n = sc.nextInt('n');
      out.println('seraPrimo(' + n + ") = " + seraPrimo(n));
    }
  });
})();
