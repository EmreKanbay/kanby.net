const Index = require("#Index");

const Pages = require("#Pages");

const visitor = Index.express.Router();

visitor.get("/", async (req, res, next) => {
	res.redirect(new URL(`/Turkish/`, req.protocol + "://" + req.get("host")));

	// res.send(await Pages.LandingPage.html({}))
});

visitor.get("/:lang/", async (req, res, next) => {


	const query = await Index.pool.query("SELECT * FROM variables")

 	if(query.rows[0].value.includes(req.params.lang)){

		 res.send(await Pages.LandingPage.html({language: req.params.lang}));

	}
	else{
		next()
	}
});


visitor.get("/:lang/blogs/", async (req, res, next) => {

	res.send(await Pages.Blogs.html({language: req.params.lang}));


})

visitor.get("/:lang/blogs/:id", async (req, res, next) => {

	res.send(await Pages.SingleBlog.html({language: req.params.lang, blog_id: req.params.id}));


})

visitor.use("/:lang", async (req, res, next) => {

	const query = await Index.pool.query("SELECT * FROM variables")
 

 	if(query.rows[0].value.includes(req.params.lang)){

 		 res.send(await Pages.NotFound.html({language: req.params.lang}));

	}
	else{
		res.send(await Pages.NotFound.html({language:"English"}));
	}
});





module.exports = visitor;
