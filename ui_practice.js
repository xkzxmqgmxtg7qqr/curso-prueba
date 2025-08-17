import { renderMath } from './utils.js';

export function renderPracticeCard(item, idx){
  const card = document.createElement('div');
  card.className = 'card';
  const p = item.p; // parámetros instanciados
  const statement = item.enunciado(p);
  const hint = item.pista ? item.pista(p) : '';
  card.innerHTML = `
    <h3>${item.titulo || 'Ítem'}</h3>
    <p>${renderMath(statement)}</p>
    ${hint ? `<details><summary>Pista</summary><p>${renderMath(hint)}</p></details>` : ''}
    <label for="ans_${idx}">Tu respuesta (valor numérico o probabilidad en [0,1])</label>
    <input id="ans_${idx}" type="text" placeholder="Ej: 0.384" />
    <div class="badge">Nivel: ${item.nivel}</div>
  `;
  return card;
}
