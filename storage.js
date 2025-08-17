import { gradeAttempt } from './grader.js';

const KEY = 'dm_intentos_v1';

export function storeAttempt(payload){
  const prev = JSON.parse(localStorage.getItem(KEY) || '[]');
  const filas = gradeAttempt(payload);
  prev.push({ ts: Date.now(), ...payload, resultado: filas });
  localStorage.setItem(KEY, JSON.stringify(prev));
}

export function getSummary(){
  const data = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (!data.length) return { intentos: 0, ultimoTS: null, filas: [] };
  const last = data[data.length - 1];
  return { intentos: data.length, ultimoTS: last.ts, filas: last.resultado };
}

// Envío remoto opcional (Google Apps Script)
export async function sendRemoteToAppsScript(payload, url){
  const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  return r.ok;
}
