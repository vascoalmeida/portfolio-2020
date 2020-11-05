import GlObject from "../abstractions/glObject.js";
import scrollBending from "../shaders/export/scrollBending.js";

import {
	PlaneBufferGeometry,
	ShaderMaterial,
	Mesh,
	Clock,
} from "three";

const geometry = new PlaneBufferGeometry(1, 1, 24, 24);

class WobblyElement extends GlObject {
	constructor({element}) {
		super({element});

		this.geometry = geometry;
		this.material = new ShaderMaterial({
			uniforms: {
				uSpeed: {value: 0.0},
				uTime: {value: 0.0},
				uFullscreenProgress: {value: 0.0},
			},
			vertexShader: scrollBending.vertex,
			fragmentShader: scrollBending.fragment,
		});
	}
};

export default WobblyElement;
