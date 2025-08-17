import { renderPracticeCard } from './ui_practice.js';
import { storeAttempt } from './storage.js';

export function viewTeoria(node){
  node.innerHTML = `
    <section class="card">
      <h2>Idea clave</h2>
      <p>Si $X \sim N(\mu, \sigma^2)$ y tomamos muestras i.i.d. de tamaño $n$, entonces la media muestral $\bar X$ cumple
      $\bar X \sim N(\mu, (\sigma/\sqrt{n})^2)$.</p>
      <div class="notice">
        <strong>Recordatorio didáctico:</strong> no confundir $\sigma$ (desvío poblacional) con el error estándar $SE=\sigma/\sqrt{n}$.
      </div>
    </section>
    <section class="card">
      <h3>Ejemplo guiado</h3>
      <p>Sea $X \sim N(50, 10^2)$ y $n=36$. Entonces $SE=10/6=1.667$. Para $c=52$, $z=\frac{52-50}{1.667}\approx 1.20$.</p>
    </section>`;
}

export function viewPractica(node, lote){
  node.innerHTML = `
    <section class="card">
      <h2>Práctica</h2>
      <p>Responde los ítems y envía tus resultados. Obtendrás retroalimentación inmediata y quedará registro local.</p>
    </section>
    <section class="grid grid-2" id="cards"></section>
    <div class="card">
      <button class="button" id="enviar">Enviar intento</button>
      <button class="button ghost" id="reiniciar">Reiniciar</button>
    </div>`;
  const cards = node.querySelector('#cards');
  lote.forEach((it, idx) => cards.appendChild(renderPracticeCard(it, idx)));

  node.querySelector('#enviar').onclick = () => {
    const payload = { actividad: 'dm_media', respuestas: [] };
    lote.forEach((it, idx) => {
      const inp = document.querySelector(`#ans_${idx}`);
      payload.respuestas.push({ id: it.id, ans: inp?.value, params: it.p });
    });
    storeAttempt(payload);
    alert('Intento guardado. Revisa resultados.');
    location.hash = '#/resultados';
  };

  node.querySelector('#reiniciar').onclick = () => {
    location.reload();
  };
}

export function viewResultados(node, resumen){
  node.innerHTML = `
    <section class="card success">
      <h2>Resultados</h2>
      <p>Intentos: <strong>${resumen.intentos}</strong> | Último: ${resumen.ultimoTS ? new Date(resumen.ultimoTS).toLocaleString() : '-'}</p>
      <table class="table">
        <thead><tr><th>Ítem</th><th>Correcta</th><th>Tu respuesta</th><th>Feedback</th></tr></thead>
        <tbody>
          ${resumen.filas.map(f => `<tr><td>${f.id}</td><td>${f.ok ? '✔︎' : '✗'}</td><td>${f.ans ?? ''}</td><td>${f.msg}</td></tr>`).join('')}
        </tbody>
      </table>
      <button class="button" onclick="location.hash='#/practica'">Reintentar</button>
    </section>`;
}
