import Canvas from "./index.js";
import ProjectCover from "./3dObjects/projectCover.js";
import WobblyElement from "./3dObjects/wobblyElement.js";
import Blob from "./3dObjects/blob.js";
import Grid from "./3dObjects/grid.js";

class DomRegistery {
	constructor() {
		this.canvas = null;
		this.universalId = 0;
		this.instances = {};
		this.componentMap = {
			projectCover: ProjectCover,
			wobblyElement: WobblyElement,
			blob: Blob,
			grid: Grid,
		};

	}
    registerAll() {
        const toRegister = document.querySelectorAll("[data-gl-component]");

        [...toRegister].map((element) => {
            this.registerElement(element);
        });
    }

    unregisterAll() {
        const toUnregister = document.querySelectorAll("[data-gl-id]");

        [...toUnregister].map((element) => {
            this.unregisterElement(element);
        });
    }

    registerElement(element) {
        this.universalId++;

		const construct = this.componentMap[element.dataset.glComponent];
		const instance = new construct({element});
		this.instances[this.universalId] = instance;
		this.canvas.addToScene(instance.getMesh());

        element.dataset.glId = this.universalId;
    }

    unregisterElement(element) {
		const id = element.dataset.glId;
		const instance = this.instances[element.dataset.glId];

		if(!instance) return false;

		instance.destroy()
			.then(() => {
				delete this.instances[element.dataset.glId];
			})
			.catch(() => {
				const i = instance;
				const msg = `[DOM_REGISTERY] Failed to destroy instance ${i}`;
				console.error(msg);
			});
    }

	getInstanceByElement(element) {
		const id = element.dataset.glId;
		if(!id) return;
		return this.instances[id];
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}
};

export default new DomRegistery;
