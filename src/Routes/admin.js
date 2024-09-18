const Pages = require("#Pages");
const Index = require("#Index");
const Components = require("#Components");
const path = require("path");
var he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const admin = Index.express.Router();

const sub_admin = Index.express.Router();

admin.get("/login/", async (req, res) => {
	res.send(await Pages.LoginPage.html({language: "English"}));
});

admin.post("/login/", Index.upload.none(), async (req, res) => {

	const text = `SELECT login_name, password_hash, id FROM "users" WHERE login_name= $1 AND password_hash= $2`;

	const values = [req?.body?.login_name, Index.sha256(req?.body?.login_password)];

	var record = await Index.pool.query(text, values);

	if (record.rows.length == 1) {
		res.cookie("login_name", req?.body?.login_name, { expires: new Date(Date.now() + 36000000), httpOnly: false });
		res.cookie("password_hash", Index.sha256(req?.body?.login_password), {
			expires: new Date(Date.now() + 36000000),
			httpOnly: false,
		});
		res.cookie("user_id", record.rows[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: false });
		res.redirect(new URL(`/admin/${record.rows[0]["id"]}/dashboard/`, "https://" + req.get("host")));
	} else {
		res.statusCode = 404;
		res.send(await Components.visitor.ErrorBox.html({ message: "login failed" }));
	}
});

admin.use("/:id", async (req, res, next) => {
	var record;
	try {


		const text = `SELECT login_name, password_hash, id FROM "users" WHERE login_name= $1 AND password_hash= $2`;

		const values = [req?.cookies?.login_name, req.cookies?.password_hash];
	
		var record = await Index.pool.query(text, values);


		if (record.rows.length == 1 && req.params.id == record.rows[0].id) {
			if (req.path == "/")
				res.redirect(new URL(`/admin/${record.rows[0]["id"]}/dashboard`, "https://" + req.get("host")));
			else next();
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

 

admin.get("/:user_id/dashboard/", async (req, res, next) => {
	res.send(await Pages.AdminDashboard.html({user_id: req.params.user_id}));
});
 
admin.get("/:user_id/blogs/add/", async (req, res, next) => {
	res.send(await Pages.AddBlog.html({user_id: req.params.user_id}));
});

admin
	.route("/:user_id/blogs/")

	.get(async (req, res) => {
		res.send(await Pages.AllBlogs.html({user_id: req.params.user_id}));
	})

	.post(Index.upload.none(), async (req, res) => {
 

		const text = `SELECT * FROM "blogs" WHERE language= $1`;

		const values = [req.body.language];
	
		var record = await Index.pool.query(text, values);



		if (record.rowCount == 0) {
			res.send("<h1>No blog exist</h1>");
		} else {
			res.send(
				"".concat(
					...record.rows.map(t => {
						return `

 <div onclick="window.location.href = './${t.id}'" data-title="${he.encode(t.title)}" data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}" data-raw-content="${he.encode(t.raw_content)}"  class="all-blogs-item">

			<img  src="${t.thumbnail_url}" />

			<span>${t.title}</span>
			</div>
		`;
					}),
				),
			);
		}
	})

	.put(Index.upload.none(), async (req, res) => {
		try {
	
			const text = `SELECT public_name FROM "users" WHERE login_name= $1 AND password_hash= $2`;

			const values = [req?.cookies?.login_name, req?.cookies?.password_hash];
		
			var record = await Index.pool.query(text, values);


		} catch (e) {
			console.log(e);
			res.status(500).send("DB USER data query Failed");
		}

		try {
			const text = `INSERT INTO "blogs" (title, description, 
		language,  author, creation_date, 
		rendered_content, raw_content, thumbnail_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

			const values = [
				req.body.blog_title,
				req.body.blog_description,
				req.body.blog_language,
				record.rows[0].public_name,
				Date.now(),
				req.body.blog_markdown_rendered,
				req.body.blog_markdwon_raw,
				req.body.blog_cover_image,
			];

			await Index.pool.query(text, values);

			res.send();
		} catch (e) {
			console.log(e);
			res.status(500).send("DB INSERT Failed");
		}
	});

	admin
	.route("/:user_id/blogs/:id/")
	.get(async (req, res) => {
		res.send(await Pages.ViewBlog.html({ id: req.params.id, user_id: req.params.user_id }));
	})
	.delete(async (req, res) => {
		const text = `DELETE FROM "blogs" WHERE id = $1`;

		const values = [req.params.id];

		await Index.pool.query(text, values);

		res.send();
	})

	.patch(Index.upload.none(), async (req, res) => {
		const text = `UPDATE "blogs" SET title = $1 , description = $2,rendered_content = $3, raw_content = $4, thumbnail_url = $5, last_modify_date = $6, language = $7 WHERE id= $8`;

		const values = [
			req.body.blog_title,
			req.body.blog_description,
			req.body.blog_markdown_rendered,
			req.body.blog_markdwon_raw,
			req.body.blog_cover_image,
			Date.now(),
			req.body.blog_language,
			req.body.blog_id,
		];

		await Index.pool.query(text, values);

		res.send();
	});


	admin.route("/:user_id/projects/")
	.get(async (req, res) => {
res.send(await Pages.AllProjects.html({user_id: req.params.user_id}));
	})
	.put(Index.upload.none(), async (req, res) => {

		console.log(req.body)

		const columns = Object.keys(req.body).map(key => `"${key}"`).join(", "); // Get the column names as a string
		const records = Object.values(req.body); 
		const placeholders = records.map((_, idx) => `$${idx + 1}`).join(", ");


		const text = `INSERT INTO projects (id, ${columns}) VALUES (DEFAULT, ${placeholders})`;

  
		const values = [...Object.values(req.body)];
	
 		var record = await Index.pool.query(text, values);

		

 
		res.send("dsaasd")
	})
	admin.get("/:user_id/projects/add/", async (req, res) => {

		res.send(await Pages.AddProject.html({user_id: req.params.user_id}));



	})

	admin.route("/:user_id/projects/:id")
	.get(async (req, res) => {
res.send(await Pages.ViewProject.html({ id: req.params.id, user_id: req.params.user_id }));
	})
	.delete(Index.upload.none(), async (req, res) => {

		console.log(req.body)

		const text = `DELETE FROM projects WHERE id= $1`;

		const values = [req.body.id];
	
		 var query = await Index.pool.query(text, values);

		res.send()
	})
	.patch(
		Index.upload.none(),async (req, res) => {


			const text = `UPDATE projects SET "${Object.keys(req.body)[0]}" = $1 WHERE id= $2`;

			const values = [Object.values(req.body)[0], Object.values(req.body)[1]];
		
 			var query = await Index.pool.query(text, values);
			







		res.send("200")
	})



	

	admin
	.route("/:user_id/media/")
	.get(async (req, res, next) => {
		res.send(await Pages.Media.html({user_id: req.params.user_id}));
	})
	.delete(Index.upload.none(), async (req, res, next) => {
		const text = "DELETE FROM media WHERE id = $1";
		const values = [req.body.id];

		await Index.pool.query(text, values);
		res.send();
	})

	.put(Index.upload.single("media"), async (req, res, next) => {
		try {
			const text = "INSERT  INTO media VALUES (DEFAULT, $1, $2)";
			const values = [`${cdn}/media/${req.file.filename}`, req.body.alt_text];

			await Index.pool.query(text, values);
			res.send();
		} catch (e) {
			console.log(e);
			res.status(500).send();
		}
	});

	admin.get("/:user_id/media/add/", async (req, res, next) => {
	res.send(await Pages.AddMedia.html({user_id: req.params.user_id}));
});

admin.get("/:id/blogs", async (req, res) => {
	res.send(await Components.admin.AdminBlogs.html({user_id: req.params.user_id}));
});
admin.use("/:id", async (req, res) => {
	res.send(await Pages.NotFound.html({ language: "English" }));
});

module.exports = admin;
