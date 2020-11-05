import {Scene, WebGLRenderer, Color, PerspectiveCamera} from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
import {FilmPass} from "three/examples/jsm/postprocessing/FilmPass.js";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
import Camera from "./abstractions/camera.js";
import DomRegistery from "./domRegistery.js";

class Canvas {
    constructor() {
        this.init = this.init.bind(this);
        this.addFX = this.addFX.bind(this);
		this.addToScene = this.addToScene.bind(this);
        this.bindEvents = this.bindEvents.bind(this);
        this.resizeRenderer = this.resizeRenderer.bind(this);
		this.getCamera = this.getCamera.bind(this);
        this.render = this.render.bind(this);

        this.composer = null;
        this.renderer = null;
        this.camera = null;
        this.scene = null;
        this.FX = [];
        this.perspective = 800;
        this.window = {
            retina: 4,
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.init();
        this.bindEvents();
        this.render();
    }

    init() {
		// Calculate canvas units into pixels
        const {retina, width, height} = this.window; 
        const horizontalFov = 2 * Math.atan(height / 2 / this.perspective);
        const fov = (180 * horizontalFov) / Math.PI;
        const aspect = width / height;

		// Setup camera, scene & renderer
        const camera = new Camera("perspective", [fov, aspect, 0.1, 10000]);
        this.camera = camera.getReference();
        this.camera.position.set(0, 0, this.perspective);

        this.scene = new Scene();
        this.renderer = new WebGLRenderer({
            alpha: true,
        });

        this.renderer.setPixelRatio(retina);
        this.renderer.setSize(width, height);
        this.renderer.domElement.className = "canvas";

		// Enable post-processing
        this.composer = new EffectComposer(this.renderer);
        this.addFX(RenderPass, [this.scene, this.camera, null, false]);

        document.body.appendChild(this.renderer.domElement);

		// Register all DOM that has an OpenGL counterpart, create their
		// respective 3D objects and add them to the canvas's scene
		DomRegistery.setCanvas(this);
        DomRegistery.registerAll();
    }

    addFX(effectConstructor, args=[]) {
        const effect = new effectConstructor(...args);
        const effectID = this.FX.length;
        const effectMaterial = effect.material || null;
        const effectData = {
            id: this.FX.length,
            effect,
            material: effectMaterial
        };

        this.composer.addPass(effect);
        this.FX.push(effectData);

        // Since objects in JavaScript are passed by reference (not by value),
        // returning the effectData allows other classes & functions to modify
        // its properties while propagating those changes to the object stored
        // in the 'this.FX' array.
        return effectData;
    }

	addToScene(mesh) {
		this.scene.add(mesh);
	}

    bindEvents() {
        window.addEventListener("resize", this.resizeRenderer);
    }

    resizeRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

	getCamera() {
		return this.camera;
	}

    render() {
        this.composer.render();
        requestAnimationFrame(this.render);
    }
}

// Initializing the class on export makes it possible for multiple files to
// share the same instance, independently of the number of 'imports' made
export default new Canvas;
