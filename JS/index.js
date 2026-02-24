// Convierte texto a número, true/false, null, etc. Si no puede, devuelve el texto tal cual
function parseValor(texto) {
  const t = texto.trim();          // quita espacios
  if (t === "") return "";       // vacío
  if (t === "true") return true;
  if (t === "false") return false;
  if (t === "null") return null;
  if (t === "undefined") return undefined;

  const n = Number(t);           // ¿es número?
  if (!isNaN(n)) return n;

  try { return JSON.parse(t); }  // ¿es objeto o array?
  catch { return texto; }        // si nada funciona, texto original
}

// Dice el valor y su tipo
function describirValor(valor) {
  return "El valor " + valor + " es de tipo " + typeof valor;
}

// Cuando la página esté lista
window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const input = document.getElementById('inputVar');
  const textarea = document.getElementById('resultado');

  if (form && input && textarea) {
    form.addEventListener('submit', e => {
      e.preventDefault();                               // no recargar
      const val = parseValor(input.value);              // convierte
      textarea.value = describirValor(val);             // muestra
      textarea.parentElement.style.display = 'block';   // asegura ver
    });
  }
});
