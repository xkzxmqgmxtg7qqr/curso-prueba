import { bankMedia } from './bank_media.js';
import { bankVar } from './bank_varianza.js';
import { bankProp } from './bank_proporcion.js';

const bank = [...bankMedia, ...bankVar, ...bankProp];

function nearlyEqual(a, b, tol=1e-3){
  return Math.abs(a - b) <= tol;
}

export function gradeAttempt(payload){
  const filas = [];
  (payload.respuestas || []).forEach(r => {
    const item = bank.find(x => x.id === r.id);
    if (!item) return;
    const sol = item.solucion(r.params);
    const ans = parseFloat(r.ans);
    let ok = false, msg = '';
    if (Number.isFinite(ans)){
      const target = sol.prob ?? sol.c ?? sol.z ?? sol.z2 ?? sol.z1;
      ok = Number.isFinite(target) && nearlyEqual(ans, target, 2e-2);
      msg = ok ? '¡Bien!' : `Esperado ≈ ${target}`;
    } else {
      msg = 'Ingresa un número válido';
    }
    filas.push({ id: item.id, ok, ans: r.ans, msg });
  });
  return filas;
}
