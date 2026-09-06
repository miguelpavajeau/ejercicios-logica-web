/* Ejercicios libres y HackerRank — src/EjerciciosLibres */
(function () {
  'use strict';
  var LIB = 'libres';
  var HR = 'hackerrank';
  var DIR = 'EjerciciosLibres/';

  reg({
    id: 'libre-converter', cat: LIB, num: 1,
    title: 'Conversor de decimal a binario',
    statement: 'Leer un número entero y convertirlo a binario acumulando cada resto en una posición decimal.',
    file: DIR + 'Converter.java',
    note: 'El resultado se guarda en un int, así que a partir de 1024 (11 dígitos binarios) el valor desborda el rango de int. La versión web reproduce ese desbordamiento. El número se imprime dos veces porque toBinary() ya hace un println antes de retornar.',
    inputs: [{ name: 'n', label: 'Número entero', type: 'int', def: '42' }],
    run: function (out, sc, J) {
      function toBinary(number) {
        var remainder;
        var i = 1;
        var binary = 0;
        while (number !== 0) {
          remainder = J.imod(number, 2);
          number = J.idiv(number, 2);
          binary = (binary + remainder * i) | 0; // int, con desbordamiento
          i = (i * 10) | 0;
        }
        out.println(binary);
        return binary;
      }
      out.println('Ingrese un numero entero que desee convertir en binario.');
      var number = sc.nextInt('n');
      out.println(toBinary(number));
    }
  });

  reg({
    id: 'libre-ciclos', cat: LIB, num: 2,
    title: 'Años cumplidos (while)',
    statement: 'Preguntar al usuario su edad y mostrar por pantalla todos los años que ha cumplido, desde 1 hasta su edad.',
    file: DIR + 'EjercicioCiclos.java',
    note: 'El archivo incluye comentadas las tres versiones del mismo ejercicio: for, while y do-while. La que queda activa es el while.',
    inputs: [{ name: 'edad', label: 'Edad', type: 'int', def: '30' }],
    run: function (out, sc, J) {
      out.println('Escribir un programa que pregunte al usuario su edad y muestre por pantalla\ntodos los años que ha cumplido (desde 1 hasta su edad).');
      out.println('Ingrese su edad:');
      var edad = sc.nextInt('edad');
      var contador = 1;
      while (contador <= edad) {
        out.println(contador);
        contador++;
      }
    }
  });

  reg({
    id: 'libre-ciclos2', cat: LIB, num: 3,
    title: 'Secuencia numérica',
    statement: 'Encontrar el número que sigue una secuencia y escribirla hasta el número N indicado por el usuario.',
    file: DIR + 'EjercicioCiclos2.java',
    note: 'De las tres secuencias del enunciado, el código solo implementa la primera: 5, 7, 9, 11…',
    inputs: [{ name: 'ciclos', label: 'Cantidad de repeticiones', type: 'int', def: '8' }],
    run: function (out, sc, J) {
      out.println('Encuentra el número que sigue la secuencia y desarrolla un algoritmo para que escriba la secuencia hasta el número N ingresado por el usuario.\na. 5, 7, 9, … 11\nb. 9, 16, 25, 36, 49, 64, … 81\nc. 7, 9, 13, 15, 20, 22, …28');
      out.println('Ingrese el numero de repeticiones de la serie:');
      var cantCiclos = sc.nextInt('ciclos');
      var inicioSerie = 5;
      for (var i = 0; i < cantCiclos; i++) {
        out.println(inicioSerie);
        inicioSerie += 2;
      }
    }
  });

  reg({
    id: 'libre-condicionales', cat: LIB, num: 4,
    title: 'Años cumplidos (variante)',
    statement: 'Misma consigna que el ejercicio anterior, guardada en el archivo de condicionales.',
    file: DIR + 'EjercicioCondicionales.java',
    inputs: [{ name: 'edad', label: 'Edad', type: 'int', def: '25' }],
    run: function (out, sc, J) {
      out.println('Escribir un programa que pregunte al usuario su edad y muestre por pantalla todos los años que ha cumplido (desde 1 hasta su edad).');
      out.println('Ingrese su edad:');
      var edad = sc.nextInt('edad');
      var contador = 1;
      while (contador <= edad) {
        out.println(contador);
        contador++;
      }
    }
  });

  reg({
    id: 'libre-primo-arreglo', cat: LIB, num: 5,
    title: 'Mayor primo de un arreglo',
    statement: 'Recorrer un arreglo fijo y devolver el mayor número primo que contiene.',
    file: DIR + 'EjercicioNumeroPrimoArreglo.java',
    inputs: [],
    run: function (out, sc, J) {
      function isPrime(n) {
        if (n <= 1) return false;
        for (var i = 2; i <= Math.sqrt(n); i++) {
          if (J.imod(n, i) === 0) return false;
        }
        return true;
      }
      function findLargestPrime(array) {
        var largestPrime = -1;
        for (var i = 0; i < array.length; i++) {
          if (isPrime(array[i]) && array[i] > largestPrime) largestPrime = array[i];
        }
        return largestPrime;
      }
      var array = [4, 6, 8, 10, 12, 5, 7, 11, 14, 9, 1, 3];
      out.println('El mayor número primo es: ' + findLargestPrime(array));
    }
  });

  reg({
    id: 'libre-spam', cat: LIB, num: 6,
    title: 'Detección de correo spam',
    statement: 'Dada una lista de asuntos y una lista de palabras marcadas como spam, devolver los asuntos que contienen al menos una de esas palabras.',
    file: DIR + 'Spam_detection.java',
    note: 'El programa original escribe el resultado en src/EjerciciosLibres/output.txt. Aquí se muestra directamente en la consola.',
    inputs: [
      { name: 'subjects', label: 'Asuntos de los correos (uno por línea)', type: 'lines', rows: 5, def: 'Gana dinero rapido desde casa\nReunion de equipo el martes\nOFERTA limitada solo hoy\nFactura del mes de agosto\nHaz clic aqui para reclamar tu premio' },
      { name: 'spam', label: 'Palabras spam (una por línea)', type: 'lines', rows: 4, def: 'dinero\noferta\npremio' }
    ],
    run: function (out, sc, J) {
      function getSpamEmails(subjects, spamWords) {
        var correosSpam = [];
        for (var i = 0; i < subjects.length; i++) {
          for (var k = 0; k < spamWords.length; k++) {
            if (subjects[i].toLowerCase().indexOf(spamWords[k].toLowerCase()) >= 0) {
              correosSpam.push(subjects[i]);
              break;
            }
          }
        }
        return correosSpam;
      }
      var subjects = sc.textLines('subjects');
      var spamWords = sc.textLines('spam');
      out.println('[el original escribe este resultado en src/EjerciciosLibres/output.txt]');
      var result = getSpamEmails(subjects, spamWords);
      out.println(result.join('\n'));
    }
  });

  /* ------------------------------ HackerRank ------------------------------ */

  reg({
    id: 'hr-1', cat: HR, num: 1,
    title: 'Java Datatypes: leer int, double y String',
    statement: 'Leer un entero, un decimal y una cadena desde la entrada estándar y mostrarlos con su etiqueta.',
    file: DIR + 'Hackerrank/Solution.java',
    inputs: [
      { name: 'i', label: 'Entero', type: 'int', def: '42' },
      { name: 'd', label: 'Decimal', type: 'double', def: '4.0' },
      { name: 's', label: 'Cadena', type: 'text', def: 'HackerRank is the best place to learn and practice coding!' }
    ],
    run: function (out, sc, J) {
      var i = sc.nextInt('i');
      var d = sc.nextDouble('d');
      var s = sc.nextLine('s');
      out.println('String: ' + s);
      out.println('Double: ' + J.d(d));
      out.println('Int: ' + i);
    }
  });

  reg({
    id: 'hr-2', cat: HR, num: 2,
    title: 'If-Else: Weird or Not Weird',
    statement: 'Dado un entero N: es Weird si es impar, o si es par y está entre 6 y 20. En cualquier otro caso es Not Weird.',
    file: DIR + 'Hackerrank/Solution2.java',
    inputs: [{ name: 'n', label: 'N', type: 'int', def: '18' }],
    run: function (out, sc, J) {
      var N = sc.nextInt('n');
      if (J.imod(N, 2) !== 0) {
        out.println('Weird');
      } else if (J.imod(N, 2) === 0 && N >= 2 && N <= 5) {
        out.println('Not Weird');
      } else if (J.imod(N, 2) === 0 && N >= 6 && N <= 20) {
        out.println('Weird');
      } else if (J.imod(N, 2) === 0 && N > 20) {
        out.println('Not Weird');
      }
    }
  });

  reg({
    id: 'hr-3', cat: HR, num: 3,
    title: 'Java Output Formatting',
    statement: 'Leer tres pares nombre/número y alinearlos con printf: el nombre a 15 caracteres a la izquierda y el número a 3 dígitos con ceros.',
    file: DIR + 'Hackerrank/Solution3.java',
    inputs: [{
      name: 'datos', label: 'Tres líneas con nombre y número', type: 'lines', rows: 3,
      def: 'java 100\ncpp 65\npython 50'
    }],
    run: function (out, sc, J) {
      out.println('================================');
      for (var i = 0; i < 3; i++) {
        var t = sc.nextLineFrom('datos').trim().split(/\s+/);
        var s1 = t[0];
        if (!/^[+-]?\d+$/.test(t[1] || '')) throw JLogic.InputMismatchException();
        out.printf('%-15s%03d%n', s1, parseInt(t[1], 10));
      }
      out.println('================================');
    }
  });

  reg({
    id: 'hr-4', cat: HR, num: 4,
    title: 'Java Loops: tabla de multiplicar',
    statement: 'Leer un entero N e imprimir su tabla de multiplicar del 1 al 10 con el formato N x i = resultado.',
    file: DIR + 'Hackerrank/Solution4.java',
    inputs: [{ name: 'n', label: 'N', type: 'int', def: '7' }],
    run: function (out, sc, J) {
      var N = sc.parseInt('n');
      for (var i = 1; i <= 10; i++) {
        out.printf('%d x %d = %d%n', N, i, N * i);
      }
    }
  });
})();
