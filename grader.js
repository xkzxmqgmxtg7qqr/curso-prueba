import { bankInferencia } from './bank_inferencia.js';

const bank = bankInferencia;

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
      const target = sol.respuesta ?? sol.prob ?? sol.c ?? sol.z ?? sol.z2 ?? sol.z1;
      const tol = item.tolerance ?? 2e-2;
      ok = Number.isFinite(target) && nearlyEqual(ans, target, tol);
      msg = ok ? `Correcto. ${sol.detalle || ''}` : `Esperado ≈ ${target}. ${sol.detalle || ''}`;
    } else {
      msg = 'Ingresa un número válido';
    }
    filas.push({ id: item.id, titulo: item.titulo, unidad: item.unidad, ok, ans: r.ans, msg });
  });
  return filas;
}
