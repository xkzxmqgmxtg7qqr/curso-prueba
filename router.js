import { viewInicio, viewRuta, viewTeoria, viewSimulador, viewPractica, viewResultados } from './ui.js';
import { sampleInferenceItems } from './bank_inferencia.js';
import { getSummary } from './storage.js';

export function initRouter(){
  const app = document.getElementById('app');
  const render = () => {
    const route = location.hash || '#/inicio';
    if (route.startsWith('#/inicio')) {
      viewInicio(app);
    } else if (route.startsWith('#/ruta')) {
      viewRuta(app);
    } else if (route.startsWith('#/teoria')) {
      viewTeoria(app);
    } else if (route.startsWith('#/simulador')) {
      viewSimulador(app);
    } else if (route.startsWith('#/practica')) {
      const lote = sampleInferenceItems({ k: 6 });
      viewPractica(app, lote);
    } else if (route.startsWith('#/resultados')) {
      viewResultados(app, getSummary());
    } else {
      location.hash = '#/inicio';
    }
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
  };
  window.addEventListener('hashchange', render);
  render();
}
