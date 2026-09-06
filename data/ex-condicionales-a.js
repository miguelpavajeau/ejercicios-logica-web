/* Condicionales 1–20 — src/A/EjerciciosCondicionales */
(function () {
  'use strict';
  var CAT = 'condicionales';
  var DIR = 'A/EjerciciosCondicionales/';

  reg({
    id: 'cond-1', cat: CAT, num: 1,
    title: 'Número terminado en 4',
    statement: 'Leer un número entero y determinar si es un número terminado en 4.',
    file: DIR + 'Ejercicio1.java',
    inputs: [{ name: 'entero', label: 'Número entero', type: 'int', def: '24' }],
    run: function (out, sc, J) {
      out.println('1.Leer un número entero y determinar si es un número terminado en 4.');
      out.println('Ingrese un número entero:');
      var entero = 0;
      try {
        entero = sc.nextInt('entero');
      } catch (e) {
        out.println('No es un número entero.');
        return; // System.exit(0)
      }
      var residuo = J.imod(entero, 10);
      if (residuo === 4) out.println('El número termina en 4.');
      else out.println('El número no termina en 4.');
    }
  });

  reg({
    id: 'cond-2', cat: CAT, num: 2,
    title: 'Tiene 3 dígitos',
    statement: 'Leer un número entero y determinar si tiene 3 dígitos.',
    file: DIR + 'Ejercicio2.java',
    inputs: [{ name: 'entero', label: 'Número entero', type: 'int', def: '345' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero y determinar si tiene 3 dígitos.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if (entero > 99 && entero < 1000) out.println('Si es un número de 3 digitos.');
      else out.println('No es un número de 3 digitos.');
    }
  });

  reg({
    id: 'cond-3', cat: CAT, num: 3,
    title: 'Es negativo',
    statement: 'Leer un número entero y determinar si es negativo.',
    file: DIR + 'Ejercicio3.java',
    inputs: [{ name: 'entero', label: 'Número entero', type: 'int', def: '-17' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero y determinar si es negativo.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if (entero < 0) out.println('Si es un número negativo.');
      else out.println('No es un número negativo');
    }
  });

  reg({
    id: 'cond-4', cat: CAT, num: 4,
    title: 'Suma de dos dígitos',
    statement: 'Leer un número entero de dos dígitos y determinar a cuánto es igual la suma de sus dígitos.',
    file: DIR + 'Ejercicio4.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '47' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar a cuánto es igual la suma de sus dígitos.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Si es un número de dos dígitos.');
        var sumaDigitos = J.imod(entero, 10) + J.idiv(entero, 10);
        out.println('La suma de los digitos es ' + sumaDigitos);
      } else {
        out.println('No es un número de dos dígitos');
      }
    }
  });

  reg({
    id: 'cond-5', cat: CAT, num: 5,
    title: 'Ambos dígitos pares',
    statement: 'Leer un número entero de dos dígitos y determinar si ambos dígitos son pares.',
    file: DIR + 'Ejercicio5.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '48' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar si ambos dígitos son pares');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Si es un número de dos dígitos.');
        var enteroUnidad = J.imod(entero, 10);
        var enteroDecima = J.idiv(entero, 10);
        var modUnidad = J.imod(enteroUnidad, 2);
        var modDecima = J.imod(enteroDecima, 2);
        out.println(modDecima);
        out.println(modUnidad);
        if (modDecima === 0 && modUnidad === 0) {
          out.println(enteroDecima + ' y ' + enteroUnidad + ' son numeros pares.');
        } else {
          out.println('Ambos digitos no son pares.');
        }
      } else {
        out.println('No es un número de dos dígitos');
      }
    }
  });

  reg({
    id: 'cond-6', cat: CAT, num: 6,
    title: 'Primo menor que 20',
    statement: 'Leer un número entero de dos dígitos menor que 20 y determinar si es primo.',
    file: DIR + 'Ejercicio6.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos menor que 20', type: 'int', def: '17' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos menor que 20 y determinar si es primo.');
      out.println('Ingrese un número entero de dos dígitos menor que 20:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if (entero > 9 && entero < 20) {
        out.println('Si es un número de dos dígitos menor que 20.');
        if (entero === 11 || entero === 13 || entero === 17 || entero === 19) {
          out.println('Si es un numero primo');
        } else {
          out.println(entero + ' no es un numero primo.');
        }
      } else {
        out.println('No es un número de dos dígitos');
      }
    }
  });

  var PRIMOS_2D = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    -11, -13, -17, -19, -23, -29, -31, -37, -41, -43, -47, -53, -59, -61, -67, -71, -73, -79, -83, -89, -97];
  var PRIMOS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    -2, -3, -5, -7, -11, -13, -17, -19, -23, -29, -31, -37, -41, -43, -47, -53, -59, -61, -67, -71, -73, -79, -83, -89, -97];

  reg({
    id: 'cond-7', cat: CAT, num: 7,
    title: 'Primo y negativo',
    statement: 'Leer un número entero de dos dígitos y determinar si es primo y además si es negativo.',
    file: DIR + 'Ejercicio7.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '-37' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar si es primo y ademas si es negativo.');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Es un número de dos dígitos');
        if (PRIMOS_2D.indexOf(entero) >= 0) out.println('Es primo');
        else out.println(entero + ' no es un primo.');
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos digitos ya sea negativo o positivo');
      }
      if (entero <= 0) out.println('Es un número negativo.');
    }
  });

  reg({
    id: 'cond-8', cat: CAT, num: 8,
    title: 'Sus dos dígitos son primos',
    statement: 'Leer un número entero de dos dígitos y determinar si sus dos dígitos son primos.',
    file: DIR + 'Ejercicio8.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '35' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar si sus dos dígitos son primos.');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Es un número de dos dígitos');
        var enteroUnidad = J.imod(entero, 10);
        var enteroDecima = J.idiv(entero, 10);
        if (PRIMOS.indexOf(enteroUnidad) >= 0 && PRIMOS.indexOf(enteroDecima) >= 0) {
          out.println('Ambos digitos son primos');
        } else {
          out.println('Ambos digitos no son primos.');
        }
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos digitos ya sea negativo o positivo');
      }
      if (entero <= 0) out.println('Es un número negativo.');
    }
  });

  reg({
    id: 'cond-9', cat: CAT, num: 9,
    title: 'Un dígito múltiplo del otro',
    statement: 'Leer un número entero de dos dígitos y determinar si un dígito es múltiplo del otro.',
    file: DIR + 'Ejercicio9.java',
    note: 'Si el dígito de las unidades es 0, la división entre cero lanza ArithmeticException — igual que en Java. Prueba con 40.',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '84' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar si un dígito es múltiplo del otro.');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Es un número de dos dígitos');
        var enteroUnidad = J.imod(entero, 10);
        var enteroDecima = J.idiv(entero, 10);
        var resultadoMod = J.imod(enteroDecima, enteroUnidad);
        if (resultadoMod === 0) {
          out.println('El digito ubicado en las decimas es multilplo de digito ubicado en las unidades.');
        } else {
          out.println('Los digitos no son multiplos.');
        }
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos digitos ya sea negativo o positivo');
      }
      if (entero <= 0) out.println('Es un número negativo.');
    }
  });

  reg({
    id: 'cond-10', cat: CAT, num: 10,
    title: 'Los dos dígitos son iguales',
    statement: 'Leer un número entero de dos dígitos y determinar si los dos dígitos son iguales.',
    file: DIR + 'Ejercicio10.java',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '77' }],
    run: function (out, sc, J) {
      out.println('Leer un número entero de dos dígitos y determinar si los dos dígitos son iguales.');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Es un número de dos dígitos');
        var enteroUnidad = J.imod(entero, 10);
        var enteroDecima = J.idiv(entero, 10);
        if (enteroDecima === enteroUnidad) out.println('Ambos dígitos son iguales.');
        else out.println('Los dígitos son distintos.');
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
      if (entero <= 0) out.println('Es un número negativo.');
    }
  });

  reg({
    id: 'cond-11', cat: CAT, num: 11,
    title: 'Cuál dígito es mayor',
    statement: 'Leer dos números enteros y determinar cuál es el mayor.',
    file: DIR + 'Ejercicio11.java',
    note: 'El enunciado pide comparar dos números, pero el código compara los dos dígitos de un solo número. Se conserva tal cual está en el repositorio.',
    inputs: [{ name: 'entero', label: 'Número de dos dígitos', type: 'int', def: '73' }],
    run: function (out, sc, J) {
      out.println('Leer dos números enteros y determinar cuál es el mayor.');
      out.println('Ingrese un número entero de dos dígitos:');
      var entero = sc.nextInt('entero');
      out.println(entero);
      if ((entero < -9 && entero > -100) || (entero > 9 && entero < 100)) {
        out.println('Es un número de dos dígitos');
        var enteroUnidad = J.imod(entero, 10);
        var enteroDecima = J.idiv(entero, 10);
        if (enteroDecima > enteroUnidad) out.println('El primer digito es mayor que el segundo.');
        else if (enteroDecima === enteroUnidad) out.println('Los dígitos son iguales.');
        else out.println('El segundo digito es mayor que el primero.');
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
      if (entero <= 0) out.println('Es un número negativo.');
    }
  });

  reg({
    id: 'cond-12', cat: CAT, num: 12,
    title: 'Dígitos comunes',
    statement: 'Leer dos números enteros de dos dígitos y determinar si tienen dígitos comunes.',
    file: DIR + 'Ejercicio12.java',
    inputs: [
      { name: 'e1', label: 'Primer número de dos dígitos', type: 'int', def: '34' },
      { name: 'e2', label: 'Segundo número de dos dígitos', type: 'int', def: '43' }
    ],
    run: function (out, sc, J) {
      out.println('12.Leer dos números enteros de dos digitos y determinar si tiene digitos comunes.');
      out.println('Ingrese el primer número entero de dos dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      out.println('Ingrese el segundo número entero de dos dígitos:');
      var entero2 = sc.nextInt('e2');
      out.println(entero2);
      var ok1 = (entero1 < -9 && entero1 > -100) || (entero1 > 9 && entero1 < 100);
      var ok2 = (entero2 < -9 && entero2 > -100) || (entero2 > 9 && entero2 < 100);
      if (ok1 && ok2) {
        out.println('Ambos numeros son de dos dígitos');
        var u1 = J.imod(entero1, 10), d1 = J.idiv(entero1, 10);
        var u2 = J.imod(entero2, 10), d2 = J.idiv(entero2, 10);
        if (d1 === u2 || d2 === u1 || d2 === d1 || u1 === u2) {
          out.println('Los numeros tiene digitos comunes');
        } else {
          out.println('Los dos numeros no tienen digitos comunes');
        }
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-13', cat: CAT, num: 13,
    title: 'La suma es par',
    statement: 'Leer dos números enteros de dos dígitos y determinar si la suma de los dos números origina un número par.',
    file: DIR + 'Ejercicio13.java',
    inputs: [
      { name: 'e1', label: 'Primer número de dos dígitos', type: 'int', def: '24' },
      { name: 'e2', label: 'Segundo número de dos dígitos', type: 'int', def: '36' }
    ],
    run: function (out, sc, J) {
      out.println('13.Leer dos números enteros de dos dígitos y determinar si la suma de los dos números origina\nun número par.');
      out.println('Ingrese el primer número entero de dos dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      out.println('Ingrese el segundo número entero de dos dígitos:');
      var entero2 = sc.nextInt('e2');
      out.println(entero2);
      var ok1 = (entero1 < -9 && entero1 > -100) || (entero1 > 9 && entero1 < 100);
      var ok2 = (entero2 < -9 && entero2 > -100) || (entero2 > 9 && entero2 < 100);
      if (ok1 && ok2) {
        out.println('Ambos numeros son de dos dígitos');
        var sumaEnteros = entero1 + entero2;
        var par = J.imod(sumaEnteros, 2);
        out.println(par);
        if (par === 0) out.println('Los suma de los dos numeros es un numero par');
        else out.println('Los suma de los dos numeros NO es un numero par');
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-14', cat: CAT, num: 14,
    title: 'Suma de todos los dígitos',
    statement: 'Leer dos números enteros de dos dígitos y determinar a cuánto es igual la suma de todos los dígitos.',
    file: DIR + 'Ejercicio14.java',
    inputs: [
      { name: 'e1', label: 'Primer número de dos dígitos', type: 'int', def: '25' },
      { name: 'e2', label: 'Segundo número de dos dígitos', type: 'int', def: '68' }
    ],
    run: function (out, sc, J) {
      out.println('14.Leer dos números enteros de dos dígitos y determinar a cuánto es igual la suma de todos los\ndígitos.');
      out.println('Ingrese el primer número entero de dos dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      out.println('Ingrese el segundo número entero de dos dígitos:');
      var entero2 = sc.nextInt('e2');
      out.println(entero2);
      var ok1 = (entero1 < -9 && entero1 > -100) || (entero1 > 9 && entero1 < 100);
      var ok2 = (entero2 < -9 && entero2 > -100) || (entero2 > 9 && entero2 < 100);
      if (ok1 && ok2) {
        out.println('Ambos numeros son de dos dígitos');
        var suma = J.imod(entero1, 10) + J.idiv(entero1, 10) + J.idiv(entero2, 10) + J.imod(entero2, 10);
        out.println('Los suma de todos los digitos es ' + suma + '.');
      } else {
        out.println('No es un número de dos dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-15', cat: CAT, num: 15,
    title: 'Suma de tres dígitos',
    statement: 'Leer un número entero de tres dígitos y determinar a cuánto es igual la suma de sus dígitos.',
    file: DIR + 'Ejercicio15.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '472' }],
    run: function (out, sc, J) {
      out.println('15.Leer un número entero de tres dígitos y determinar a cuánto es igual la suma de sus dígitos.');
      out.println('Ingrese el número de 3 dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      if ((entero1 < -99 && entero1 > -1000) || (entero1 > 99 && entero1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(entero1, 10);
        var dosDigitos = J.idiv(entero1, 10);
        var decima = J.imod(dosDigitos, 10);
        var centesima = J.idiv(dosDigitos, 10);
        out.println(unidad);
        out.println(dosDigitos);
        out.println(decima);
        out.println(centesima);
        out.println('Los suma de todos los digitos es ' + (unidad + decima + centesima) + '.');
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-16', cat: CAT, num: 16,
    title: 'Al menos dos dígitos iguales',
    statement: 'Leer un número entero de tres dígitos y determinar si al menos dos de sus tres dígitos son iguales.',
    file: DIR + 'Ejercicio16.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '525' }],
    run: function (out, sc, J) {
      out.println('16.Leer un número entero de tres dígitos y determinar si al menos dos de sus tres dígitos son\niguales.');
      out.println('Ingrese el número de 3 dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      if ((entero1 < -99 && entero1 > -1000) || (entero1 > 99 && entero1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(entero1, 10);
        var dosDigitos = J.idiv(entero1, 10);
        var decima = J.imod(dosDigitos, 10);
        var centesima = J.idiv(dosDigitos, 10);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        if (unidad === decima || unidad === centesima || decima === centesima) {
          out.println('Dos de sus tres digítos son iguales');
        } else {
          out.println('Dos de sus tres digítos NO son iguales');
        }
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-17', cat: CAT, num: 17,
    title: 'Posición del mayor dígito',
    statement: 'Leer un número entero de tres dígitos y determinar en qué posición está el mayor dígito.',
    file: DIR + 'Ejercicio17.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '491' }],
    run: function (out, sc, J) {
      out.println('17.Leer un número entero de tres dígitos y determinar en qué posición está el mayor dígito');
      out.println('Ingrese el número de 3 dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      if ((entero1 < -99 && entero1 > -1000) || (entero1 > 99 && entero1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(entero1, 10);
        var dosDigitos = J.idiv(entero1, 10);
        var decima = J.imod(dosDigitos, 10);
        var centesima = J.idiv(dosDigitos, 10);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        if (unidad >= decima && unidad >= centesima) {
          out.println('El digito mayor esta ubicado en la posición de las unidades.');
        } else if (decima >= unidad && decima >= centesima) {
          out.println('El digito mayor esta ubicado en la posición de las decimas.');
        } else if (centesima >= unidad && centesima >= decima) {
          out.println('El digito mayor esta ubicado en la posición de las centisimas.');
        } else {
          out.println('No hay un digito mayor que los otros');
        }
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-18', cat: CAT, num: 18,
    title: 'Dígito múltiplo de los otros',
    statement: 'Leer un número entero de tres dígitos y determinar si algún dígito es múltiplo de los otros.',
    file: DIR + 'Ejercicio18.java',
    note: 'Si alguno de los dígitos es 0, la división entre cero lanza ArithmeticException — igual que en Java. Prueba con 402.',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '248' }],
    run: function (out, sc, J) {
      out.println('18.Leer un número entero de tres dígitos y determinar si algún dígito es múltiplo de los otros.');
      out.println('Ingrese el número de 3 dígitos:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      if ((entero1 < -99 && entero1 > -1000) || (entero1 > 99 && entero1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(entero1, 10);
        var dosDigitos = J.idiv(entero1, 10);
        var decima = J.imod(dosDigitos, 10);
        var centesima = J.idiv(dosDigitos, 10);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        if ((J.imod(unidad, decima) === 0 && J.imod(unidad, centesima) === 0) ||
          (J.imod(decima, centesima) === 0 && J.imod(decima, unidad) === 0) ||
          (J.imod(centesima, unidad) === 0 && J.imod(centesima, decima) === 0)) {
          out.println('Uno de los dígitos es múltiplo de los otros dígitos.');
        } else {
          out.println('Ninguno de los digitos es multiplo de los otros digitos');
        }
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-19', cat: CAT, num: 19,
    title: 'Mayor de tres con dos variables',
    statement: 'Leer tres números enteros y determinar cuál es el mayor. Usar solamente dos variables.',
    file: DIR + 'Ejercicio19.java',
    inputs: [
      { name: 'e1', label: 'Primer número', type: 'int', def: '14' },
      { name: 'e2', label: 'Segundo número', type: 'int', def: '92' },
      { name: 'e3', label: 'Tercer número', type: 'int', def: '57' }
    ],
    run: function (out, sc, J) {
      out.println('19.Leer tres números enteros y determinar cuál es el mayor. Usar solamente dos variables.');
      out.println('Ingrese un número:');
      var entero1 = sc.nextInt('e1');
      out.println(entero1);
      out.println('Ingrese un número entero:');
      var entero2 = sc.nextInt('e2');
      out.println(entero2);
      if (entero1 >= entero2) {
        out.println('Ingrese un número entero:');
        entero2 = sc.nextInt('e3');
        if (entero1 >= entero2) out.println('El numero mayor es ' + entero1 + '.');
        else out.println('El numero mayor es ' + entero2 + '.');
      } else if (entero2 >= entero1) {
        out.println('Ingrese un número entero:');
        entero1 = sc.nextInt('e3');
        if (entero2 >= entero1) out.println('El numero mayor es ' + entero2 + '.');
        else out.println('El numero mayor es ' + entero1 + '.');
      }
    }
  });

  reg({
    id: 'cond-20', cat: CAT, num: 20,
    title: 'Tres números ascendentes',
    statement: 'Leer tres números enteros y mostrarlos ascendentemente.',
    file: DIR + 'Ejercicio20.java',
    inputs: [
      { name: 'e1', label: 'Primer número', type: 'int', def: '45' },
      { name: 'e2', label: 'Segundo número', type: 'int', def: '12' },
      { name: 'e3', label: 'Tercer número', type: 'int', def: '33' }
    ],
    run: function (out, sc, J) {
      out.println('20.Leer tres números enteros y mostrarlos ascendentemente.');
      out.println('Ingrese un número:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      out.println('Ingrese un número entero:');
      var e2 = sc.nextInt('e2');
      out.println(e2);
      out.println('Ingrese un número entero:');
      var e3 = sc.nextInt('e3');
      out.println(e3);
      var p = 'Los números ordenados ascendentemente son ';
      if (e1 >= e2 && e1 >= e3) {
        if (e2 >= e3) out.println(p + e3 + ', ' + e2 + ' y ' + e1 + '.');
        else out.println(p + e2 + ', ' + e3 + ' y ' + e1 + '.');
      } else if (e2 >= e1 && e2 >= e3) {
        if (e1 >= e3) out.println(p + e3 + ', ' + e1 + ' y ' + e2 + '.');
        else out.println(p + e1 + ', ' + e3 + ' y ' + e2 + '.');
      } else {
        if (e2 >= e1) out.println(p + e1 + ', ' + e2 + ' y ' + e3 + '.');
        else out.println(p + e2 + ', ' + e1 + ' y ' + e3 + '.');
      }
    }
  });
})();
