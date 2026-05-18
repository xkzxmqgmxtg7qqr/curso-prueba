import { cdfStandardNormal } from './utils.js';

export const bankHipotesis = [
  {
    id: 'test_media_pvalor_bilateral',
    nivel: 'avanzado',
    unidad: 'Pruebas de hipotesis',
    titulo: 'Calibracion de sensor',
    contexto: 'Metrologia e instrumentacion',
    answerLabel: 'p-valor bilateral',
    placeholder: 'Ej: 0.0105',
    enunciado: (p) => `Un sensor debe medir $\\mu_0=${p.mu0}$ V en promedio. En ${p.n} lecturas se obtiene $\\bar x=${p.xbar}$ V. Si $\\sigma=${p.sigma}$ V, calcula el p-valor bilateral para $H_0:\\mu=${p.mu0}$ vs. $H_1:\\mu\\ne${p.mu0}$.`,
    params: () => ({ mu0: 12, xbar: 12.16, sigma: 0.5, n: 64 }),
    pista: () => `Calcula $z=(\\bar x-\\mu_0)/(\\sigma/\\sqrt n)$ y luego $p=2P(Z>|z|)$.`,
    solucion: (p) => {
      const se = p.sigma / Math.sqrt(p.n);
      const z = (p.xbar - p.mu0) / se;
      const pvalor = 2 * (1 - cdfStandardNormal(Math.abs(z)));
      return {
        se: +se.toFixed(4),
        z: +z.toFixed(3),
        respuesta: +pvalor.toFixed(4),
        detalle: `z = ${z.toFixed(3)}; p-valor bilateral = ${pvalor.toFixed(4)}.`
      };
    }
  },
  {
    id: 'test_media_estadistico_z',
    nivel: 'basico',
    unidad: 'Pruebas de hipotesis',
    titulo: 'Tiempo medio de ciclo',
    contexto: 'Ingenieria de procesos',
    answerLabel: 'Estadistico z',
    placeholder: 'Ej: -1.80',
    enunciado: (p) => `El tiempo objetivo de ciclo es $\\mu_0=${p.mu0}$ s. Con ${p.n} observaciones se obtiene $\\bar x=${p.xbar}$ s y se conoce $\\sigma=${p.sigma}$ s. Calcula el estadistico $z$ para contrastar la media.`,
    params: () => ({ mu0: 18, xbar: 17.64, sigma: 1.2, n: 36 }),
    pista: () => `Usa $z=(\\bar x-\\mu_0)/(\\sigma/\\sqrt n)$. El signo indica la direccion de la evidencia.`,
    solucion: (p) => {
      const se = p.sigma / Math.sqrt(p.n);
      const z = (p.xbar - p.mu0) / se;
      return {
        se: +se.toFixed(3),
        respuesta: +z.toFixed(3),
        detalle: `SE = ${se.toFixed(3)}; z = ${z.toFixed(3)}.`
      };
    }
  },
  {
    id: 'test_prop_pvalor_cola_inferior',
    nivel: 'intermedio',
    unidad: 'Pruebas de hipotesis',
    titulo: 'Reduccion de fallas',
    contexto: 'Confiabilidad de componentes',
    answerLabel: 'p-valor de cola inferior',
    placeholder: 'Ej: 0.0276',
    enunciado: (p) => `Historicamente la proporcion de fallas es $p_0=${p.p0}$. Tras una mejora, fallan ${p.x} de ${p.n} componentes. Calcula el p-valor para $H_1:p<p_0$.`,
    params: () => ({ p0: 0.08, n: 300, x: 15 }),
    pista: () => `Bajo $H_0$, usa $SE_0=\\sqrt{p_0(1-p_0)/n}$ y $z=(\\hat p-p_0)/SE_0$.`,
    solucion: (p) => {
      const phat = p.x / p.n;
      const se0 = Math.sqrt(p.p0 * (1 - p.p0) / p.n);
      const z = (phat - p.p0) / se0;
      const pvalor = cdfStandardNormal(z);
      return {
        phat: +phat.toFixed(4),
        se0: +se0.toFixed(4),
        z: +z.toFixed(3),
        respuesta: +pvalor.toFixed(4),
        detalle: `phat = ${phat.toFixed(4)}, z = ${z.toFixed(3)}, p-valor = ${pvalor.toFixed(4)}.`
      };
    }
  }
];
