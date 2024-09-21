const Pages = require("#Pages");
const Index = require("#Index");
const Components = require("#Components");
const path = require("path");
var he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const admin = Index.express.Router();


admin.get("/:user_id/dashboard/", async (req, res, next) => {
	try {
		res.send(await Pages.AdminDashboard.html({ user_id: req.params.user_id }));
	} catch (error) {
		console.log(error);
		res.status(500).send(`<h1>Error: </h1> \n ${error}`)
	}
});

admin.get("/:user_id/blogs/add/", async (req, res, next) => {
	try {
		res.send(await Pages.AddBlog.html({ user_id: req.params.user_id }));
	} catch (error) {
		console.log(error);
		res.status(500).send(`<h1>Error: </h1> \n ${error}`)
	}
});

admin
	.route("/:user_id/blogs/")

	.get(async (req, res) => {
		try {
			res.send(await Pages.AllBlogs.html({ user_id: req.params.user_id }));
		} catch (error) {
			console.log(error);
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})

	.post(Index.upload.none(), async (req, res) => {
		try {
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
	 <div onclick="window.location.href = './${t.id}'" data-title="${he.encode(t.title)}"
	 	data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}"
	 	data-raw-content="${he.encode(t.raw_content)}" class="all-blogs-item">
	 	<img src="${t.thumbnail_url}" />
	 	<span>${t.title}</span>
	 </div>
			`;
						}),
					),
				);
			}
		} catch (error) {
			console.log(error);
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})

	.put(Index.upload.none(), async (req, res) => {
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
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	});

admin
	.route("/:user_id/blogs/:id/")
	.get(async (req, res) => {
		try {
			res.send(await Pages.ViewBlog.html({ id: req.params.id, user_id: req.params.user_id }));
		} catch (error) {
			console.log(error);
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})
	.delete(async (req, res) => {
		try {
			const text = `DELETE FROM "blogs" WHERE id = $1`;

			const values = [req.params.id];

			await Index.pool.query(text, values);

			res.send();
		} catch (error) {
			console.log(error);
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})

	.patch(Index.upload.none(), async (req, res) => {
		try {
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
		} catch (error) {
			console.log(error);
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	});

admin
	.route("/:user_id/projects/")
	.get(async (req, res) => {
		try {
		res.send(await Pages.AllProjects.html({ user_id: req.params.user_id }));
			
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})
	.put(Index.upload.none(), async (req, res) => {

		try {
			const columns = Object.keys(req.body)
			.map(key => `"${key}"`)
			.join(", "); // Get the column names as a string
		const records = Object.values(req.body);
		const placeholders = records.map((_, idx) => `$${idx + 1}`).join(", ");

		const text = `INSERT INTO projects (id, ${columns}) VALUES (DEFAULT, ${placeholders})`;

		const values = [...Object.values(req.body)];

		var record = await Index.pool.query(text, values);

		res.send();
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	});
admin.get("/:user_id/projects/add/", async (req, res) => {
	try {
		res.send(await Pages.AddProject.html({ user_id: req.params.user_id }));
		
	} catch (error) {
		console.log(error)
		res.status(500).send(`<h1>Error: </h1> \n ${error}`)
	}
});

admin
	.route("/:user_id/projects/:id")
	.get(async (req, res) => {
		try {
			
			res.send(await Pages.ViewProject.html({ id: req.params.id, user_id: req.params.user_id }));
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})
	.delete(Index.upload.none(), async (req, res) => {
		try {
			const text = `DELETE FROM projects WHERE id= $1`;
	
			const values = [req.body.id];
	
			await Index.pool.query(text, values);
	
			res.send();
			
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})
	.patch(Index.upload.none(), async (req, res) => {

		try {
			const text = `UPDATE projects SET "${Object.keys(req.body)[0]}" = $1 WHERE id= $2`;

			const values = [Object.values(req.body)[0], Object.values(req.body)[1]];
	
			var query = await Index.pool.query(text, values);
	
			res.send();
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}

	});

admin
	.route("/:user_id/media/")
	.get(async (req, res, next) => {
		try {
		res.send(await Pages.Media.html({ user_id: req.params.user_id }));
			
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}
	})
	.delete(Index.upload.none(), async (req, res, next) => {

		try {
			const text = "DELETE FROM media WHERE id = $1";
			const values = [req.body.id];
	
			await Index.pool.query(text, values);
			res.send();
		} catch (error) {
			console.log(error)
			res.status(500).send(`<h1>Error: </h1> \n ${error}`)
		}

	})

	.put(Index.upload.single("media"), async (req, res, next) => {
		try {
			const text = "INSERT  INTO media VALUES (DEFAULT, $1, $2)";
			const values = [`${cdn}/media/${req.file.filename}`, req.body.alt_text];

			await Index.pool.query(text, values);
			res.send();
		} catch (e) {
			console.log(e);
			res.status(500).send(`<h1>Error: </h1> \n ${e}`)
		}
	});

admin.get("/:user_id/media/add/", async (req, res, next) => {
	try {
	res.send(await Pages.AddMedia.html({ user_id: req.params.user_id }));
		
	} catch (e) {
		console.log(e);
		res.status(500).send(`<h1>Error: </h1> \n ${e}`)
	}
});



admin.get("/:user_id/security", async (req, res) => {
	try {
		res.send(await Pages.Security.html({ user_id: req.params.user_id }));
		
	} catch (e) {
		console.log(e);
		res.status(500).send(`<h1>Error: </h1> \n ${e}`)
	}
});

admin.get("/:user_id/settings", async (req, res) => {
	try {
		res.send(await Pages.Settings.html({ user_id: req.params.user_id }));
		
	} catch (e) {
		console.log(e);
		res.status(500).send(`<h1>Error: </h1> \n ${e}`)
	}
});

admin.use("/:id", async (req, res) => {
	try {
	res.send(await Pages.NotFound.html({ language: "English" }));
		
	} catch (e) {
		console.log(e);
		res.status(500).send(`<h1>Error: </h1> \n ${e}`)
	}
});

module.exports = admin;
