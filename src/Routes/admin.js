const Pages = require("#Pages");
const Index = require("#Index");
const Components = require("#Components");



const admin = Index.express.Router();

const sub_admin = Index.express.Router();
 


admin.get("/login", async (req, res) => {
	res.send(await Pages.LoginPage.html({script: await Pages.LoginPage.js()}));
});

admin.post("/login", Index.upload.none(), async (req, res) => {
	

 

		var record = await Index.pool.query(
		   `SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req?.body?.login_name}' AND password_hash='${Index.sha256(req?.body?.login_password)}'`,
	   );		 
	
	   if (record.rows.length == 1) {
		   res.cookie('login_name', req?.body?.login_name, { expires: new Date(Date.now() + 36000000), httpOnly: false })
		   res.cookie('password_hash', Index.sha256(req?.body?.login_password), { expires: new Date(Date.now() + 36000000), httpOnly: false })
		   res.cookie('user_id', record.rows[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: false })
		   res.redirect(new URL(`/admin/${record.rows[0]["id"]}/dashboard`, req.protocol + "://" + req.get("host")));

 	   }
	   else {
		res.statusCode = 404;
		res.send(await Components.visitor.ErrorBox.html({message: "login failed"}));
	   }

});

admin.use("/:id", async (req, res, next) => {
	var record;
	try {
			record = await Index.pool.query(
				`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req.cookies?.login_name}' AND password_hash='${req.cookies?.password_hash}'`,
			);

			if (record.rows.length == 1 &&req.params.id == record.rows[0].id ) {

				if(req.path == "/") res.redirect(new URL(`/admin/${record.rows[0]["id"]}/dashboard`, req.protocol + "://" + req.get("host")));
				else next()
				
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


 

admin.use("/:id/", sub_admin)

 




sub_admin.get("/dashboard" , async ( req,res,next) => {
 	res.send(await Pages.AdminDashboard.html());

})



//id | title | description | language | author | creation_date | 
//last_modify_date | url_path | markdown_content | thumbnail_url | 
//meta_title | meta_description 




sub_admin.get("/blogs" ,async( req,res,next) => {
	res.send(await Pages.AllBlogs.html());
})

sub_admin.get("/blogs/add" ,async( req,res,next) => {
	res.send(await Pages.AddBlog.html());
})



sub_admin.route("/blogs")

.post(Index.upload.none(), async (req, res) => {

	var record = await Index.pool.query(`SELECT * FROM "blogs" WHERE language='${req.body.language}'`)


  
	res.send(record.rows)

})
.put(Index.upload.none() ,async( req,res) => {

// var record = await Index.pool.query(`SELECT * FROM "users" WHERE login_name='${req?.cookies?.login_name}' AND password_hash='${req?.cookies?.password_hash}'`)

// console.log(record.rows[0])

res.send()


console.log(req.body)
 
// try{
// 	await Index.pool.query(`INSERT INTO "blogs" (title, description, 
// 		language,  author, creation_date, 
// 		rendered_content, meta_title, meta_description) VALUES ('${req.body.blog_title}', '${req.body.blog_description}', 
// 		'${req.body.blog_language}', '${record.rows[0].public_name}', '${Date.now()}', '${req.body.blog_markdown}', '${req.body.blog_meta_title}', '${req.body.blog_meta_description}' )`)

// 		res.send();

// }catch(e){
// console.log(e)
// res.status(500).send();

// }

})







 
sub_admin.get("/contents" ,async( req,res,next) => {
	res.send(await Pages.AllContents.html());
})


sub_admin.get("/news" ,async( req,res,next) => {
	res.send(await Pages.AllNews.html());
})


sub_admin.get("/pages" ,async( req,res,next) => {
	res.send(await Pages.AllPages.html());
})











admin.use("/:id", async (req, res) => {
	res.send(await Pages.NotFound.html())

});

module.exports = admin;
