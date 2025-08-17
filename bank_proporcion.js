import { cdfStandardNormal } from './utils.js';

export const bankProp = [
  {
    id:'prop_lower', nivel:'básico', titulo:'Proporción muestral',
    enunciado: (p) => `Una población con proporción $p=${p.p}$. Con $n=${p.n}$, calcula $P(\hat p < ${p.c})$ (normal aprox.).`,
    params: () => ({ p: 0.4, n: 200, c: 0.35 }),
    pista: () => `Usa $SE=\sqrt{p(1-p)/n}$, $Z=\dfrac{c-p}{SE}$.`,
    solucion: (p) => {
      const se = Math.sqrt(p.p*(1-p.p)/p.n);
      const z = (p.c - p.p)/se;
      const prob = cdfStandardNormal(z);
      return { se:+se.toFixed(4), z:+z.toFixed(3), prob:+prob.toFixed(4) };
    }
  }
];
