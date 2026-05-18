import { renderMath } from './utils.js';

export function renderPracticeCard(item, idx){
  const card = document.createElement('div');
  card.className = 'card';
  const p = item.p; // parámetros instanciados
  const statement = item.enunciado(p);
  const hint = item.pista ? item.pista(p) : '';
  const label = item.answerLabel || 'Tu respuesta (valor numerico o probabilidad en [0,1])';
  const placeholder = item.placeholder || 'Ej: 0.384';
  card.innerHTML = `
    <div class="card-meta">
      <span class="badge">${item.unidad || 'Inferencia'}</span>
      <span class="badge muted">Nivel: ${item.nivel}</span>
    </div>
    <h3>${item.titulo || 'Ítem'}</h3>
    ${item.contexto ? `<p class="muted-text">${item.contexto}</p>` : ''}
    <p>${renderMath(statement)}</p>
    ${hint ? `<details><summary>Pista</summary><p>${renderMath(hint)}</p></details>` : ''}
    <label for="ans_${idx}">${label}</label>
    <input id="ans_${idx}" type="text" placeholder="${placeholder}" />
  `;
  return card;
}
