const Index = require("#Index");
const Pages = require("#Pages");

const visitor = Index.express.Router();

const errorPage = () => {
  return `
	<h1>🤠kanby.net has encountered with an error🤠</h1>
	<h2>please... please, do not let anyone know this but developer. Becouse it would be a security threat. Please tell this error to Developer at emre@kanby.net </h2>
	<h2>Meanwhile developer: 😱🤕😓😭</h2>
  <img src="https://cdn.kanby.net/assets/kanby-net-error.gif">
	`;
};

// redirect / to /Turkish
visitor.get("/", async (req, res, next) => {
  try {
    res.redirect(new URL(`/Turkish/`, req.protocol + "://" + req.get("host")));
  } catch (e) {
    res.status(500).send(errorPage());
    
  }

});

// validate :lang and if it is valid and exist in SQL db redirect to relevant page
visitor.use("/:lang", async (req, res, next) => {
  try {
    if (/^([A-Z]{1}[a-z]+)$/.test(req.params.lang)) {
      const query = await Index.pool.query("SELECT * FROM variables");
      if (query.rows[0].value.includes(req.params.lang)) {
        req.langCode =
          query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)];
        req.language = req.params.lang;
        req.clientIP =
          typeof req?.header("x-forwarded-for") == "string"
            ? req?.header("x-forwarded-for").split(",")[0]
            : "";

        next();
      } else {
        res.status(404).send(
          await Pages.NotFound.html({
            language: "English",
            langCode: "en",
          }),
        );
      }
    } else {
      res.status(404).send(
        await Pages.NotFound.html({
          language: "English",
          langCode: "en",
        }),
      );
    }
  } catch (e) {
    
    if (req.method == "GET") {
      res.status(500).send(errorPage());
    } else {
      res.status(500).send(JSON.stringify({ Message: "Error" }));
    }
  }
});

const subVisitor = Index.express.Router();
visitor.use("/:lang/", subVisitor);

// Landing Page
subVisitor.get("/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.LandingPage.html({
        language: req.language,
        langCode: req.langCode,
        reqIp: req.clientIP,
      }),
    );
  } catch (e) {
    res.status(500).send(errorPage());
  }
});

// blogs page
subVisitor.get("/blogs/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.Blogs.html({
        language: req.language,
        langCode: req.langCode,
      }),
    );
  } catch (error) {
    

    res.status(500).send(errorPage());
  }
});

// single blog
subVisitor.get("/blogs/:id", async (req, res, next) => {
  try {
    const text = `SELECT ARRAY(SELECT id FROM blogs WHERE language= $1) AS ids`;
    var record = await Index.pool.query(text, [req.language]);

    if (/^[0-9]+$/.test(req.params.id)) {
      if (record.rows[0].ids.includes(Number(req.params.id))) {
        res.status(200).send(
          await Pages.SingleBlog.html({
            language: req.language,
            blog_id: req.params.id,
            langCode: req.langCode,
          }),
        );
      } else {
        res.status(404).send(
          await Pages.NotFound.html({
            language: req.language,
            langCode: req.langCode,
          }),
        );
      }
    } else {
      res.status(404).send(
        await Pages.NotFound.html({
          language: req.language,
          langCode: req.langCode,
        }),
      );
    }
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

// projects page
subVisitor.get("/projects/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.Projects.html({
        language: req.language,
        langCode: req.langCode,
      }),
    );
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

// single project
subVisitor.get("/projects/:id", async (req, res, next) => {
  try {
    const text = `SELECT ARRAY(SELECT id FROM projects) AS ids`;
    var record = await Index.pool.query(text);

    if (/^[0-9]+$/.test(req.params.id)) {
      if (record.rows[0].ids.includes(Number(req.params.id))) {
        res.status(200).send(
          await Pages.SingleProject.html({
            language: req.language,
            id: req.params.id,
            langCode: req.langCode,
          }),
        );
      } else {
        res.status(404).send(
          await Pages.NotFound.html({
            language: req.language,
            langCode: req.langCode,
          }),
        );
      }
    } else {
      res.status(404).send(
        await Pages.NotFound.html({
          language: req.language,
          langCode: req.langCode,
        }),
      );
    }
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

//contact page
subVisitor.get("/contact/", async (req, res, next) => {
  try {
    re.status(200).send(
      await Pages.Contact.html({
        language: req.language,
        langCode: req.langCode,
      }),
    );
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

// about page
subVisitor.get("/about/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.About.html({
        language: req.language,
        langCode: req.langCode,
      }),
    );
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

//services page
subVisitor.get("/services/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.Services.html({
        language: req.language,
        langCode: req.langCode,
      }),
    );
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

module.exports = visitor;
