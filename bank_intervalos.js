import { zFromCumulative } from './utils.js';

export const bankIntervalos = [
  {
    id: 'ic_media_limite_inferior',
    nivel: 'intermedio',
    unidad: 'Intervalos de confianza',
    titulo: 'Resistencia media de material',
    contexto: 'Control de calidad en ensayos de traccion',
    answerLabel: 'Limite inferior del IC 95%',
    placeholder: 'Ej: 80.83',
    enunciado: (p) => `En ${p.n} probetas se observa una resistencia media de ${p.xbar} MPa. Si el desvio poblacional conocido es $\\sigma=${p.sigma}$ MPa, calcula el limite inferior del IC ${Math.round(p.conf*100)}\\% para $\\mu$.`,
    params: () => ({ xbar: 82.4, sigma: 4.8, n: 36, conf: 0.95 }),
    pista: () => `Con $\\sigma$ conocido: $\\bar x \\pm z_{1-\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$.`,
    solucion: (p) => {
      const alpha = 1 - p.conf;
      const z = zFromCumulative(1 - alpha / 2);
      const se = p.sigma / Math.sqrt(p.n);
      const margen = z * se;
      const lower = p.xbar - margen;
      const upper = p.xbar + margen;
      return {
        se: +se.toFixed(3),
        z: +z.toFixed(3),
        margen: +margen.toFixed(3),
        respuesta: +lower.toFixed(3),
        detalle: `IC ${Math.round(p.conf*100)}% = [${lower.toFixed(3)}, ${upper.toFixed(3)}] MPa.`
      };
    }
  },
  {
    id: 'ic_prop_defectos_superior',
    nivel: 'basico',
    unidad: 'Intervalos de confianza',
    titulo: 'Proporcion de piezas defectuosas',
    contexto: 'Linea de manufactura',
    answerLabel: 'Limite superior del IC 95%',
    placeholder: 'Ej: 0.099',
    enunciado: (p) => `En una muestra de ${p.n} piezas se detectan ${p.x} defectuosas. Estima el limite superior del IC ${Math.round(p.conf*100)}\\% para la proporcion real de defectos.`,
    params: () => ({ n: 420, x: 31, conf: 0.95 }),
    pista: () => `Usa $\\hat p=x/n$ y $\\hat p \\pm z_{1-\\alpha/2}\\sqrt{\\hat p(1-\\hat p)/n}$.`,
    solucion: (p) => {
      const phat = p.x / p.n;
      const alpha = 1 - p.conf;
      const z = zFromCumulative(1 - alpha / 2);
      const se = Math.sqrt(phat * (1 - phat) / p.n);
      const margen = z * se;
      const lower = Math.max(0, phat - margen);
      const upper = Math.min(1, phat + margen);
      return {
        phat: +phat.toFixed(4),
        se: +se.toFixed(4),
        margen: +margen.toFixed(4),
        respuesta: +upper.toFixed(4),
        detalle: `IC ${Math.round(p.conf*100)}% = [${lower.toFixed(4)}, ${upper.toFixed(4)}].`
      };
    }
  },
  {
    id: 'ic_media_tamano_muestra',
    nivel: 'intermedio',
    unidad: 'Diseno de estudios',
    titulo: 'Tamano de muestra para error maximo',
    contexto: 'Planificacion de mediciones de consumo energetico',
    answerLabel: 'Tamano minimo de muestra',
    placeholder: 'Ej: 35',
    enunciado: (p) => `Se desea estimar el consumo medio de un motor con error maximo ${p.e} kWh y confianza ${Math.round(p.conf*100)}\\%. Estudios previos sugieren $\\sigma=${p.sigma}$ kWh. Calcula el tamano minimo de muestra.`,
    params: () => ({ sigma: 2.1, e: 0.6, conf: 0.95 }),
    pista: () => `Despeja $n=\\left(\\dfrac{z_{1-\\alpha/2}\\sigma}{E}\\right)^2$ y redondea hacia arriba.`,
    solucion: (p) => {
      const alpha = 1 - p.conf;
      const z = zFromCumulative(1 - alpha / 2);
      const nRaw = (z * p.sigma / p.e) ** 2;
      return {
        z: +z.toFixed(3),
        nRaw: +nRaw.toFixed(3),
        respuesta: Math.ceil(nRaw),
        detalle: `n calculado = ${nRaw.toFixed(3)}; se debe redondear hacia arriba.`
      };
    }
  }
];
