import scaleToFullscreen from "../reusable/scaleToFullscreen.glsl";

const shader = {
	vertex: `
		precision mediump float;

		uniform float uTime;
		uniform float uSpeed;
		uniform float uFullscreenProgress;

		varying vec2 vUv;
		varying float vTextureWave;

		const float PI = 3.1415926;

		${scaleToFullscreen}

		void main() {
			vec3 pos = position;
			float waveEpicenter = 0.6;
			pos.y += sin(uv.x * PI * waveEpicenter) * uSpeed * 0.002;

			vUv = uv;
			vTextureWave = pos.z;

			vec3 scaledPos = scaleToFullscreen(uv, pos, uFullscreenProgress);
			vec4 finalPos = vec4(scaledPos, 1.0);

			gl_Position = projectionMatrix * modelViewMatrix * finalPos;
		}
	`,

	fragment: `
		precision mediump float;

		uniform sampler2D uTexture;

		varying vec2 vUv;
		varying float vTextureWave;
		
		void main() {
			vec3 text = texture(uTexture, vUv + vTextureWave).rgb;
			gl_FragColor = vec4(text, 1.0);
		}
	`,
};

export default shader;
