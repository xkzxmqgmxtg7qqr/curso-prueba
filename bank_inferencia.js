import { bankMedia } from './bank_media.js';
import { bankProp } from './bank_proporcion.js';
import { bankVar } from './bank_varianza.js';
import { bankIntervalos } from './bank_intervalos.js';
import { bankHipotesis } from './bank_hipotesis.js';

export const bankInferencia = [
  ...bankIntervalos,
  ...bankHipotesis,
  ...bankMedia.map(item => ({ ...item, unidad: item.unidad || 'Distribuciones muestrales' })),
  ...bankProp.map(item => ({ ...item, unidad: item.unidad || 'Distribuciones muestrales' })),
  ...bankVar.map(item => ({ ...item, unidad: item.unidad || 'Distribuciones muestrales' }))
];

function shuffle(items){
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function sampleInferenceItems({ k = 6 } = {}){
  return shuffle(bankInferencia)
    .slice(0, k)
    .map((item) => ({ ...item, p: item.params() }));
}
