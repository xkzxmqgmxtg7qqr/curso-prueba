import { viewTeoria, viewPractica, viewResultados } from './ui.js';
import { sampleItemsMedia } from './bank_media.js';
import { getSummary } from './storage.js';

export function initRouter(){
  const app = document.getElementById('app');
  const render = () => {
    const route = location.hash || '#/teoria';
    if (route.startsWith('#/teoria')) {
      viewTeoria(app);
    } else if (route.startsWith('#/practica')) {
      const lote = sampleItemsMedia({ k: 3 });
      viewPractica(app, lote);
    } else if (route.startsWith('#/resultados')) {
      viewResultados(app, getSummary());
    } else {
      location.hash = '#/teoria';
    }
    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
  };
  window.addEventListener('hashchange', render);
  render();
}
