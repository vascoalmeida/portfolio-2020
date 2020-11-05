import snoise from "../reusable/snoise.glsl"

const shader = {
	vertex: `
		precision mediump float;
		
		uniform float uTime;

		${snoise}

		void main() {
			vec3 pos = position;
			vec3 noisePos = vec3(pos.x * uTime, pos.y, pos.z);
			pos.z += snoise3(noisePos);

			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
		}
	`,
	fragment: `
		precision mediump float;

		uniform float uTime;

		void main() {
			float r = (sin(uTime) / 2.0) + 0.5;
			gl_FragColor = vec4(r, 1.0, 0.0, 1.0);
		}
	`,
};

export default shader;
