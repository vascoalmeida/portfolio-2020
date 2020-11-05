import Page from "common/abstractions/page.js";
import Slider from "common/components/slider/index.js";

class Work extends Page {
    constructor() {
        super();
        this.initSlider = this.initSlider.bind(this);

        this.sliderDom = document.querySelector(".slider");

        this.initSlider();
    }

    initSlider() {
        this.slider = new Slider({
            vertical: true,
            sliderDom: this.sliderDom,
			alternate: true,
        });
    }
};

export default Work;
