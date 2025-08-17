import { cdfChiSquare } from './utils.js';

export const bankVar = [
  {
    id:'var_upper_tail', nivel:'intermedio', titulo:'Cola superior (chi-cuadrado)',
    enunciado: (p) => `Para $X \sim N(\mu, ${p.sigma}^2)$, con $n=${p.n}$, halla $P\left( S^2 > ${p.c} \right)$.`,
    params: () => ({ sigma: 8, n: 20, c: 70 }),
    pista: (p) => `Usa $\chi^2=\dfrac{(n-1)S^2}{\sigma^2}$ con gl=$n-1$.`,
    solucion: (p) => {
      const df = p.n - 1;
      const chi = (df * p.c) / (p.sigma**2);
      const pval = 1 - cdfChiSquare(chi, df);
      return { df, chi:+chi.toFixed(3), prob:+pval.toFixed(4) };
    }
  }
];
