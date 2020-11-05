import {
	SphereBufferGeometry,
	ShaderMaterial,
	Mesh,
	Clock,
} from "three";

import GlObject from "../abstractions/glObject.js";
import waves from "../shaders/export/waves.js";

// Initializing geometry outside of class for performance's sake. It allows
// reusing the same geometry object (which is heavy) across multiple class
// instances.
const geometry = new SphereBufferGeometry(200, 30, 30);

class Blob extends GlObject {
	constructor({element}) {
		super({element, updatePos: false});

		this.update = this.update.bind(this);
		this.updateUniforms = this.updateUniforms.bind(this);

		this.clock = new Clock();
		this.geometry = geometry;
		this.material = new ShaderMaterial({
			uniforms: {
				uTime: {value: 0.0},
			},
			vertexShader: waves.vertex,
			fragmentShader: waves.fragment,
			wireframe: true,
		});
		this.mesh = new Mesh(this.geometry, this.material);

		this.setMesh(this.mesh);
		this.update();
	}

	update() {
		this.updateUniforms();
		this.updateRotation();

		requestAnimationFrame(this.update);
	}

	updateUniforms() {
		const elapsedTime = this.clock.getElapsedTime();
		this.material.uniforms.uTime.value = elapsedTime;
	}

	updateRotation() {
		const lastRotation = this.mesh.rotation.y;
		const divider = 500;

		this.mesh.rotation.y = lastRotation + 1 / divider;
		this.mesh.rotation.x = lastRotation / divider;
	}
};

export default Blob;
