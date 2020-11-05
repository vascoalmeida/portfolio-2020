const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "build")));

/*app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

app.get("/work", (req, res) => {
    res.render("pages/work", {
        page: "work",
        projects: [
            {
                title: "ApfAnalytics",
                cover: "https://picsum.photos/900/600",
            },
            {
                title: "GERE",
                cover: "https://picsum.photos/900/600",
            },
            {
                title: "Museu Virtual da Imprensa",
                cover: "https://picsum.photos/900/600",
			},
        ],
    });
});

app.get("/case", (req, res) => {
	res.render("pages/case", {
		page: "case",
		coverImage: "https://picsum.photos/1920/1080",
		projectName: "ApfAnalytics",
		projectInfo: [
			{
				label: "Role",
				value: "Front end, Design",
			},
			{
				label: "Year",
				value: "2020",
			},
		],
		projectImages: [
			"https://picsum.photos/1920/1080",
			"https://picsum.photos/1920/1080",
			"https://picsum.photos/1920/1080",
			"https://picsum.photos/1920/1080",
		],
	});
});

app.get("/", (req, res) => {
	res.render("pages/landing", {
		page: "landing",
	});
});

app.listen(port, console.log(`Server listening on port ${port}`));
