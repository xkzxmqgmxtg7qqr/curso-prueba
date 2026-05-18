import { renderPracticeCard } from './ui_practice.js';
import { storeAttempt } from './storage.js';

export function viewInicio(node){
  node.innerHTML = `
    <section class="hero">
      <div>
        <span class="eyebrow">Curso interactivo</span>
        <h2>Aprende inferencia estadistica con problemas de ingenieria</h2>
        <p>Explora como convertir datos de laboratorio, produccion, sensores y confiabilidad en decisiones cuantitativas usando intervalos de confianza y pruebas de hipotesis.</p>
        <div class="actions">
          <a class="button" href="#/ruta">Ver ruta de aprendizaje</a>
          <a class="button ghost light" href="#/practica">Empezar practica</a>
        </div>
      </div>
      <div class="hero-panel">
        <h3>Competencias</h3>
        <ul class="checklist">
          <li>Modelar variabilidad muestral y error estandar.</li>
          <li>Construir e interpretar intervalos de confianza.</li>
          <li>Formular hipotesis para decisiones de calidad y procesos.</li>
          <li>Comunicar conclusiones con evidencia y contexto tecnico.</li>
        </ul>
      </div>
    </section>
    <section class="grid grid-3">
      <article class="card">
        <h3>1. Estimar</h3>
        <p>Usa muestras para aproximar medias, proporciones y variabilidad de sistemas reales.</p>
      </article>
      <article class="card">
        <h3>2. Cuantificar incertidumbre</h3>
        <p>Traduce el tamano de muestra y la dispersion en margen de error.</p>
      </article>
      <article class="card">
        <h3>3. Decidir</h3>
        <p>Evalua evidencia estadistica antes de cambiar parametros, procesos o proveedores.</p>
      </article>
    </section>`;
}

export function viewRuta(node){
  node.innerHTML = `
    <section class="card">
      <h2>Ruta de aprendizaje sugerida</h2>
      <p>La app esta pensada para una sesion guiada o trabajo autonomo. Cada bloque conecta una herramienta estadistica con una pregunta tipica de ingenieria.</p>
      <div class="timeline">
        <div><strong>1. Variabilidad muestral</strong><span>Distribucion de $\\bar X$, $\\hat p$ y $S^2$.</span></div>
        <div><strong>2. Intervalos de confianza</strong><span>Margen de error, nivel de confianza e interpretacion tecnica.</span></div>
        <div><strong>3. Pruebas de hipotesis</strong><span>$H_0$, $H_1$, estadistico, p-valor y decision.</span></div>
        <div><strong>4. Aplicacion</strong><span>Problemas de manufactura, energia, sensores y confiabilidad.</span></div>
      </div>
    </section>
    <section class="grid grid-2">
      <article class="card">
        <h3>Antes de resolver</h3>
        <ol>
          <li>Identifica el parametro: $\\mu$, $p$ o $\\sigma^2$.</li>
          <li>Relaciona el contexto con el modelo probabilistico.</li>
          <li>Revisa supuestos: independencia, normalidad o muestra grande.</li>
        </ol>
      </article>
      <article class="card">
        <h3>Despues de resolver</h3>
        <ol>
          <li>Incluye unidades cuando corresponda.</li>
          <li>No digas "se prueba la verdad"; habla de evidencia.</li>
          <li>Conecta el resultado con una accion de ingenieria.</li>
        </ol>
      </article>
    </section>`;
}

export function viewTeoria(node){
  node.innerHTML = `
    <section class="card">
      <h2>Inferencia: de datos a decisiones</h2>
      <p>La inferencia estadistica permite estimar parametros de una poblacion o proceso y evaluar afirmaciones usando datos muestrales. En ingenieria aparece al validar sensores, comparar procesos, estimar defectos o verificar especificaciones.</p>
      <div class="notice">
        <strong>Idea central:</strong> una muestra no entrega certeza absoluta; entrega evidencia con incertidumbre cuantificable.
      </div>
    </section>
    <section class="grid grid-2">
      <article class="card">
        <h3>Distribucion muestral</h3>
        <p>Si $X \\sim N(\\mu, \\sigma^2)$ y tomamos muestras i.i.d. de tamano $n$, entonces $\\bar X \\sim N(\\mu, (\\sigma/\\sqrt n)^2)$.</p>
        <p>El error estandar $SE=\\sigma/\\sqrt n$ mide cuanto fluctua el estimador entre muestras.</p>
      </article>
      <article class="card">
        <h3>Intervalo de confianza</h3>
        <p>Un IC para $\\mu$ con $\\sigma$ conocido usa $\\bar x \\pm z_{1-\\alpha/2}SE$.</p>
        <p>Interpretacion: el metodo, repetido muchas veces, captura el parametro en aproximadamente el nivel de confianza indicado.</p>
      </article>
      <article class="card">
        <h3>Prueba de hipotesis</h3>
        <p>Contrasta una afirmacion base $H_0$ frente a una alternativa $H_1$. El p-valor cuantifica que tan extremos son los datos si $H_0$ fuera cierta.</p>
        <p>Si $p$-valor $\\le \\alpha$, se rechaza $H_0$ con nivel de significancia $\\alpha$.</p>
      </article>
      <article class="card">
        <h3>Buenas practicas</h3>
        <ul>
          <li>Define el parametro antes de elegir formula.</li>
          <li>Verifica supuestos y tamano de muestra.</li>
          <li>Reporta unidades, nivel de confianza o significancia.</li>
          <li>Concluye en lenguaje del problema, no solo con formulas.</li>
        </ul>
      </article>
    </section>
    <section class="card">
      <h3>Ejemplo guiado: sensor de voltaje</h3>
      <p>Un sensor debe medir $12$ V. Si $n=64$, $\\bar x=12.16$ y $\\sigma=0.5$, entonces $SE=0.5/8=0.0625$ y $z=(12.16-12)/0.0625=2.56$. Un p-valor bilateral cercano a $0.0105$ indica evidencia de descalibracion al 5%.</p>
    </section>`;
}

function randomNormal(mean = 0, sd = 1){
  const u1 = Math.random() || Number.EPSILON;
  const u2 = Math.random() || Number.EPSILON;
  return mean + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function drawHistogram(svg, values, expectedMean, expectedSe){
  const width = 720;
  const height = 220;
  const pad = 28;
  const min = Math.min(...values, expectedMean - 4 * expectedSe);
  const max = Math.max(...values, expectedMean + 4 * expectedSe);
  const bins = 18;
  const counts = Array.from({ length: bins }, () => 0);
  values.forEach((value) => {
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(((value - min) / (max - min)) * bins)));
    counts[idx] += 1;
  });
  const maxCount = Math.max(...counts, 1);
  const barWidth = (width - 2 * pad) / bins;
  const xFor = (value) => pad + ((value - min) / (max - min)) * (width - 2 * pad);
  const bars = counts.map((count, i) => {
    const x = pad + i * barWidth + 1;
    const h = (count / maxCount) * (height - 2 * pad);
    const y = height - pad - h;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(barWidth - 2).toFixed(1)}" height="${h.toFixed(1)}" rx="3"></rect>`;
  }).join('');
  const meanX = xFor(expectedMean);
  svg.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Histograma de medias muestrales">
      <line class="axis" x1="${pad}" y1="${height-pad}" x2="${width-pad}" y2="${height-pad}"></line>
      <g class="bars">${bars}</g>
      <line class="mean-line" x1="${meanX.toFixed(1)}" y1="${pad}" x2="${meanX.toFixed(1)}" y2="${height-pad}"></line>
      <text x="${pad}" y="${height-6}">${min.toFixed(2)}</text>
      <text x="${width-pad-44}" y="${height-6}">${max.toFixed(2)}</text>
      <text x="${Math.min(width - 130, meanX + 6).toFixed(1)}" y="${pad+12}">media esperada</text>
    </svg>`;
}

export function viewSimulador(node){
  node.innerHTML = `
    <section class="card">
      <h2>Simulador de distribucion muestral</h2>
      <p>Modifica los parametros de un proceso normal y observa como cambia la distribucion de las medias muestrales. Es una forma visual de entender el error estandar.</p>
      <div class="form-grid">
        <label>Media poblacional $\\mu$<input id="sim_mu" type="number" value="50" step="0.1"></label>
        <label>Desvio poblacional $\\sigma$<input id="sim_sigma" type="number" value="10" min="0.1" step="0.1"></label>
        <label>Tamano muestral $n$<input id="sim_n" type="number" value="25" min="2" step="1"></label>
        <label>Numero de muestras<input id="sim_m" type="number" value="500" min="50" max="5000" step="50"></label>
      </div>
      <button class="button" id="sim_run">Simular</button>
    </section>
    <section class="card">
      <div id="sim_stats" class="stats-grid"></div>
      <div id="sim_chart" class="chart"></div>
    </section>`;

  const run = () => {
    const mu = Number(node.querySelector('#sim_mu').value);
    const sigma = Math.max(0.001, Number(node.querySelector('#sim_sigma').value));
    const n = Math.max(2, Math.round(Number(node.querySelector('#sim_n').value)));
    const m = Math.min(5000, Math.max(50, Math.round(Number(node.querySelector('#sim_m').value))));
    const means = [];
    for (let i = 0; i < m; i += 1){
      let sum = 0;
      for (let j = 0; j < n; j += 1) sum += randomNormal(mu, sigma);
      means.push(sum / n);
    }
    const avg = means.reduce((acc, value) => acc + value, 0) / means.length;
    const empiricalSe = Math.sqrt(means.reduce((acc, value) => acc + (value - avg) ** 2, 0) / (means.length - 1));
    const expectedSe = sigma / Math.sqrt(n);
    node.querySelector('#sim_stats').innerHTML = `
      <div><strong>${avg.toFixed(3)}</strong><span>Media de las medias simuladas</span></div>
      <div><strong>${empiricalSe.toFixed(3)}</strong><span>SE empirico</span></div>
      <div><strong>${expectedSe.toFixed(3)}</strong><span>SE teorico $\\sigma/\\sqrt n$</span></div>
      <div><strong>${n}</strong><span>Tamano de muestra</span></div>`;
    drawHistogram(node.querySelector('#sim_chart'), means, mu, expectedSe);
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
  };
  node.querySelector('#sim_run').onclick = run;
  run();
}

export function viewPractica(node, lote){
  node.innerHTML = `
    <section class="card">
      <h2>Practica aplicada</h2>
      <p>Responde los items y envia tus resultados. Obtendras retroalimentacion inmediata y quedara registro local en este navegador.</p>
    </section>
    <section class="grid grid-2" id="cards"></section>
    <div class="card">
      <button class="button" id="enviar">Enviar intento</button>
      <button class="button ghost" id="reiniciar">Reiniciar</button>
    </div>`;
  const cards = node.querySelector('#cards');
  lote.forEach((it, idx) => cards.appendChild(renderPracticeCard(it, idx)));

  node.querySelector('#enviar').onclick = () => {
    const payload = { actividad: 'inferencia_ingenieria', respuestas: [] };
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
  const total = resumen.filas.length;
  const correctas = resumen.filas.filter(f => f.ok).length;
  const porcentaje = total ? Math.round((correctas / total) * 100) : 0;
  node.innerHTML = `
    <section class="card success">
      <h2>Resultados</h2>
      <p>Intentos: <strong>${resumen.intentos}</strong> | Ultimo: ${resumen.ultimoTS ? new Date(resumen.ultimoTS).toLocaleString() : '-'}</p>
      <div class="stats-grid">
        <div><strong>${correctas}/${total}</strong><span>Respuestas correctas</span></div>
        <div><strong>${porcentaje}%</strong><span>Logro del ultimo intento</span></div>
      </div>
      <table class="table">
        <thead><tr><th>Item</th><th>Unidad</th><th>Correcta</th><th>Tu respuesta</th><th>Feedback</th></tr></thead>
        <tbody>
          ${resumen.filas.map(f => `<tr><td>${f.titulo || f.id}</td><td>${f.unidad || '-'}</td><td>${f.ok ? 'Si' : 'No'}</td><td>${f.ans ?? ''}</td><td>${f.msg}</td></tr>`).join('')}
        </tbody>
      </table>
      <button class="button" onclick="location.hash='#/practica'">Reintentar</button>
    </section>`;
}
