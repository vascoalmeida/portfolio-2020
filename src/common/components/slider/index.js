import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass.js";
import CanvasSlide from "./canvasSlide.js";
import Slide from "./slide.js";
import Canvas from "common/components/canvas/index.js";
import DomRegistery from "common/components/canvas/domRegistery.js";
import waveFragShader from "./shaders/wave/fragment.glsl"
import waveVertShader from "./shaders/wave/vertex.glsl";
import {lerp} from "common/utils/math.js";

class Slider {
    constructor({vertical=false, sliderDom, alternate=false}) {
        this.init = this.init.bind(this);
        this.initSlides = this.initSlides.bind(this);
        this.initFX = this.initFX.bind(this);
        this.bindEvents = this.bindEvents.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
		this.onSlideClick = this.onSlideClick.bind(this);
        this.drag = this.drag.bind(this);
        this.getCurrentSlide = this.getCurrentSlide.bind(this);
		this.updateFX = this.updateFX.bind(this);

        this.sliderDom = sliderDom;
        this.vertical = vertical;

        this.slides = {
            dom: [...this.sliderDom.querySelectorAll(".slide")],
            canvas: [],
        };

        this.direction = vertical ? "scrollTop" : "scrollLeft";
        this.mouseDown = false;
        this.lastMousePosition = 0;
        this.currentSlide = 0;
        this.maxProgress = 0;
        this.distance = 0;
        this.slidesNumber = this.slides.dom.length;
        this.slidesNumber = 8;
        this.waveEffectData = {};
        this.mousePosition = {
            x: 0,
            y: 0,
        };

        this.init();
        this.initFX();
        this.initSlides();
        this.updateFX();
        this.bindEvents();
    }

    init() {
        const sliderClass = this.vertical ? "vertical" : "horizontal";
        this.sliderDom.classList.add(sliderClass);

		this.slides.dom.map((slide, index) => {
			if(index % 2 !== 0) slide.classList.add("alternate");

			// Enable smooth-movement on scroll
			const slideImg = slide.querySelector("[data-gl-id]");
			const glObject = DomRegistery.getInstanceByElement(slideImg);
			glObject.setSmoothMovement(true);
		});
    }

    initFX() {
        this.waveShader = {
            uniforms: {
                tDiffuse: {value: null},
                uDragSpeed: {value: 0.0},
            },
            vertexShader: waveVertShader,
            fragmentShader: waveFragShader,
        };

		this.waveEffectData = Canvas.addFX(ShaderPass, [this.waveShader]);
    }

    initSlides() {
        this.slides.dom.map((slideDom) => {
			const glElement = slideDom.querySelector("[data-gl-id]");
			const glInstance = DomRegistery.getInstanceByElement(glElement);

			this.slides.canvas.push(glInstance);
			Canvas.addToScene(glInstance.getMesh());
        });
    }

    bindEvents() {
        this.sliderDom.addEventListener("mousedown", this.onMouseDown);
        this.sliderDom.addEventListener("mouseup", this.onMouseUp);
        this.sliderDom.addEventListener("mousemove", this.drag);
        //this.sliderDom.addEventListener("mouseout", this.onMouseUp);

		this.slides.dom.map((slide) => {
			slide.addEventListener("click", this.onSlideClick);
		});
    }

    onMouseDown({clientX, clientY}) {
        const direction = this.vertical ? clientY : clientX;
        this.mouseDown = true;
        this.lastMousePosition = direction;
    }

    onMouseUp() {
        this.mouseDown = false;
        //this.goToSlide(this.currentSlide);
    }

	onSlideClick(ev) {
		const glInstance = DomRegistery.getInstanceByElement(ev.target);

		if(!glInstance) return;
		glInstance.animateToFullscreen();
	}

    drag({clientX, clientY}) {
        const direction = this.vertical ? clientY : clientX;
        this.distance = this.lastMousePosition - direction;
        this.lastMousePosition = direction;
        this.mousePosition = {
            x: clientX,
            y: clientY,
        };

        if(!this.mouseDown) return;

        this.sliderDom[this.direction] += this.distance * 1.5;
        this.getCurrentSlide();
    }

    getCurrentSlide() {
        this.progress = this.sliderDom[this.direction] / this.maxProgress;
        const visibleSlide = Math.round(this.progress * (this.slidesNumber-1));

        if(visibleSlide === this.currentSlide) return;

        this.currentSlide = visibleSlide;
    }

    goToSlide(slideIndex) {
        const {clientWidth} = this.imageSliderDom;
        //const offset = slideIndex*((window.innerWidth/100) * 50);
        const offset = 0;
        this.imageSliderDom[this.direction] = clientWidth*slideIndex - offset;
        this.currentSlide = slideIndex;
    }

    updateFX() {
        const {uniforms} = this.waveEffectData.material;
        const {x, y} = this.mousePosition;

        const absDistance = Math.abs(this.distance);
        const rgbShiftStr = absDistance / 30;
        const medLerp = lerp(uniforms.uDragSpeed.value, rgbShiftStr, 0.1);
        const finalStr = lerp(uniforms.uDragSpeed.value, rgbShiftStr, 0.1);

        this.distance = lerp(this.distance, 0, 0.1);
        requestAnimationFrame(this.updateFX);
    }
}

export default Slider;
