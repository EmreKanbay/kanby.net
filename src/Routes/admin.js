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
	res.send(await Pages.LoginPage.html());
});

admin.post("/login/", Index.upload.none(), async (req, res) => {
	var record = await Index.pool.query(
		`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req?.body?.login_name}' AND password_hash='${Index.sha256(req?.body?.login_password)}'`,
	);

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
		record = await Index.pool.query(
			`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req.cookies?.login_name}' AND password_hash='${req.cookies?.password_hash}'`,
		);

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

admin.use("/:id", sub_admin);

sub_admin.get("/dashboard/", async (req, res, next) => {
	res.send(await Pages.AdminDashboard.html());
});

sub_admin.get("/blogs/add/", async (req, res, next) => {
	res.send(await Pages.AddBlog.html());
});

sub_admin
	.route("/blogs/")

	.get(async (req, res) => {
		res.send(await Pages.AllBlogs.html());
	})

	.post(Index.upload.none(), async (req, res) => {
		var record = await Index.pool.query(`SELECT * FROM "blogs" WHERE language='${req.body.language}'`);

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
			var record = await Index.pool.query(
				`SELECT public_name FROM "users" WHERE login_name='${req?.cookies?.login_name}' AND password_hash='${req?.cookies?.password_hash}'`,
			);
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

sub_admin
	.route("/blogs/:id/")
	.get(async (req, res) => {
		res.send(await Pages.ViewBlog.html({ id: req.params.id }));
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

sub_admin
	.route("/media/")
	.get(async (req, res, next) => {
		res.send(await Pages.Media.html());
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

sub_admin.get("/media/add/", async (req, res, next) => {
	res.send(await Pages.AddMedia.html());
});

admin.get("/:id/bll", async (req, res) => {
	res.send(await Components.admin.AdminBlogs.html());
});
admin.use("/:id", async (req, res) => {
	res.send(await Pages.NotFound.html());
});

module.exports = admin;
