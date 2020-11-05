import {PerspectiveCamera, OrthographicCamera} from "three";

class Camera {
    constructor(type, args=[]) {
        this.init = this.init.bind(this);
        this.getReference = this.getReference.bind(this);

        this.type = type;
        this.args = args;
        this.camera = null;
        this.typeMap = {
            perspective: PerspectiveCamera,
            orthogonal: OrthographicCamera,
        };

        this.init();
    }

    init() {
        const construct = this.typeMap[this.type];
        this.camera = new construct(...this.args);
    }

    getReference() {
        return this.camera;
    }
};

export default Camera;
