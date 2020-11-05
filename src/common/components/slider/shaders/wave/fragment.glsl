precision mediump float;

varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float uDragSpeed;

vec2 barrelPincushion(vec2 uv, float strength) {
    vec2 st = uv - 0.5;
    st.x *= 0.8;

    float theta = atan(st.x, st.y);
    float radius = sqrt(dot(st, st));
    radius *= 1.0 + strength * radius * radius;

    return 0.5 + radius * vec2(sin(theta), cos(theta));
}

void main() {
    //vec2 barrelEffect = barrelPincushion(vUv, uDragSpeed);
    //vec3 color = texture2D(tDiffuse, barrelEffect).rgb;

    vec3 color = texture2D(tDiffuse, vUv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
