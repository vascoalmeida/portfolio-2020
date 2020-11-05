class Page {
    constructor() {
		this.create = this.create.bind(this);
		this.destroy = this.destroy.bind(this);
    }

	async create() {
		// Insert default entry animations here
	}

	async destroy() {
		// Insert default exit animations here
	}
};

export default Page;
