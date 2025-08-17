// Render simple de fórmulas inline para MathJax
export function renderMath(s){ return s; }

// Aproximaciones numéricas (CDF normal, inverse CDF z, CDF chi2)
export function cdfStandardNormal(z){
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z*z/2);
  let p = d * t * (0.3193815 + t*(-0.3565638 + t*(1.781478 + t*(-1.821256 + t*1.330274))));
  return z > 0 ? 1 - p : p;
}

export function zFromCumulative(p){
  if (p <= 0 || p >= 1) return NaN;
  const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
  const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
  const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
             0.0276438810333863, 0.0038405729373609, 0.0003951896511919,
             0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
  let x = p - 0.5;
  if (Math.abs(x) < 0.42){
    const r = x*x;
    const num = x * (((a[3]*r + a[2])*r + a[1])*r + a[0]);
    const den = (((b[3]*r + b[2])*r + b[1])*r + 1);
    return num/den;
  }
  let r = p;
  if (x > 0) r = 1 - p;
  r = Math.log(-Math.log(r));
  let z = c[0] + r*(c[1] + r*(c[2] + r*(c[3] + r*(c[4] + r*(c[5] + r*(c[6] + r*(c[7] + r*c[8])))))));
  return x < 0 ? -z : z;
}

export function cdfChiSquare(x, k){
  if (x < 0 || k <= 0) return 0;
  const a = k/2, g = gammaLowerRegularized(a, x/2);
  return g;
}

function gammaLowerRegularized(s, x){
  if (x === 0) return 0;
  if (x < s + 1){
    let sum = 1/s, term = 1/s;
    for (let n=1; n<200; n++){
      term *= x/(s+n);
      sum += term;
      if (term < 1e-12) break;
    }
    return Math.exp(-x + s*Math.log(x) - logGamma(s)) * sum;
  } else {
    let a0 = 1, a1 = x, b0 = 0, b1 = 1, fac = 1/x;
    let gOld = a1/b1;
    for (let n=1; n<200; n++){
      const an = n - s;
      a0 = (a1 + a0*an) * fac;
      b0 = (b1 + b0*an) * fac;
      const an2 = n;
      a1 = x*a0 + an2*a1;
      b1 = x*b0 + an2*b1;
      const g = a1/b1;
      if (Math.abs(g - gOld) < 1e-12) break;
      gOld = g;
    }
    return 1 - Math.exp(-x + s*Math.log(x) - logGamma(s)) * gOld;
  }
}

function logGamma(z){
  const g = 7;
  const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI*z)) - logGamma(1 - z);
  z -= 1;
  let x = p[0];
  for (let i=1; i<p.length; i++) x += p[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5*Math.log(2*Math.PI) + (z + 0.5)*Math.log(t) - t + Math.log(x) - Math.log(z+1);
}
