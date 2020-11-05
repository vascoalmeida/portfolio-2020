import snoise from "../reusable/snoise.glsl";

const shader = {
	vertex: `
		precision mediump float;

		uniform float uTime;

		${snoise}

		void main() {
			vec3 pos = position;
  			float noiseFreq = 3.5;
  			float noiseAmp = 65.0; 
			float time = uTime / 4.0;

  			vec3 noisePos = vec3(pos.x * noiseFreq + time, pos.y, pos.z);
  			pos.z += snoise3(noisePos) * noiseAmp;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
		}
	`,

	fragment: `
		precision mediump float;

		void main() {
			gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
		}
	`,
};

export default shader;
