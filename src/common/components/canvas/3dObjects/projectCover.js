import {
	Clock,
	Mesh, 
	PlaneBufferGeometry, 
	ShaderMaterial, 
	TextureLoader,
} from "three";

import GlObject from "../abstractions/glObject.js";
import scrollBending from "../shaders/export/scrollBending.js";
import Canvas from "../index.js";

const loader = new TextureLoader();
const geometry = new PlaneBufferGeometry(1, 1, 24, 24);

class ProjectCover extends GlObject {
    constructor({element}) {
		super({element});
		this.bendMesh = this.bendMesh.bind(this);
		this.getScreenSize = this.getScreenSize.bind(this);
		this.animateToFullscreen = this.animateToFullscreen.bind(this);

        this.geometry = geometry;
		this.material = new ShaderMaterial({
			uniforms: {
				uTexture: {value: loader.load(this.element.src)},
				uSpeed: {value: 0.0},
				uTime: {value: 0.0},
				uFullscreenProgress: {value: 0.0},
			},
			vertexShader: scrollBending.vertex,
			fragmentShader: scrollBending.fragment,
		});
		this.mesh = new Mesh(this.geometry, this.material);
		this.clock = new Clock();
		this.fullscreen = false;

		this.setMesh(this.mesh);
		this.getScreenSize();
		requestAnimationFrame(this.bendMesh);
    }

	bendMesh() {
		const {uniforms} = this.material;
		const {top} = this.getElementPosition();
		uniforms.uSpeed.value = (top - this.mesh.position.y) * 0.1;
		uniforms.uTime.value = this.clock.getElapsedTime();

		if(this.fullscreen) {
			uniforms.uFullscreenProgress.value += 0.01;
		}

		requestAnimationFrame(this.bendMesh);
	}

	getScreenSize() {
		//const radiansFov = 
		console.log("A", Canvas)
	}

	animateToFullscreen() {
		this.fullscreen = true;
	}
};

export default ProjectCover;
