import bindMethods from "common/utils/bindMethods.js";
import Landing from "./landing/index.js";
import Work from "./work/index.js";
import Case from "./case/index.js";

new class {
    constructor() {
		bindMethods(this);

        this.pageContent = document.querySelector("#content");
        this.currentPage = null;
        this.pageConstructors = {
            work: Work,
			case: Case,
			landing: Landing,
        };

        this.createPage();
    }

    async createPage() {
        const pageName = this.pageContent.dataset.page;
        const page = this.pageConstructors[pageName];

		try {
			if(this.currentPage) {
				await this.currentPage.destroy();
			}

			this.currentPage = new page();
			await this.currentPage.create();
		}
		catch(err) {
			const p = pageName;
			console.error(`Failed to create/destroy page '${p}'.\n${err}`);
		}
    }
};
