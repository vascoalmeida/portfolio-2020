precision mediump float;

uniform float uShift;
varying vec2 vUv;
varying float vTextureWave;

void main() {
    vec3 pos = position;
    float intensity = 0.125;
    float pi = 3.14159;

    pos.x = pos.x + ((sin(uv.y * pi) * uShift * 1.1) * 0.0005) / 3.5;
    vUv = uv;
    vTextureWave = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
