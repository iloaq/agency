// Custom GLSL shader (minimum 1 required).
// Source: https://threejs.org/docs/#api/en/materials/ShaderMaterial

export const orbVertexShader = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPosScale;

varying float vDisp;
varying float vFresnel;
varying vec3 vPos;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);

  float n000 = hash(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);

  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);

  return mix(nxy0, nxy1, f.z);
}

void main() {
  // Normalize local positions to keep noise stable across different model scales.
  vec3 p0 = position * uPosScale;
  vPos = p0;

  float t = uTime * 0.12;
  vec3 p = p0;

  float n1 = noise(p * 1.35 + vec3(t, t * 0.7, t * 0.4));
  float n2 = noise(p * 3.10 + vec3(t * 1.6, t * 1.2, t * 0.9));
  float n = (n1 * 0.85 + n2 * 0.35);

  // Subtle displacement: pointer + scroll act as "field" perturbations.
  float field = (uPointer.x * 0.12) + (uPointer.y * 0.10) + (uScroll * 0.18);
  float disp = (n - 0.5) * 0.42 + field;

  vec3 displaced = p + normal * disp;

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vec3 viewDir = normalize(-mv.xyz);
  vec3 nrm = normalize(normalMatrix * normal);
  vFresnel = pow(1.0 - max(0.0, dot(nrm, viewDir)), 2.0);

  vDisp = disp;
  gl_Position = projectionMatrix * mv;
}
`;

export const orbFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAlpha;

varying float vDisp;
varying float vFresnel;
varying vec3 vPos;

float sat(float x){ return clamp(x, 0.0, 1.0); }

void main() {
  float t = uTime * 0.08;

  float waves = sin((vPos.x + vPos.y) * 6.0 + t) * 0.5 + 0.5;
  float mixv = sat(waves + vDisp * 0.8);

  vec3 base = mix(uColorA, uColorB, mixv);

  // Grid-like interference (R&D vibe, very subtle)
  float grid = abs(sin(vPos.x * 18.0 + t)) * abs(sin(vPos.y * 18.0 - t));
  base += grid * 0.08 * uColorA;

  // Fresnel glow (only near edges)
  float glow = pow(vFresnel, 1.2);
  base += glow * 0.45 * mix(uColorA, uColorB, 0.35);

  // Dark lab tonemapping
  base = base / (base + vec3(1.2));

  gl_FragColor = vec4(base, 0.96 * uAlpha);
}
`;

