const Pages = require("#Pages");
const Index = require("#Index");
var he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
const admin = Index.express.Router();

const errorPage = (error) => {
  return `
	<h1>🤠Aw shit here we go again🤠</h1>
	<h1>🔥Error🔥</h1>
	<h2>please... please, do not let anyone know this but developer. Becouse it would be a security threat. Please report this error code to developer > emre@kanby.net </h2>
	<h2>Meanwhile developer: 😱🤕😓😭</h2>
	<p>Message: ${error.message}</p>
	<p>Detais: ${error.stack}</p>
	`;
};

admin.use("/:user_id", async (req, res, next) => {
	try{
		req.userID = req?.params?.user_id;
		next();
	}catch(e){
		if(req.method == "GET"){
      if(process.env.NODE_ENV == "developement"){console.log(e)}

			res.status(500).send(errorPage(e))
      
		}else{
    if(process.env.NODE_ENV == "developement"){console.log(e)}

			res.status(500).send(JSON.stringify({message: "error"}))

		}
	}
});

const subAdmin = Index.express.Router();
admin.use("/:user_id/", subAdmin);

subAdmin.get("/dashboard/",async (req, res, next) => {
  try {
    res.status(200).send(await Pages.AdminDashboard.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});

subAdmin.get("/blogs/add/",Index.cache(), async (req, res, next) => {
  try {
    res.status(200).send(await Pages.AddBlog.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});

subAdmin
  .route("/blogs/")

  .get(Index.cache(), async (req, res) => {
    try {
      res.status(200).send(await Pages.AllBlogs.html({ user_id: req.userID }));
    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(errorPage(e));
    }
  })

  .post(Index.upload.none(), async (req, res) => {
    try {
      const text = `SELECT * FROM "blogs" WHERE language= $1`;

      const values = [req.body.language];

      var record = await Index.pool.query(text, values);

      if (record.rowCount == 0) {
        res.status(404).send(JSON.stringify({message: "<h1>Not Found</h1>"}));
      } else {
        res.status(200).send(JSON.stringify({message: "".concat(
            ...record.rows.map((t) => {
              return `
	 <a href="/admin/${req.userID}/blogs/${t.id}/" data-title="${he.encode(t.title)}"
	 	data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}"
	 	data-raw-content="${he.encode(t.raw_content)}" class="all-blogs-item">
	 	<img src="${t.thumbnail_url}" />
	 	<span>${t.title}</span>
	 </a>
			`;
            }),
          )})
        );
      }
    } catch (e) {
      
    if(process.env.NODE_ENV == "developement"){console.log(e)}

      res.status(500).send(JSON.stringify({message: "error"}))
    }
  })

  .put(Index.upload.none(), async (req, res) => {
    try {
      const text = `INSERT INTO "blogs" (title, description, 
		language,  author, creation_date, 
		rendered_content, raw_content, thumbnail_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

      const text1 = `SELECT * FROM users WHERE id= $1`;

      var record = await Index.pool.query(text1, [req.userID]);

      const values = [
        req.body.blog_title,
        req.body.blog_description,
        req.body.blog_language,
        record.rows[0].public_name,
        Date.now(),
        req.body.blog_markdown_rendered,
        req.body.blog_markdwon_raw,
        req.body.blog_cover_image == "" ? "https://cdn.kanby.net/assets/placeholder-image.svg" : req.body.blog_cover_image,
      ];

      await Index.pool.query(text, values);

      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(JSON.stringify({message: "error"}))
    }
  });

subAdmin
  .route("/blogs/:id/")
  .get(Index.cache(), async (req, res) => {
    try {
      res.status(200).send(
        await Pages.ViewBlog.html({ id: req.params.id, user_id: req.userID }),
      );
    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(errorPage(e));
    }
  })
  .delete(async (req, res) => {
    try {
      const text = `DELETE FROM "blogs" WHERE id = $1`;

      const values = [req.params.id];

      await Index.pool.query(text, values);

      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(JSON.stringify({message: "error"}));
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
      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
    }
  });

subAdmin
  .route("/projects/")
  .get(Index.cache(), async (req, res) => {
    try {

      res.status(200).send(await Pages.AllProjects.html({ user_id: req.userID }));
    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(errorPage(e));
    }
  })
  .put(Index.upload.none(), async (req, res) => {
    try {
      const columns = Object.keys(req.body)
        .map((key) => `"${key}"`)
        .join(", "); // Get the column names as a string
      const records = Object.values(req.body);
      const placeholders = records.map((_, idx) => `$${idx + 1}`).join(", ");

      const text = `INSERT INTO projects (id, ${columns}) VALUES (DEFAULT, ${placeholders})`;

      const values = [...Object.values(req.body)];

      var record = await Index.pool.query(text, values);
      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()
    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
    }
  });
subAdmin.get("/projects/add/", Index.cache(),  async (req, res) => {
  try {
    res.status(200).send(await Pages.AddProject.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});

subAdmin
  .route("/projects/:id")
  .get(Index.cache(), async (req, res) => {
    try {
      res.status(200).send(
        await Pages.ViewProject.html({
          id: req.params.id,
          user_id: req.userID,
        }),
      );
    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(errorPage(e));
    }
  })
  .delete(Index.upload.none(), async (req, res) => {
    try {
      const text = `DELETE FROM projects WHERE id= $1`;

      const values = [req.body.id];

      await Index.pool.query(text, values);
      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
    }
  })
  .patch(Index.upload.none(), async (req, res) => {
    try {
      const text = `UPDATE projects SET "${Object.keys(req.body)[0]}" = $1 WHERE id= $2`;

      const values = [Object.values(req.body)[0], Object.values(req.body)[1]];

      var query = await Index.pool.query(text, values);
      res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

     } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
     }
  });

subAdmin
  .route("/media/")
  .get(Index.cache() ,async (req, res, next) => {
    try {
      res.status(200).send(await Pages.Media.html({ user_id: req.userID }));

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
      
      res.status(500).send(errorPage(e));
    }
  })
  .delete(Index.upload.none(), async (req, res, next) => {
    try {
      const text = "DELETE FROM media WHERE id = $1";
      const values = [req.body.id];

      await Index.pool.query(text, values);
	        res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
    }
  })

  .put(Index.upload.none(), async (req, res, next) => {
    try {
      var [main, ext] = req.body.file_name.split(".");

      const mediaName =
        main + "-" + Index.crypto.randomUUID().split("-")[1] + "." + ext;

      const text = "INSERT  INTO media VALUES (DEFAULT, $1, $2)";
      const values = [`${cdn}/media/${mediaName}`, req.body.alt_text];

      await Index.pool.query(text, values);
	        res.status(200).send(JSON.stringify({message: "success"}));
      Index.memoryCache.clear()

    } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

            res.status(500).send(JSON.stringify({message: "error"}));
    }
  });

subAdmin.get("/media/add/", Index.cache(), async (req, res, next) => {
  try {
    res.status(200).send(await Pages.AddMedia.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});

subAdmin.get("/security",  async (req, res) => {
  try {
    res.status(200).send(await Pages.Security.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});

subAdmin.get("/settings",  async (req, res) => {
  try {
    res.status(200).send(await Pages.Settings.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});


subAdmin.get("/security/all_requests/",  async (req, res) => {
  try {
    res.status(200).send(await Pages.AllRequests.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});


subAdmin.get("/security/login_attempts/",  async (req, res) => {
  try {
    res.status(200).send(await Pages.LoginAttempts.html({ user_id: req.userID }));
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage(e));
  }
});



module.exports = admin;
