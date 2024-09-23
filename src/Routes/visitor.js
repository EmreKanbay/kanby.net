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


		if(/^([A-Z]{1}[a-z]+)$/.test(req.params.lang)){

			const query = await Index.pool.query("SELECT * FROM variables");
			if (query.rows[0].value.includes(req.params.lang)) {
			req.langCode = query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)]
			req.language = req.params.lang
			req.clientIP = typeof req?.header('x-forwarded-for') == "string" ? req?.header('x-forwarded-for').split(",")[0] : ""
	
			next()
			} else {
			res.send(await Pages.NotFound.html({ language: "English", langCode:"en"}));
			}

		}else {
			res.send(await Pages.NotFound.html({ language: "English", langCode:"en"}));
			}

	} catch (e) {
		console.log(e);
		res.send("Error");
	}
});

const subVisitor = Index.express.Router()

visitor.use("/:lang/", subVisitor)

subVisitor.get("/", async (req, res, next) => {
	try {

res.send(await Pages.LandingPage.html({ language: req.language, langCode:req.langCode, reqIp: req.clientIP}));
	
	} catch (e) {
		console.log(e);
		res.send("Error");
	}
});

subVisitor.get("/blogs/", async (req, res, next) => {
	try {
		res.send(await Pages.Blogs.html({ language: req.language, langCode:req.langCode }));
	} catch (error) {
		console.log(error);

		res.send("Error");
	}
});

subVisitor.get("/blogs/:id", async (req, res, next) => {
	try {

		 
		const text = `SELECT ARRAY(SELECT id FROM blogs WHERE language= $1) AS ids`;
		var record = await Index.pool.query(text, [req.language]);

		if(/^[0-9]+$/.test(req.params.id)){
			if(record.rows[0].ids.includes(Number(req.params.id))){
				res.send(await Pages.SingleBlog.html({ language: req.language, blog_id: req.params.id, langCode:req.langCode }));
			}else{
				res.send(await Pages.NotFound.html({ language: req.language, langCode: req.langCode}));
			}
		}else{
			res.send(await Pages.NotFound.html({ language: req.language, langCode: req.langCode}));
		}

	
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

subVisitor.get("/projects/", async (req, res, next) => {
	try {

		res.send(await Pages.Projects.html({ language: req.language, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

subVisitor.get("/projects/:id", async (req, res, next) => {
	try {

		const text = `SELECT ARRAY(SELECT id FROM projects) AS ids`;
		var record = await Index.pool.query(text);


		if(/^[0-9]+$/.test(req.params.id)){

			if(record.rows[0].ids.includes(Number(req.params.id))){

				res.send(await Pages.SingleProject.html({ language: req.language, id: req.params.id, langCode:req.langCode }));
			}else{
				res.send(await Pages.NotFound.html({ language: req.language, langCode: req.langCode}));
	
			}
		}else{
			res.send(await Pages.NotFound.html({ language: req.language, langCode: req.langCode}));

		}


	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

subVisitor.get("/contact/", async (req, res, next) => {
	try {
		res.send(await Pages.Contact.html({ language: req.language, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});





subVisitor.get("/about/", async (req, res, next) => {
	try {
		res.send(await Pages.About.html({ language: req.language, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

subVisitor.get("/services/", async (req, res, next) => {
	try {
		res.send(await Pages.Services.html({ language: req.language, langCode:req.langCode }));
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});



visitor.use("/:lang", async (req, res, next) => {
	try {

		if(req.method == "GET"){

			const query = await Index.pool.query("SELECT * FROM variables");
			if (query.rows[0].value.includes(req.params.lang)) {
			const langCode = query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)]

			res.send(await Pages.NotFound.html({ language: req.language, langCode: langCode}));
		
			} else {
			res.send(await Pages.NotFound.html({ language: "English", langCode:"en"}));
			}

		}else{

			res.status(405).send({
				error: 'Method Not Allowed',
				message: `The method ${req.method} is not allowed for the requested endpoint.`
			});
		}


 
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
});

module.exports = visitor;
