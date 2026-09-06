# Ejercicios de Lógica

Versión web de mi colección de ejercicios de lógica de programación en Java. Cada programa
se puede **ejecutar en el navegador** con datos propios y comparar con su **código fuente
original** al lado.

**→ [miguelpavajeau.github.io/ejercicios-logica-web](https://miguelpavajeau.github.io/ejercicios-logica-web/)**

---

## Qué contiene

| Categoría | Programas | Tema |
|---|---:|---|
| Condicionales | 45 | `if` / `else`: dígitos, primos, comparaciones, IMC |
| Ciclos | 17 | `for` y `while`: rangos, divisores, múltiplos, acumuladores |
| Arreglos | 7 | Vectores: mayor elemento, Fibonacci, primos, histograma |
| Ejercicios libres | 6 | Conversión a binario, series, detección de spam |
| HackerRank | 4 | Retos resueltos con su formato de salida exacto |
| POO | 1 | Herencia: selección de fútbol (5 clases) |

**80 programas ejecutables** a partir de **84 archivos Java**.

## Cómo funciona

Los programas originales son aplicaciones de consola: leen con `Scanner` y escriben con
`System.out`. Para llevarlos al navegador se portó cada uno a JavaScript conservando su
comportamiento, no solo su resultado:

- **División entera** que trunca hacia cero, como `int` en Java: `-45 / 10` da `-4`, no `-5`.
- **Excepciones reales de la JVM**. Escribir texto donde se espera un número produce
  `java.util.InputMismatchException`; dividir entre cero produce
  `java.lang.ArithmeticException: / by zero`.
- **`printf` con el formato de Java**, incluidos anchos y relleno: `%-15s%03d%n`.
- **Los errores del código original se conservan**, y se señalan con una nota en la ficha del
  ejercicio en lugar de corregirlos en silencio. Un par de archivos no compilaban —invocaban
  métodos que nunca declararon—; en esos casos se implementó el método faltante y se indica
  cuál fue el cambio.

## Estructura

```
index.html                  Página única
assets/runtime.js           Emulación de Scanner, System.out, aritmética entera y excepciones
assets/app.js               Navegación, formularios, consola y visor de código
assets/styles.css           Estilos, tema claro/oscuro
data/ex-*.js                Catálogo: enunciado, campos de entrada e implementación
data/java-sources.js        Los 84 archivos .java originales, empaquetados para mostrarlos
```

Sin framework ni paso de compilación: HTML, CSS y JavaScript planos. La única dependencia
externa es [highlight.js](https://highlightjs.org/) por CDN para colorear el código Java, y
el sitio funciona igual si no carga.

## Ejecutar en local

Basta con servir la carpeta por HTTP (abrir `index.html` con `file://` también funciona en la
mayoría de navegadores):

```bash
python -m http.server 8000
# luego abrir http://localhost:8000
```

## Atajos de teclado

| Tecla | Acción |
|---|---|
| `/` | Buscar ejercicio |
| `Ctrl` + `Enter` | Ejecutar el programa |
| `Esc` | Cerrar el menú o limpiar la búsqueda |

---

Código original: [Miguel Pavajeau](https://github.com/miguelpavajeau).
