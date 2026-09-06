/* Condicionales 21–41 y ejercicios sueltos — src/A/EjerciciosCondicionales */
(function () {
  'use strict';
  var CAT = 'condicionales';
  var DIR = 'A/EjerciciosCondicionales/';

  reg({
    id: 'cond-21', cat: CAT, num: 21,
    title: 'En cuál está el mayor dígito',
    statement: 'Leer tres números enteros de dos dígitos cada uno y determinar en cuál de ellos se encuentra el mayor dígito.',
    file: DIR + 'Ejercicio21.java',
    inputs: [
      { name: 'e1', label: 'Primer número de dos dígitos', type: 'int', def: '34' },
      { name: 'e2', label: 'Segundo número de dos dígitos', type: 'int', def: '81' },
      { name: 'e3', label: 'Tercer número de dos dígitos', type: 'int', def: '56' }
    ],
    run: function (out, sc, J) {
      out.println('21.Leer tres números enteros de dos dígitos cada uno y determinar en cuál de ellos se encuentra el mayor dígito.');
      out.println('Ingrese un número entero:');
      var mayor1, mayor2, mayor3;
      var e1 = sc.nextInt('e1');
      out.println(e1);
      var u1 = J.imod(e1, 10), d1 = J.idiv(e1, 10);
      out.println(u1); out.println(d1);
      mayor1 = u1 >= d1 ? u1 : d1;
      out.println('Ingrese un número entero:');
      var e2 = sc.nextInt('e2');
      out.println(e2);
      var u2 = J.imod(e2, 10), d2 = J.idiv(e2, 10);
      out.println(u2); out.println(d2);
      mayor2 = u2 >= d2 ? u2 : d2;
      out.println('Ingrese un número entero:');
      var e3 = sc.nextInt('e3');
      out.println(e3);
      var u3 = J.imod(e3, 10), d3 = J.idiv(e3, 10);
      out.println(u3); out.println(d3);
      mayor3 = u3 >= d3 ? u3 : d3;
      if (mayor1 >= mayor2) {
        if (mayor1 >= mayor3) out.println('El digito mayor esta en el primer número entero.');
        else out.println('El digito mayor esta en el tercer número entero.');
      } else {
        if (mayor2 >= mayor3) out.println('El digito mayor esta en el segundo número entero.');
        else out.println('El digito mayor esta en el tercer número entero.');
      }
    }
  });

  reg({
    id: 'cond-22', cat: CAT, num: 22,
    title: 'Primer dígito igual al último',
    statement: 'Leer un número entero de tres dígitos y determinar si el primer dígito es igual al último.',
    file: DIR + 'Ejercicio22.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '323' }],
    run: function (out, sc, J) {
      out.println('22.Leer un número entero de tres dígitos y determinar si el primer dígito es igual al último.');
      out.println('Ingrese un número entero de tres dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if ((e1 < -99 && e1 > -1000) || (e1 > 99 && e1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var centesima = J.idiv(dos, 10);
        if (unidad === centesima) {
          out.println('Los dígitos ubicados en la posicion de las unidades y las centisimas son iguales.');
        } else {
          out.println('Los dígitos ubicados en la posicion de las unidades y las centisimas son distintos.');
        }
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de tres dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-23', cat: CAT, num: 23,
    title: 'Cuántos dígitos primos tiene',
    statement: 'Leer un número entero de tres dígitos y determinar cuántos dígitos primos tiene.',
    file: DIR + 'Ejercicio23.java',
    note: 'La lista de dígitos primos del original incluye el 9, que no es primo. Se conserva el comportamiento tal cual está en el repositorio.',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '235' }],
    run: function (out, sc, J) {
      out.println('23.Leer un número entero de tres dígitos y determinar cuántos dígitos primos tiene.');
      var digitosPrimos = [2, 3, 5, 7, 9];
      out.println('Ingrese un número entero de tres dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if ((e1 < -99 && e1 > -1000) || (e1 > 99 && e1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var centesima = J.idiv(dos, 10);
        var contador = 0;
        if (digitosPrimos.indexOf(unidad) >= 0) contador++;
        if (digitosPrimos.indexOf(decima) >= 0) contador++;
        if (digitosPrimos.indexOf(centesima) >= 0) contador++;
        out.println('La cantidad de números primos es: ' + contador);
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-24', cat: CAT, num: 24,
    title: 'Cuántos dígitos pares tiene',
    statement: 'Leer un número entero de tres dígitos y determinar cuántos dígitos pares tiene.',
    file: DIR + 'Ejercicio24.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos', type: 'int', def: '246' }],
    run: function (out, sc, J) {
      out.println('24.Leer un número entero de tres dígitos y determinar cuántos dígitos pares tiene.');
      out.println('Ingrese un número entero de tres dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if ((e1 < -99 && e1 > -1000) || (e1 > 99 && e1 < 1000)) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var centesima = J.idiv(dos, 10);
        var contadorPares = 0;
        if (J.imod(unidad, 2) === 0) contadorPares++;
        if (J.imod(decima, 2) === 0) contadorPares++;
        if (J.imod(centesima, 2) === 0) contadorPares++;
        out.println('La cantidad de números pares es: ' + contadorPares);
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-25', cat: CAT, num: 25,
    title: 'Dígito igual a la suma de los otros',
    statement: 'Leer un número entero de tres dígitos y determinar si alguno de sus dígitos es igual a la suma de los otros dos.',
    file: DIR + 'Ejercicio25.java',
    inputs: [{ name: 'e1', label: 'Número de tres dígitos (positivo)', type: 'int', def: '347' }],
    run: function (out, sc, J) {
      out.println('25.Leer un número entero de tres dígitos y determinar si alguno de sus dígitos es igual a la suma de los otros dos.');
      out.println('Ingrese un número entero de tres dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if (e1 > 99 && e1 < 1000) {
        out.println('El numero es de tres dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var centesima = J.idiv(dos, 10);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        var p = 'El numero tiene un digito igual a la suma de los otros dos y es: ';
        if (unidad === decima + centesima) out.println(p + unidad + ' .');
        else if (decima === unidad + centesima) out.println(p + decima + ' .');
        else if (centesima === unidad + decima) out.println(p + centesima + ' .');
        else out.println('El numero no tiene un digito igual a la suma de los otros dos.');
      } else {
        out.println('No es un número de tres dígitos, ingrese un numero de dos dígitos ya sea negativo o positivo');
      }
    }
  });

  reg({
    id: 'cond-26', cat: CAT, num: 26,
    title: 'Suma de cuatro dígitos',
    statement: 'Leer un número entero de cuatro dígitos y determinar a cuánto es igual la suma de sus dígitos.',
    file: DIR + 'Ejercicio26.java',
    note: 'El original no tiene rama else: si el número no es de cuatro dígitos, el programa termina sin decir nada.',
    inputs: [{ name: 'e1', label: 'Número de cuatro dígitos', type: 'int', def: '4826' }],
    run: function (out, sc, J) {
      out.println('26.Leer un número entero de cuatro dígitos y determinar a cuanto es igual la suma de sus dígitos.');
      out.println('Ingrese un número entero de cuatro dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if (e1 > 999 && e1 < 10000) {
        out.println('El numero es de cuatro dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var cm = J.idiv(dos, 10);
        var centesima = J.imod(cm, 10);
        var milesima = J.idiv(cm, 10);
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        out.println(milesima);
        out.println('La suma de los dígitos es: ' + (unidad + decima + centesima + milesima));
      }
    }
  });

  reg({
    id: 'cond-27', cat: CAT, num: 27,
    title: 'Dígitos pares en cuatro dígitos',
    statement: 'Leer un número entero de cuatro dígitos y determinar cuántos dígitos pares tiene.',
    file: DIR + 'Ejercicio27.java',
    note: 'El original no tiene rama else: si el número no es de cuatro dígitos, el programa termina sin decir nada.',
    inputs: [{ name: 'e1', label: 'Número de cuatro dígitos', type: 'int', def: '2468' }],
    run: function (out, sc, J) {
      out.println('27.Leer un número entero de cuatro dígitos y determinar cuántos dígitos pares tiene.');
      out.println('Ingrese un número entero de cuatro dígitos:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if (e1 > 999 && e1 < 10000) {
        out.println('El numero es de cuatro dígitos.');
        var unidad = J.imod(e1, 10);
        var dos = J.idiv(e1, 10);
        var decima = J.imod(dos, 10);
        var cm = J.idiv(dos, 10);
        var centesima = J.imod(cm, 10);
        var milesima = J.idiv(cm, 10);
        var contadorPares = 0;
        if (J.imod(unidad, 2) === 0) ++contadorPares;
        if (J.imod(decima, 2) === 0) ++contadorPares;
        if (J.imod(centesima, 2) === 0) ++contadorPares;
        if (J.imod(milesima, 2) === 0) ++contadorPares;
        out.println(unidad);
        out.println(decima);
        out.println(centesima);
        out.println(milesima);
        out.println('El número tiene ' + contadorPares + ' dígitos pares.');
      }
    }
  });

  reg({
    id: 'cond-28', cat: CAT, num: 28,
    title: 'Primo menor que 50',
    statement: 'Leer un número entero menor que 50 y positivo y determinar si es un número primo.',
    file: DIR + 'Ejercicio28.java',
    note: 'El archivo original no compila: invoca esPrimo() sin declararlo y tiene las llaves mal cerradas, por lo que la rama "no es primo" nunca existió. Aquí se implementó esPrimo() y se completó esa rama.',
    inputs: [{ name: 'e1', label: 'Número entero menor que 50', type: 'int', def: '37' }],
    run: function (out, sc, J) {
      function esPrimo(n) {
        if (n < 2) return false;
        for (var i = 2; i <= Math.sqrt(n); i++) {
          if (J.imod(n, i) === 0) return false;
        }
        return true;
      }
      out.println('28.Leer un número entero menor que 50 y positivo y determinar si es un número primo.');
      out.println('Ingrese un número entero menor a 50:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      if (e1 < 50) {
        out.println('El numero es menor a 50 y positivo.');
        if (esPrimo(e1)) out.println('El número es primo.');
        else out.println('El número no es primo.');
      } else {
        out.println('El número no es menor a 50 y positivo.');
      }
    }
  });

  reg({
    id: 'cond-29', cat: CAT, num: 29,
    title: 'Capicúa de cinco dígitos',
    statement: 'Leer un número entero de cinco dígitos y determinar si es un número capicúo. Ej. 15651, 59895.',
    file: DIR + 'Ejercicio29.java',
    inputs: [{ name: 'e1', label: 'Número de cinco dígitos', type: 'int', def: '15651' }],
    run: function (out, sc, J) {
      out.println('29.Leer un número entero de cinco dígitos y determinar si es un número capicúo. Ej. 15651,\n59895.');
      out.println('Ingrese un número entero de 5 digitos positivo:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      var unidad = J.imod(e1, 10);
      var dos = J.idiv(e1, 10);
      var decima = J.imod(dos, 10);
      var cm = J.idiv(dos, 10);
      var centesima = J.imod(cm, 10);
      var milesima = J.idiv(cm, 10);
      var decMil = J.imod(milesima, 10);
      var decDecMil = J.idiv(milesima, 10);
      out.println(unidad);
      out.println(decima);
      out.println(centesima);
      out.println(decMil);
      out.println(decDecMil);
      if (e1 < 100000 && e1 > 9999) {
        out.println('El numero tiene 5 digitos y es positivo.');
        if (unidad === decDecMil && decima === decMil) out.println('El número es capicúa.');
        else out.println('El número no es capicúa.');
      } else {
        out.println('El numero no tiene 5 digitos o no es positivo.');
      }
    }
  });

  reg({
    id: 'cond-30', cat: CAT, num: 30,
    title: 'Segundo dígito igual al penúltimo',
    statement: 'Leer un número entero de cuatro dígitos y determinar si el segundo dígito es igual al penúltimo.',
    file: DIR + 'Ejercicio30.java',
    inputs: [{ name: 'e1', label: 'Número de cuatro dígitos', type: 'int', def: '1771' }],
    run: function (out, sc, J) {
      out.println('30.Leer un número entero de cuatro dígitos y determinar si el segundo dígito es igual al penúltimo.');
      out.println('Ingrese un número entero de 4 digitos positivo:');
      var e1 = sc.nextInt('e1');
      out.println(e1);
      var unidad = J.imod(e1, 10);
      var dos = J.idiv(e1, 10);
      var decima = J.imod(dos, 10);
      var cm = J.idiv(dos, 10);
      var centesima = J.imod(cm, 10);
      var milesima = J.idiv(cm, 10);
      if (e1 < 10000 && e1 > 999) {
        out.println('El numero tiene 4 digitos y es positivo.');
        if (centesima === decima) out.println('El segundo y penultimo numero son iguales.');
        else out.println('El segundo y penultimo numero son diferentes.');
      } else {
        out.println('El numero no tiene 4 digitos o no es positivo.');
      }
      out.println(unidad);
      out.println(decima);
      out.println(centesima);
      out.println(milesima);
    }
  });

  reg({
    id: 'cond-31', cat: CAT, num: 31,
    title: 'Es igual a 10',
    statement: 'Leer un número entero y determinar si es igual a 10.',
    file: DIR + 'Ejercicio31.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '10' }],
    run: function (out, sc, J) {
      out.println('31. Leer un número entero y determina si es igual a 10.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('e');
      out.println(entero);
      if (entero === 10) out.println('El número es igual a 10.');
      else out.println('El número es diferente de 10.');
    }
  });

  reg({
    id: 'cond-32', cat: CAT, num: 32,
    title: 'Múltiplo de 7',
    statement: 'Leer un número entero y determinar si es múltiplo de 7.',
    file: DIR + 'Ejercicio32.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '49' }],
    run: function (out, sc, J) {
      out.println('32. Leer un número entero y determinar si es múltiplo de 7.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('e');
      out.println(entero);
      if (J.imod(entero, 7) === 0) out.println('El número es multiplo a 7.');
      else out.println('El número no es multiplo de 7.');
    }
  });

  reg({
    id: 'cond-33', cat: CAT, num: 33,
    title: 'Termina en 7',
    statement: 'Leer un número entero y determinar si termina en 7.',
    file: DIR + 'Ejercicio33.java',
    inputs: [{ name: 'e', label: 'Número entero', type: 'int', def: '127' }],
    run: function (out, sc, J) {
      out.println('33. Leer un número entero y determinar si termina en 7.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('e');
      out.println(entero);
      if (J.imod(entero, 10) === 7) out.println('El número termina en 7.');
      else out.println('El número no termina en 7.');
    }
  });

  reg({
    id: 'cond-34', cat: CAT, num: 34,
    title: 'Cuántos dígitos tiene',
    statement: 'Leer un número entero menor que mil y determinar cuántos dígitos tiene.',
    file: DIR + 'Ejercicio34.java',
    inputs: [{ name: 'e', label: 'Número entero menor que mil', type: 'int', def: '84' }],
    run: function (out, sc, J) {
      out.println('34. Leer un número entero menor que mil y determinar cuántos dígitos tiene.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('e');
      out.println(entero);
      if (entero < 999) {
        if (entero > 99) out.println('El número es de tres digitos.');
        else if (entero > 9) out.println('El número es de dos digitos');
        else out.println('El número tiene solo un digito');
      } else {
        out.println('El nmero es igual o mayor a mil');
      }
    }
  });

  reg({
    id: 'cond-35', cat: CAT, num: 35,
    title: 'Separar los dos dígitos',
    statement: 'Leer un número entero de dos dígitos, guardar cada dígito en una variable diferente y luego mostrarlas en pantalla.',
    file: DIR + 'Ejercicio35.java',
    inputs: [{ name: 'e', label: 'Número de dos dígitos', type: 'int', def: '57' }],
    run: function (out, sc, J) {
      out.println('35. Leer un número entero de dos dígitos, guardar cada dígito en una variable diferente y luego\nmostrarlas en pantalla.');
      out.println('Ingrese un número entero:');
      var entero = sc.nextInt('e');
      out.println(entero);
      if (entero < 99 && entero > 9) {
        var enteroDecima = J.idiv(entero, 10);
        var enteroUnidad = J.imod(entero, 10);
        out.println(enteroUnidad);
        out.println(enteroDecima);
      } else {
        out.println('El número no es de dos digitos');
      }
    }
  });

  reg({
    id: 'cond-36', cat: CAT, num: 36,
    title: 'Más dígitos pares o impares',
    statement: 'Leer un número entero de 4 dígitos y determinar si tiene más dígitos pares o impares.',
    file: DIR + 'Ejercicio36.java',
    inputs: [{ name: 'e', label: 'Número de cuatro dígitos', type: 'int', def: '2461' }],
    run: function (out, sc, J) {
      out.println('36. Leer un número entero de 4 dígitos y determinar si tiene mas dígitos pares o impares');
      out.println('Ingrese un número entero de cuatro digitos:');
      var entero = sc.nextInt('e');
      if (entero > 999 && entero < 10000) {
        var unidad = J.imod(entero, 10);
        var decima = J.imod(J.idiv(entero, 10), 10);
        var centena = J.imod(J.idiv(entero, 100), 10);
        var unidadDeMil = J.idiv(entero, 1000);
        var pares = 0, impares = 0;
        if (J.imod(unidad, 2) === 0) pares++; else impares++;
        if (J.imod(decima, 2) === 0) pares++; else impares++;
        if (J.imod(centena, 2) === 0) pares++; else impares++;
        if (J.imod(unidadDeMil, 2) === 0) pares++; else impares++;
        out.println(pares);
        out.println(impares);
        if (pares > impares) out.println('El número tiene más dígitos pares');
        else if (pares < impares) out.println('El número tiene más dígitos impares');
        else out.println('El número tiene la misma cantidad de dígitos pares e impares');
      } else {
        out.println('El número no es de 4 digitos');
      }
    }
  });

  reg({
    id: 'cond-37', cat: CAT, num: 37,
    title: 'Cuál es múltiplo de cuál',
    statement: 'Leer dos números enteros y determinar cuál es múltiplo de cuál.',
    file: DIR + 'Ejercicio37.java',
    note: 'Si el segundo número es 0, la división entre cero lanza ArithmeticException — igual que en Java.',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '12' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '4' }
    ],
    run: function (out, sc, J) {
      out.println('37. Leer dos números enteros y determinar cuál es múltiplo de cuál.');
      out.println('Ingrese el primer número entero:');
      var entero = sc.nextInt('e1');
      out.println('Ingrese el segundo número entero:');
      var entero2 = sc.nextInt('e2');
      if (J.imod(entero, entero2) === 0) out.println('El entero 1 es multiplo del entero 2');
      else if (J.imod(entero2, entero) === 0) out.println('El entero 2 es multiplo del entero 1');
      else out.println('No son multiplos ninguno de los dos números.');
    }
  });

  reg({
    id: 'cond-38', cat: CAT, num: 38,
    title: 'Último dígito igual en tres números',
    statement: 'Leer tres números enteros y determinar si el último dígito de los tres números es igual.',
    file: DIR + 'Ejercicio38.java',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '13' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '43' },
      { name: 'e3', label: 'Tercer número entero', type: 'int', def: '73' }
    ],
    run: function (out, sc, J) {
      out.println('38. Leer tres números enteros y determinar si el último dígito de los tres números es igual.');
      out.println('Ingrese el primer número entero:');
      var e1 = sc.nextInt('e1');
      out.println('Ingrese el segundo número entero:');
      var e2 = sc.nextInt('e2');
      out.println('Ingrese el tercer número entero:');
      var e3 = sc.nextInt('e3');
      var u1 = J.imod(e1, 10), u2 = J.imod(e2, 10), u3 = J.imod(e3, 10);
      out.println(u1);
      out.println(u2);
      out.println(u3);
      if (u1 === u2 && u1 === u3) out.println('El ultimo digito de los 3 números es igual.');
      else out.println('El ultimo digito no es igual en los tres números enteros.');
    }
  });

  reg({
    id: 'cond-39', cat: CAT, num: 39,
    title: 'Penúltimo dígito igual en tres números',
    statement: 'Leer tres números enteros y determinar si el penúltimo dígito de los tres números es igual.',
    file: DIR + 'Ejercicio39.java',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '152' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '957' },
      { name: 'e3', label: 'Tercer número entero', type: 'int', def: '58' }
    ],
    run: function (out, sc, J) {
      out.println('39. Leer tres números enteros y determina si el penúltimo dígito de los tres números es igual.');
      out.println('Ingrese el primer número entero:');
      var e1 = sc.nextInt('e1');
      out.println('Ingrese el segundo número entero:');
      var e2 = sc.nextInt('e2');
      out.println('Ingrese el tercer número entero:');
      var e3 = sc.nextInt('e3');
      var d1 = J.imod(J.idiv(e1, 10), 10);
      var d2 = J.imod(J.idiv(e2, 10), 10);
      var d3 = J.imod(J.idiv(e3, 10), 10);
      out.println(d1);
      out.println(d2);
      out.println(d3);
      if (d1 === d2 && d2 === d3) out.println('El ultimo digito de los 3 números es igual.');
      else out.println('El ultimo digito no es igual en los tres números enteros.');
    }
  });

  reg({
    id: 'cond-40', cat: CAT, num: 40,
    title: 'Enteros entre dos números cercanos',
    statement: 'Leer dos números enteros y si la diferencia entre los dos es menor o igual a 10, mostrar en pantalla todos los enteros comprendidos entre el menor y el mayor.',
    file: DIR + 'Ejercicio40.java',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '7' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '15' }
    ],
    run: function (out, sc, J) {
      function printNumbers(start, end) {
        if (start > end) return;
        out.println(start);
        printNumbers(start + 1, end);
      }
      out.println('40. Leer dos números enteros y si la diferencia entre los dos es menor o igual a 10 entonces mostrar en pantalla todos los enteros comprendidos entre el menor y el mayor de los números leídos.');
      out.println('Ingrese el primer número entero:');
      var e1 = sc.nextInt('e1');
      out.println('Ingrese el segundo número entero:');
      var e2 = sc.nextInt('e2');
      if (Math.abs(e1 - e2) <= 10) {
        out.println('Estos son los numeros comprendidos entres los dos números enteros ingresados');
        printNumbers(Math.min(e1, e2), Math.max(e1, e2));
      } else {
        out.println('La diferencia entre los números es mayor a 10.');
      }
    }
  });

  reg({
    id: 'cond-41', cat: CAT, num: 41,
    title: 'Diferencia primo de un dígito',
    statement: 'Leer dos números enteros y determinar si la diferencia entre los dos es un número primo de un dígito.',
    file: DIR + 'Ejercicio41.java',
    note: 'La condición del original incluye el 1, que no es primo. Se conserva tal cual está en el repositorio.',
    inputs: [
      { name: 'e1', label: 'Primer número entero', type: 'int', def: '20' },
      { name: 'e2', label: 'Segundo número entero', type: 'int', def: '13' }
    ],
    run: function (out, sc, J) {
      out.println('41.Leer dos números enteros y determinar si la diferencia entre los dos es un número primo de un digito.');
      out.println('Ingrese el primer número entero:');
      var e1 = sc.nextInt('e1');
      out.println('Ingrese el segundo número entero:');
      var e2 = sc.nextInt('e2');
      var diferencia = Math.abs(e1 - e2);
      if (diferencia === 3 || diferencia === 5 || diferencia === 7 || diferencia === 2 || diferencia === 1) {
        out.println('La diferencia es un numero primo de un digito');
      } else {
        out.println('La diferencia entre los dos digitos no es un numero primo de un digito');
      }
    }
  });

  /* ---------------------- Ejercicios sueltos ---------------------- */

  reg({
    id: 'cond-validacion', cat: CAT, num: 42,
    title: 'Validación de entrada con hasNextInt',
    statement: 'Versión del ejercicio 1 que valida la entrada en un bucle con hasNextInt() en lugar de capturar la excepción.',
    file: DIR + 'Ejercicio.java',
    note: 'El original repite la pregunta en un while hasta recibir un entero. Aquí se evalúa un solo intento, porque el formulario web envía todos los datos de una vez.',
    inputs: [{ name: 'numero', label: 'Número entero (prueba también con texto)', type: 'text', def: '104' }],
    run: function (out, sc, J) {
      function verificarTerminacion(numero) {
        var ultimoDigito = J.imod(numero, 10);
        if (ultimoDigito === 4) out.println('El número termina en 4.');
        else out.println('El número no termina en 4.');
        out.println();
      }
      out.print('Ingrese un número entero: ');
      if (sc.hasNextInt('numero')) {
        out.println();
        verificarTerminacion(sc.nextInt('numero'));
      } else {
        out.println();
        out.println('El valor ingresado no es un número entero. Por favor, intente nuevamente.');
        out.println('[el programa original volvería a preguntar aquí]');
      }
    }
  });

  reg({
    id: 'cond-imc', cat: CAT, num: 43,
    title: 'Índice de Masa Corporal',
    statement: 'Leer estatura y peso, calcular el IMC y clasificar el resultado.',
    file: DIR + 'EjercicioIMC.java',
    inputs: [
      { name: 'estatura', label: 'Estatura en metros', type: 'double', def: '1.75' },
      { name: 'peso', label: 'Peso en kilogramos', type: 'double', def: '70' }
    ],
    run: function (out, sc, J) {
      out.println('Averigue su Indice de Masa Corporal (IMC)');
      out.println('Por favor ingrese su estatura:');
      var estatura = sc.nextDouble('estatura');
      out.println('Por favor ingrese su peso:');
      var peso = sc.nextDouble('peso');
      var imc = peso / Math.pow(estatura, 2);
      out.println('Su IMC es: ' + J.d(imc));
      if (imc < 16) out.println('Usted presenta delgadez severa');
      else if (imc >= 16 && imc < 17) out.println('Usted presenta delgadez moderada');
      else if (imc >= 17 && imc < 18.5) out.println('Usted presenta delgadez leve');
      else if (imc >= 18.5 && imc < 25) out.println('Usted tiene un peso normal');
      else if (imc >= 25 && imc < 30) out.println('Usted presenta sobrepeso');
      else if (imc >= 30 && imc < 35) out.println('Usted presenta obesidad leve');
      else if (imc >= 35 && imc < 40) out.println('Usted presenta obesidad media');
      else if (imc >= 40) out.println('Usted presenta obesidad morbida');
      else out.println('No se puede calcular el IMC');
    }
  });

  reg({
    id: 'cond-uno', cat: CAT, num: 44,
    title: 'Terminado en 4 con BufferedReader',
    statement: 'Variante del ejercicio 1 que lee con BufferedReader e Integer.parseInt en lugar de Scanner.',
    file: DIR + 'Ejerciciouno.java',
    note: 'El catch espera InputMismatchException, pero Integer.parseInt lanza NumberFormatException: con texto no numérico el programa revienta. Prueba a escribir "hola".',
    inputs: [{ name: 'e1', label: 'Número entero', type: 'text', def: '84' }],
    run: function (out, sc, J) {
      out.println('1.Leer un número entero y determinar si es un número terminado en 4.');
      out.println('Ingrese un número entero:');
      var entero1 = sc.parseInt('e1'); // lanza NumberFormatException, no capturada
      out.println(entero1);
      if (J.imod(entero1, 10) === 4) out.println('Si es un número terminado en 4.');
      else out.println('No es un número terminado en 4.');
    }
  });

  reg({
    id: 'cond-hola', cat: CAT, num: 45,
    title: 'Hola Mundo y conversión char/int',
    statement: 'Primer programa del repositorio: imprime un saludo, abre una ventana Swing y muestra la conversión implícita entre char e int.',
    file: DIR + 'HolaMundo.java',
    note: 'La ventana JFrame no tiene equivalente en el navegador; solo se reproduce la salida de consola. Observa que println(char) imprime el carácter y no su código numérico.',
    inputs: [],
    run: function (out, sc, J) {
      out.println('Hola Mundo!');
      out.println('Prueba niños');
      out.println('[JFrame "Ventana1" con un JTextField deshabilitado — omitido en la versión web]');
      var n = 40;              // char n = 40;
      out.println(J.chr(n));   // imprime '('
      var c = 'a'.charCodeAt(0);
      out.println(c);          // imprime 97
    }
  });
})();
