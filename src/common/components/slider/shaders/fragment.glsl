precision mediump float;

varying vec2 vUv;
varying float vTextureWave;
uniform float uShift;
uniform sampler2D uTexture;

void main() {
    float angle = 1.55;

    vec2 offset = uShift / 8.0 * vec2(cos(angle), sin(angle));
    vec3 texture = texture2D(uTexture, vUv + vTextureWave).rgb;

    gl_FragColor = vec4(texture, 0.0);
}
