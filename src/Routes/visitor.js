const Index = require("#Index");

const Pages = require("#Pages");

const visitor = Index.express.Router();

visitor.get("/", async (req, res, next) => {
	res.redirect(new URL(`/Turkish/`, req.protocol + "://" + req.get("host")));

	// res.send(await Pages.LandingPage.html({}))
});

visitor.get("/:lang", async (req, res, next) => {


	const query = await Index.pool.query("SELECT * FROM variables")

 	if(query.rows[0].value.includes(req.params.lang)){

		 res.send(await Pages.LandingPage.html({language: req.params.lang}));

	}
	else{
		next()
	}
});


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
