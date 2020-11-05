import {
    PlaneBufferGeometry,
    ShaderMaterial,
    Mesh,
    TextureLoader,
} from "three";

import {lerp} from "common/utils/math.js";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

// Reusing geometry & loader across class instances for performance's sake
const geometry = new PlaneBufferGeometry(1, 1, 16, 16);
const loader = new TextureLoader();

export default class CanvasSlide {
    constructor({slideDOM, waveEffect}) {
        this.getSlideMeasures = this.getSlideMeasures.bind(this);
        this.updateUniforms = this.updateUniforms.bind(this);
        this.updateMesh = this.updateMesh.bind(this);

        this.waveEffect = waveEffect;
        this.slideDOM = slideDOM;
        this.slideSize = {
            width: 0,
            height: 0,
        };
        this.slidePosition = {
            top: 0,
            left: 0,
        };
        this.lastPosition = 0;
        this.geometry = geometry;
        this.material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: {value: loader.load(slideDOM.src)},
                uShift: {value: 0.0},
            },
        });
        this.mesh = new Mesh(this.geometry, this.material);

        this.getSlideMeasures();
    }

    getSlideMeasures() {
        const slideDOM = this.slideDOM;
        const {width, height, top, left} = slideDOM.getBoundingClientRect();

        this.slideSize.width = width;
        this.slideSize.height = height;
        this.slidePosition.top = -top + window.innerHeight/2 - height/2;
        this.slidePosition.left = left -window.innerWidth/2 + width/2;

        this.updateUniforms();
        this.updateMesh();

        requestAnimationFrame(this.getSlideMeasures);
    }

    updateUniforms() {
        const waveUniforms = this.waveEffect.material.uniforms;
        const uDragSpeed = waveUniforms.uDragSpeed.value;
        const {uniforms} = this.material;
        const {left} = this.slidePosition;
        const {x} = this.mesh.position;
        const uShift = uniforms.uShift.value;

        const waveStrength = Math.abs((left - x) / 5000);
        waveUniforms.uDragSpeed.value = lerp(uDragSpeed, waveStrength, 0.25);
        uniforms.uShift.value = lerp(uShift, left - x, 0.1);
    }

    updateMesh() {
        const {width, height} = this.slideSize;
        const {top, left} = this.slidePosition;

        this.lastPosition += (left - this.lastPosition) * 0.008;
        //const finalPosition = Math.round(this.lastPosition * 100) / 100;
        const finalPosition = lerp(this.mesh.position.x, left, 0.04);

        this.mesh.position.set(finalPosition, top, 0);
        this.mesh.scale.set(width, height, 0);
    }
}
