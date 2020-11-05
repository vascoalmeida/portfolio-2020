import Canvas from "../index.js";
import {lerp} from "common/utils/math.js";

class GlObject {
	constructor({element, updatePos=true}) {
		this.create = this.create.bind(this);
		this.destroy = this.destroy.bind(this);
		this.setMesh = this.setMesh.bind(this);
		this.updateElementPosition = this.updateElementPosition.bind(this);
		this.updateMeshPosition = this.updateMeshPosition.bind(this);
		this.getElementPosition = this.getElementPosition.bind(this);

		this.element = element;
		this.updatePos = updatePos;
		this.mesh = null;
		this.elementPosition = {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
		};

		this.create();
	}

	create() {
		requestAnimationFrame(this.updateElementPosition);
		return true;
	}

	async destroy() {
		// TODO: Remove mesh from canvas's scene & dispose of unused assets,
		// such as geometry and material
		return true;
	}

	getMesh() {
		return this.mesh;
	}

	setMesh(mesh) {
		this.mesh = mesh;
	}

	setSmoothMovement(isEnabled) {
		this.smoothMovement = isEnabled;
	}

	updateElementPosition() {
		requestAnimationFrame(this.updateElementPosition)
		const el = this.element;

		if(!this.mesh || !el) return;

		const {width, height, top, left} = el.getBoundingClientRect();
		this.elementPosition.width = width;
		this.elementPosition.height = height;
		this.elementPosition.top = -top + window.innerHeight/2 - height/2;
		this.elementPosition.left = left - window.innerWidth/2 + width/2;

		this.updateMeshPosition();
	}

	updateMeshPosition() {
		const {width, height, top, left} = this.elementPosition;
		const {uniforms} = this.material;

		let newTop = top;

		if(this.smoothMovement) {
			newTop = lerp(this.mesh.position.y, top);
		}
		
		this.mesh.position.set(left, newTop, 0);
		this.mesh.scale.set(width, height, this.mesh.scale.z);
	}

	getElementPosition() {
		return this.elementPosition;
	}
};

export default GlObject;
