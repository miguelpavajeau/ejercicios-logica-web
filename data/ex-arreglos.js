/* Arreglos — src/C/EjerciciosArreglos */
(function () {
  'use strict';
  var CAT = 'arreglos';
  var DIR = 'C/EjerciciosArreglos/';

  var DIEZ = { name: 'nums', label: '10 números enteros (separados por espacios o comas)', type: 'ints', count: 10, def: '3 9 12 7 25 4 18 2 30 11' };

  reg({
    id: 'arr-1', cat: CAT, num: 1,
    title: 'Posición del mayor número',
    statement: 'Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número leído.',
    file: DIR + 'Ejercicio1.java',
    note: 'La posición arranca en 0 y solo se actualiza cuando aparece un número mayor, así que si el mayor es el primero del vector el programa informa la posición 0.',
    inputs: [DIEZ],
    run: function (out, sc, J) {
      out.println('1. Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el \nmayor número leído.');
      out.println('Ingrese 10 número entero:');
      var numeros = [];
      try {
        for (var i = 0; i < 10; i++) {
          out.printf('Introduzca número %d: ', i + 1);
          numeros[i] = sc.nextIntFrom('nums');
        }
        var numMayor = numeros[0];
        var posicion = 0;
        for (i = 0; i < numeros.length; i++) {
          if (numeros[i] > numMayor) {
            numMayor = numeros[i];
            posicion = i + 1;
          }
        }
        out.println('El mayor numero del vector es : ' + numMayor);
        out.println('El mayor numero del vector esta ubicado en la posicion : ' + posicion);
      } catch (e) {
        if (e instanceof JLogic.JavaError && e.javaName === 'java.util.InputMismatchException') {
          out.println('No es un número entero');
        } else throw e;
      }
    }
  });

  reg({
    id: 'arr-2', cat: CAT, num: 2,
    title: 'Posición del mayor par',
    statement: 'Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número par leído.',
    file: DIR + 'Ejercicio2.java',
    inputs: [DIEZ],
    run: function (out, sc, J) {
      out.println('2.Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el \nmayor número par leído.');
      out.println('Ingrese 10 número entero:');
      var numeros = [];
      try {
        for (var i = 0; i < 10; i++) {
          out.printf('Introduzca número %d: ', i + 1);
          numeros[i] = sc.nextIntFrom('nums');
        }
        var numMayor = 0;
        var posicion = 0;
        for (i = 0; i < numeros.length; i++) {
          if (J.imod(numeros[i], 2) === 0) {
            if (numeros[i] > numMayor) {
              numMayor = numeros[i];
              out.println(numMayor);
              posicion = i + 1;
            }
          }
        }
        if (numMayor === 0) {
          out.println('No hay numeros pares');
        } else {
          out.println('El mayor numero par del vector es : ' + numMayor);
          out.println('El mayor numero del vector esta ubicado en la posicion : ' + posicion);
        }
      } catch (e) {
        if (e instanceof JLogic.JavaError && e.javaName === 'java.util.InputMismatchException') {
          out.println('No es un número entero');
        } else throw e;
      }
    }
  });

  reg({
    id: 'arr-3', cat: CAT, num: 3,
    title: 'Mayor número primo del vector',
    statement: 'Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el mayor número primo leído.',
    file: DIR + 'Ejercicio3.java',
    note: 'El archivo original no compila: llama a findLargestPrime() sin declararlo ni importarlo. Aquí se usa la implementación de EjerciciosLibres/EjercicioNumeroPrimoArreglo.java.',
    inputs: [DIEZ],
    run: function (out, sc, J) {
      function isPrime(n) {
        if (n <= 1) return false;
        for (var i = 2; i <= Math.sqrt(n); i++) {
          if (J.imod(n, i) === 0) return false;
        }
        return true;
      }
      function findLargestPrime(array) {
        var largest = -1;
        for (var i = 0; i < array.length; i++) {
          if (isPrime(array[i]) && array[i] > largest) largest = array[i];
        }
        return largest;
      }
      out.println('3.Leer 10 enteros, almacenarlos en un vector y determinar en qué posición del vector está el\nmayor número primo leído.');
      out.println('Ingrese 10 número entero:');
      var numeros = [];
      try {
        for (var i = 0; i < 10; i++) {
          out.printf('Introduzca número %d: ', i + 1);
          numeros[i] = sc.nextIntFrom('nums');
        }
        findLargestPrime(numeros);
        out.println('El mayor número primo es: ' + findLargestPrime(numeros));
      } catch (e) {
        if (e instanceof JLogic.JavaError && e.javaName === 'java.util.InputMismatchException') {
          out.println('No es un número entero');
        } else throw e;
      }
    }
  });

  reg({
    id: 'arr-4', cat: CAT, num: 4,
    title: 'Serie de Fibonacci',
    statement: 'Cargar un vector de 10 posiciones con los 10 primeros elementos de la serie de Fibonacci y mostrarlo en pantalla.',
    file: DIR + 'Ejercicio4.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('4. Cargar un vector de 10 posiciones con los 10 primeros elementos de la serie de Fibonacci y mostrarlo en pantalla.');
      var tamanoArray = 10;
      var arrayFibonacci = new Array(tamanoArray);
      arrayFibonacci[0] = 0;
      arrayFibonacci[1] = 1;
      out.println('Los primeros 10 elementos de la serie de Fibonacci son:');
      for (var i = 2; i < tamanoArray; i++) {
        arrayFibonacci[i] = arrayFibonacci[i - 1] + arrayFibonacci[i - 2];
      }
      for (var k = 0; k < arrayFibonacci.length; k++) out.println(arrayFibonacci[k]);
    }
  });

  reg({
    id: 'arr-5', cat: CAT, num: 5,
    title: 'Primos entre 100 y 300',
    statement: 'Almacenar en un vector de 10 posiciones los 10 primeros números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.',
    file: DIR + 'Ejercicio5.java',
    inputs: [],
    run: function (out, sc, J) {
      out.println('5. Almacenar en un vector de 10 posiciones los 10 números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.\n');
      var tamanoArray = 10;
      var arrayPrimos = new Array(tamanoArray);
      out.println('Los primeros 10 números primos entre 100 y 300 son:');
      var contador = 0;
      var numero = 100;
      while (contador < tamanoArray) {
        var esPrimo = true;
        for (var i = 2; i < numero; i++) {
          if (J.imod(numero, i) === 0) {
            esPrimo = false;
            break;
          }
        }
        if (esPrimo) {
          arrayPrimos[contador] = numero;
          contador++;
        }
        numero++;
      }
      for (var k = 0; k < arrayPrimos.length; k++) out.println(arrayPrimos[k]);
    }
  });

  reg({
    id: 'arr-5b', cat: CAT, num: 6,
    title: 'Primos entre 100 y 300 (versión optimizada)',
    statement: 'Segunda versión del ejercicio 5, con un método esPrimo() que solo divide hasta la raíz cuadrada.',
    file: DIR + 'Ejercicio5Dos.java',
    inputs: [],
    run: function (out, sc, J) {
      function esPrimo(numero) {
        if (numero <= 1) return false;
        for (var i = 2; i <= Math.sqrt(numero); i++) {
          if (J.imod(numero, i) === 0) return false;
        }
        return true;
      }
      out.println('5. Almacenar en un vector de 10 posiciones los 10 números primos comprendidos entre 100 y 300. Luego mostrarlos en pantalla.\n');
      var primos = new Array(10);
      var contadorPrimos = 0;
      for (var numero = 100; numero <= 300; numero++) {
        if (esPrimo(numero)) {
          primos[contadorPrimos] = numero;
          contadorPrimos++;
          if (contadorPrimos === 10) break;
        }
      }
      out.println('Los 10 números primos entre 100 y 300 son:');
      for (var i = 0; i < contadorPrimos; i++) out.print(primos[i] + ' ');
    }
  });

  reg({
    id: 'arr-histograma', cat: CAT, num: 7,
    title: 'Histograma de frecuencias',
    statement: 'Recorrer un vector fijo y dibujar con asteriscos cuántas veces se repite cada valor del 1 al 5.',
    file: DIR + 'EjercicioArrayHistograma.java',
    inputs: [],
    run: function (out, sc, J) {
      var arr = [1, 2, 1, 3, 3, 1, 2, 1, 5, 1];
      var n = arr.length;
      var visited = new Array(n);
      for (var i = 1; i <= 5; i++) {
        var count = 0;
        for (var j = 0; j < n; j++) {
          if (visited[j] === true) continue;
          if (arr[j] === i) {
            visited[j] = true;
            count++;
          }
        }
        out.print(i + ': ');
        for (var k = 0; k < count; k++) out.print('*');
        out.println();
      }
    }
  });
})();
