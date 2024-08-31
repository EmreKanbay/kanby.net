const Pages = require("../Resources/Pages/Pages");

const Index = require("#Index");
const Components = require("../Resources/Components/Components");

const admin = Index.express.Router();

const sub_admin = Index.express.Router();

admin.get("/", (req, res) => {
	res.redirect("/");
});

admin.get("/login", async (req, res) => {
	res.send(await Pages.LoginPage());
});

admin.post("/login", Index.upload.none(), async (req, res) => {
	

 

		var record = await Index.pool.query(
		   `SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req?.body?.login_name}' AND password_hash='${Index.sha256(req?.body?.login_password)}'`,
	   );		 
	
	   if (record.rows.length == 1) {
		   res.cookie('login_name', req?.body?.login_name, { expires: new Date(Date.now() + 900000), httpOnly: true })
		   res.cookie('password_hash', Index.sha256(req?.body?.login_password), { expires: new Date(Date.now() + 900000), httpOnly: true })
		   res.redirect(new URL(`/admin/${record.rows[0]["id"]}`, req.protocol + "://" + req.get("host")));

 	   }
	   else {
		res.statusCode = 404;
		res.send(Components.visitor.ErrorBox({message: "login failed"}));
	   }

});

admin.use("/:id", async (req, res, next) => {
	var record;
	try {
			record = await Index.pool.query(
				`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req.cookies?.login_name}' AND password_hash='${req.cookies?.password_hash}'`,
			);

			if (record.rows.length == 1 &&req.params.id == record.rows[0].id ) {

				next()
			} else {
				res.statusMessage = "Not Authorized";
				res.status(401).send("<h1>Not Authorized</h1>");
			}
		
	} catch (error) {
		console.log(error);
		res.statusMessage = "Internal Server Error";
		res.status(401).send("<h1>Internal Server Error</h1>");
	}
});


admin.get("/:id", async (req, res, next)=> {
	res.send(await Pages.AdminDashboard());
})

admin.use("/:id/", sub_admin)

 











sub_admin.get("/blogs" ,( req,res,next) => {
	res.send("all blogs")
})


sub_admin.get("/blogs/add" ,( req,res,next) => {
	res.send("add blog")
})

sub_admin.get("/blogs/:id" ,( req,res,next) => {
	res.send("single blog")
})











admin.use("/:id", async (req, res) => {
	res.send(await Pages.NotFound())

});

module.exports = admin;
