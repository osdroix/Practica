// ==========================================
// FUNCIÓN UTILITARIA: parseValor
// ==========================================
// ¿Por qué? Necesitamos convertir el input del usuario (que siempre llega como string)
// a su tipo de dato real (número, booleano, null, etc.) para poder trabajar con él correctamente.
function parseValor(texto) {
  const t = texto.trim();          // .trim() elimina espacios en blanco al inicio y final para evitar errores de conversión
  if (t === "") return "";       // Si está vacío, retornamos cadena vacía
  if (t === "true") return true; // Convertimos manualmente strings "true" a booleano true
  if (t === "false") return false; // Convertimos "false" a booleano false
  if (t === "null") return null; // Convertimos "null" al valor null
  if (t === "undefined") return undefined; // Convertimos "undefined" al valor undefined

  const n = Number(t);           // Intentamos convertir a número
  if (!isNaN(n)) return n;       // Si es un número válido (!isNaN), lo retornamos

  // Intentamos parsear como JSON (útil para objetos o arrays escritos en el input)
  try { return JSON.parse(t); }  
  catch { return texto; }        // Si falla todo lo anterior, asumimos que es un string normal y lo devolvemos tal cual
}

// ==========================================
// RETO 1: TIPOS DE DATOS
// ==========================================
// ¿Por qué? Para practicar la identificación de tipos de datos en JS usando el operador 'typeof'.
function describirValor(valor) {
  // Concatenamos strings y valores para formar el mensaje de salida.
  // 'typeof valor' nos devuelve una cadena con el tipo de dato (ej: "number", "string", "object")
  return "El valor " + valor + " es de tipo " + typeof valor;
}

// ==========================================
// RETO 3: PALÍNDROMO
// ==========================================
// ¿Por qué? Ejercita la manipulación de strings y arrays.
function esPalindromo(palabra) {
  // 1. Normalización: Convertimos a string, quitamos espacios extremos y pasamos a minúsculas
  // para que "Radar" y "radar" sean iguales.
  const texto = palabra.toString().trim().toLowerCase();
  
  // 2. Inversión:
  // .split('') -> Convierte string a array de caracteres ["r", "a", "d", "a", "r"]
  // .reverse() -> Invierte el orden del array
  // .join('')  -> Une el array de nuevo en un string
  const reverso = texto.split('').reverse().join('');
  
  // 3. Comparación: Si son idénticos, es palíndromo.
  return texto === reverso;
}

// ==========================================
// RETO 4: FIZZBUZZ
// ==========================================
// ¿Por qué? Un clásico de entrevistas para practicar bucles y condicionales.
function fizzBuzz() {
  let resultado = "";
  // Iteramos del 1 al 20
  for (let i = 1; i <= 20; i++) {
    // Es importante verificar primero la condición más específica (divisible por 3 Y 5)
    // porque si verificamos solo por 3 primero, el 15 entraría ahí y no en FizzBuzz.
    if (i % 3 === 0 && i % 5 === 0) {
      resultado += "FizzBuzz\n"; // \n agrega un salto de línea para visualización
    } else if (i % 3 === 0) {
      resultado += "Fizz\n";
    } else if (i % 5 === 0) {
      resultado += "Buzz\n";
    } else {
      resultado += i + "\n"; // Si no es divisible por ninguno, mostramos el número
    }
  }
  return resultado;
}

// ==========================================
// RETO 5: ARRAYS
// ==========================================
// ¿Por qué? Para dominar métodos fundamentales de manipulación de arrays: sort, shift, reduce.
function procesarArray() {
  let arr = [10, 5, 8, 20, 2];
  let log = `Array original: [${arr.join(', ')}]\n`; // .join crea un string legible del array

  // 1. Ordenar: .sort() por defecto ordena alfabéticamente.
  // Para números, necesitamos una función de comparación (a, b) => a - b
  // Si a - b es negativo, a va antes. Si es positivo, b va antes.
  arr.sort((a, b) => a - b);
  log += `Ordenado: [${arr.join(', ')}]\n`;

  // 2. Eliminar el menor: .shift() elimina y devuelve el primer elemento del array.
  // Como ya está ordenado ascendentemente, el primero es el menor.
  const eliminado = arr.shift();
  log += `Eliminado el menor (${eliminado}): [${arr.join(', ')}]\n`;

  // 3. Sumar: .reduce() recorre el array acumulando un valor.
  // acc = acumulador, curr = valor actual, 0 = valor inicial del acumulador.
  const suma = arr.reduce((acc, curr) => acc + curr, 0);
  log += `Suma de restantes: ${suma}`;

  return log;
}

// ==========================================
// RETO 6: PARSEO JSON Y ERRORES
// ==========================================
// ¿Por qué? Manejo de excepciones. JSON.parse falla si el string no es JSON válido.
// try-catch permite manejar ese error sin romper la aplicación.
function parsearJSON(str) {
  let log = "";
  try {
    // Intentamos convertir el string a objeto
    const obj = JSON.parse(str);
    // Si tiene éxito, mostramos el objeto convertido a string nuevamente
    log += "Parseo exitoso: " + JSON.stringify(obj);
  } catch (error) {
    // Si JSON.parse falla, el código salta inmediatamente aquí
    log += "Error de formato";
  } finally {
    // Este bloque se ejecuta SIEMPRE, haya error o no.
    // Útil para limpieza de recursos o mensajes de finalización.
    log += "\nIntento de parseo finalizado";
  }
  return log;
}

// ==========================================
// RETO 7: VALIDAR EDAD (THROW)
// ==========================================
// ¿Por qué? Practicar el lanzamiento manual de errores para validaciones de negocio.
function validarEdad(edad) {
  if (edad < 18) {
    // 'throw' detiene la ejecución de la función y lanza una excepción
    // que debe ser capturada por quien llamó a la función.
    throw "Acceso denegado: Menor de edad";
  }
  return "Acceso permitido";
}

// ==========================================
// INICIALIZACIÓN Y EVENTOS DOM
// ==========================================
// DOMContentLoaded asegura que el script corra solo cuando el HTML esté cargado.
window.addEventListener('DOMContentLoaded', () => {
  
  // -------------------------------------------------
  // Configuración del Reto 1
  // -------------------------------------------------
  const form1 = document.getElementById('formReto1') || document.querySelector('form');
  const input1 = document.getElementById('inputVar');
  const textarea1 = document.getElementById('resultado');

  if (form1 && input1 && textarea1) {
    form1.addEventListener('submit', e => {
      e.preventDefault(); // Evita que el formulario recargue la página al enviarse
      const val = parseValor(input1.value);
      textarea1.value = describirValor(val);
      textarea1.parentElement.style.display = 'block'; // Muestra el área de resultado oculta
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 2 (Círculo)
  // -------------------------------------------------
  const form2 = document.getElementById('formCircle');
  const input2 = document.getElementById('inputRadius');
  const textarea2 = document.getElementById('resultCircle');

  if (form2 && input2 && textarea2) {
    form2.addEventListener('submit', e => {
      e.preventDefault();
      const r = Number(input2.value);
      
      // Validación básica de entrada
      if (isNaN(r) || input2.value.trim() === '') {
        textarea2.value = "Por favor, ingresa un radio válido (número).";
        textarea2.parentElement.style.display = 'block';
        return;
      }
      
      const PI = 3.14159; // Constante declarada
      const area = PI * (r ** 2); // Fórmula área: pi * r al cuadrado
      const perimetro = 2 * PI * r; // Fórmula perímetro: 2 * pi * r
      
      // Template literals (``) para insertar variables fácilmente en el string
      textarea2.value = `Radio: ${r}\nÁrea: ${area}\nPerímetro: ${perimetro}`;
      textarea2.parentElement.style.display = 'block';
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 3 (Palíndromo)
  // -------------------------------------------------
  const form3 = document.getElementById('formPalindrome');
  const input3 = document.getElementById('inputWord');
  const textarea3 = document.getElementById('resultPalindrome');

  if (form3 && input3 && textarea3) {
    form3.addEventListener('submit', e => {
      e.preventDefault();
      const texto = input3.value;
      const resultado = esPalindromo(texto);
      textarea3.value = `Palabra: "${texto}"\n¿Es palíndromo?: ${resultado}`;
      textarea3.parentElement.style.display = 'block';
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 4 (FizzBuzz)
  // -------------------------------------------------
  const form4 = document.getElementById('formFizzBuzz');
  const textarea4 = document.getElementById('resultFizzBuzz');

  if (form4 && textarea4) {
    form4.addEventListener('submit', e => {
      e.preventDefault();
      const resultado = fizzBuzz();
      textarea4.value = resultado;
      textarea4.parentElement.style.display = 'block';
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 5 (Arrays)
  // -------------------------------------------------
  const form5 = document.getElementById('formArray');
  const textarea5 = document.getElementById('resultArray');

  if (form5 && textarea5) {
    form5.addEventListener('submit', e => {
      e.preventDefault();
      textarea5.value = procesarArray();
      textarea5.parentElement.style.display = 'block';
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 6 (JSON)
  // -------------------------------------------------
  const form6 = document.getElementById('formJson');
  const input6 = document.getElementById('inputJson');
  const textarea6 = document.getElementById('resultJson');

  if (form6 && input6 && textarea6) {
    form6.addEventListener('submit', e => {
      e.preventDefault();
      textarea6.value = parsearJSON(input6.value);
      textarea6.parentElement.style.display = 'block';
    });
  }

  // -------------------------------------------------
  // Configuración del Reto 7 (Validar Edad)
  // -------------------------------------------------
  const form7 = document.getElementById('formEdad');
  const input7 = document.getElementById('inputEdad');
  const textarea7 = document.getElementById('resultEdad');

  if (form7 && input7 && textarea7) {
    form7.addEventListener('submit', e => {
      e.preventDefault();
      const edad = Number(input7.value);
      
      // Aquí capturamos el error que podría lanzar validarEdad
      try {
        const mensaje = validarEdad(edad);
        textarea7.value = mensaje; // Si no hay error, mostramos mensaje de éxito
      } catch (error) {
        textarea7.value = error; // Si hay error (throw), mostramos el mensaje de error capturado
      }
      textarea7.parentElement.style.display = 'block';
    });
  }
});
