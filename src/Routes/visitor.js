const Index = require("#Index");

const Pages = require("#Pages");

const visitor = Index.express.Router();

visitor.get("/", async (req, res, next) => {
 	try {
		res.redirect(new URL(`/Turkish/`, req.protocol + "://" + req.get("host")));
	} catch (e) {
		res.send("Error");
		console.log(e);
	}

	// res.send(await Pages.LandingPage.html({}))
});

visitor.use("/:lang", async (req, res, next) => {
	try {
		const query = await Index.pool.query("SELECT * FROM variables");
		if (query.rows[0].value.includes(req.params.lang)) {
		req.langCode = query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)]
	
		next()
		} else {
		res.send(await Pages.NotFound.html({ language: "English", langCode:"en"}));
		}
	} catch (e) {
		console.log(e);
		res.send("Error");
	}
});


visitor.get("/:lang/", async (req, res, next) => {
	try {
		const query = await Index.pool.query("SELECT * FROM variables");
		if (query.rows[0].value.includes(req.params.lang)) {
				
			res.send(await Pages.LandingPage.html({ language: req.params.lang, langCode:req.langCode, reqIp: typeof req?.header('x-forwarded-for') == "string" ? req?.header('x-forwarded-for').split(",")[0] : ""}));
		} else {
			next();
		}
	} catch (e) {
		console.log(e);
		res.send("Error");
	}
});

visitor.get("/:lang/blogs/", async (req, res, next) => {
	try {
		res.send(await Pages.Blogs.html({ language: req.params.lang, langCode:req.langCode }));
	} catch (error) {
		console.log(error);

		res.send("Error");
	}
});

visitor.get("/:lang/blogs/:id", async (req, res, next) => {
	try {
		res.send(await Pages.SingleBlog.html({ language: req.params.lang, blog_id: req.params.id, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

visitor.get("/:lang/projects/", async (req, res, next) => {
	try {
		res.send(await Pages.Projects.html({ language: req.params.lang, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

visitor.get("/:lang/projects/:id", async (req, res, next) => {
	try {
		res.send(await Pages.SingleProject.html({ language: req.params.lang, id: req.params.id, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

visitor.get("/:lang/contact/", async (req, res, next) => {
	try {
		res.send(await Pages.Contact.html({ language: req.params.lang, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});





visitor.get("/:lang/about/", async (req, res, next) => {
	try {
		res.send(await Pages.About.html({ language: req.params.lang, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

visitor.get("/:lang/services/", async (req, res, next) => {
	try {
		res.send(await Pages.Services.html({ language: req.params.lang, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});



visitor.use("/:lang", async (req, res, next) => {
	try {
		const query = await Index.pool.query("SELECT * FROM variables");

		if (query.rows[0].value.includes(req.params.lang)) {
			res.send(await Pages.NotFound.html({ language: req.params.lang, langCode:req.langCode }));
		} else {
			res.send(await Pages.NotFound.html({ language: "English" }));
		}
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

module.exports = visitor;
