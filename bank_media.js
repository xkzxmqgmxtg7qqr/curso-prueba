import { zFromCumulative, cdfStandardNormal } from './utils.js';

export const bankMedia = [
  {
    id: 'media_p_lt_c', nivel: 'básico', titulo: 'Probabilidad de media < c',
    enunciado: (p) => `Sea $X \sim N(${p.mu}, ${p.sigma}^2)$ y $n=${p.n}$. Calcula $P(\bar X < ${p.c})$`,
    params: () => ({ mu: 50, sigma: 10, n: 36, c: 52 }),
    pista: (p) => `Usa $SE=\sigma/\sqrt{n}$ y $Z=\dfrac{c-\mu}{SE}$.`,
    solucion: (p) => {
      const se = p.sigma / Math.sqrt(p.n);
      const z = (p.c - p.mu) / se;
      const prob = cdfStandardNormal(z);
      return { z: +z.toFixed(3), se: +se.toFixed(3), prob: +prob.toFixed(4) };
    }
  },
  {
    id: 'media_p_between', nivel: 'intermedio', titulo: 'Probabilidad a dos colas',
    enunciado: (p) => `Con $X \sim N(${p.mu}, ${p.sigma}^2)$ y $n=${p.n}$, calcula $P(${p.a} < \bar X < ${p.b})$`,
    params: () => ({ mu: 80, sigma: 12, n: 25, a: 78, b: 84 }),
    pista: () => `Estandariza ambos extremos y usa la CDF normal estándar.`,
    solucion: (p) => {
      const se = p.sigma / Math.sqrt(p.n);
      const z1 = (p.a - p.mu) / se;
      const z2 = (p.b - p.mu) / se;
      const prob = cdfStandardNormal(z2) - cdfStandardNormal(z1);
      return { z1:+z1.toFixed(3), z2:+z2.toFixed(3), se:+se.toFixed(3), prob:+prob.toFixed(4) };
    }
  },
  {
    id: 'media_find_c', nivel: 'intermedio', titulo: 'Encuentra c dado un cuantil',
    enunciado: (p) => `Con $X \sim N(${p.mu}, ${p.sigma}^2)$ y $n=${p.n}$, halla $c$ tal que $P(\bar X < c)=${p.p}$`,
    params: () => ({ mu: 100, sigma: 15, n: 49, p: 0.9 }),
    pista: () => `Busca $z_p$ y despeja $c=\mu+z_p\cdot SE$`,
    solucion: (p) => {
      const se = p.sigma / Math.sqrt(p.n);
      const z = zFromCumulative(p.p);
      const c = p.mu + z * se;
      return { se:+se.toFixed(3), z:+z.toFixed(3), c:+c.toFixed(3) };
    }
  }
];

export function sampleItemsMedia({ k=3 } = {}){
  const sel = bankMedia.slice(0, k).map(it => ({ ...it, p: it.params() }));
  return sel;
}
