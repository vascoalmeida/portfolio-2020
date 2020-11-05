import {
	PlaneBufferGeometry,
	ShaderMaterial,
	Mesh,
	Clock,
} from "three";

import GlObject from "../abstractions/glObject.js";
import wave2d from "../shaders/export/waves.js";

const geometry = new PlaneBufferGeometry(1, 1, 30, 30);

class Grid extends GlObject {
	constructor({element}) {
		super({element});

		this.updateUniforms = this.updateUniforms.bind(this);

		this.geometry = geometry;
		this.material = new ShaderMaterial({
			uniforms: {
				uTime: {value: 0.0},
			},
			wireframe: true,
			vertexShader: wave2d.vertex,
			fragmentShader: wave2d.fragment,
		});
		this.mesh = new Mesh(this.geometry, this.material);
		this.clock = new Clock();
		this.mesh.rotation.x = 90;

		this.setMesh(this.mesh);
		this.updateUniforms();
	}

	updateUniforms() {
		const elapsedTime = this.clock.getElapsedTime();
		this.material.uniforms.uTime.value = elapsedTime;

		this.mesh.rotation.z += 0.001;
		requestAnimationFrame(this.updateUniforms);
	}
};

export default Grid;
