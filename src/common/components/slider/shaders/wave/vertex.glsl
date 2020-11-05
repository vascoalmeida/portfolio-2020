precision mediump float;

uniform float uDragSpeed;
varying vec2 vUv;

vec2 createEye(vec2 meshPosition, float direction) {
    vec2 meshScale = vec2(0.3);
    vec2 viewSize = vec2(1.0); // Size of clip space
    float minProgress = 0.2; // How small it gets
    float maxProgress = 1.0; // How large it gets
    float radius = 0.85; // Radius of the eye
    float hardness = 2.0; // Intensity of the eye's borders

    // Create the eye effect
    float progress = clamp(minProgress, maxProgress, uDragSpeed*0.8);
    float maxDistance = distance(vec2(0.0), vec2(radius));
    float dist = distance(vec2(0.0), uv - meshPosition);
    float activation = smoothstep(0.2, maxDistance, dist) * hardness;
    
    // Set animation strength according to drag speed
    float latestStart = 0.4;
    float startAt = activation * latestStart;
    float vertexProgress = smoothstep(startAt, 1.0, progress) * direction;

    vec2 scaleToViewSize = viewSize / meshScale - 1.0;
    return vec2(1.0 + scaleToViewSize * vertexProgress);
}

void main() {
    vUv = uv;
    vec3 pos = position.xyz;

    // The cool "loading" animation I accidently stumbled across:
    //pos.z += sin(pos.y * 5.0 + uTime) * 2.0 * 2.0;

    pos.xy *= createEye(vec2(-0.35, 0.5), 1.0);
    pos.xy *= createEye(vec2(0.5), 1.0);
    pos.xy *= createEye(vec2(1.35, 0.5), 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
