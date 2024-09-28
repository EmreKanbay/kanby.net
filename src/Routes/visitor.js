const Index = require("#Index");
const Pages = require("#Pages");

const visitor = Index.express.Router();

const errorPage = (msg) => {
  return `
	<h1>🤠kanby.net has encountered with an error🤠</h1>
	<h2>please... please, do not let anyone know this but developer. Becouse it would be a security threat. Please tell this error to Developer at emre@kanby.net </h2>
	<h2>Meanwhile developer: 😱🤕😓😭</h2>
  <img src="https://cdn.kanby.net/assets/kanby-net-error.gif">
  ${msg == undefined ? "" : `<p>Error Message: ${msg} </p>`}`;
};




visitor.post("/grant_cookie", (req, res, next) => {

    res.cookie("CookiesGranted", "true", {
      expires:  new Date(Date.now() + 18000000000),
      httpOnly: true,
      secure: true,
      domain: req.get("host") == "localhost" ? "" : "kanby.net",
      sameSite: "strict",
    });

    Index.memoryCache.clear()
    res.send()

})

// redirect / to /Turkish
visitor.get("/",async (req, res, next) => {
  try {
        // res.redirect(new URL(`/English/`, req.protocol + "://" + req.get("host")));
        const customData={}
        customData.langCode = "en"
      customData.language = "English";
      customData.clientIP =
        typeof req?.header("x-forwarded-for") == "string"
          ? req?.header("x-forwarded-for").split(",")[0]
          : "";
      customData.cookiesGranted = Boolean(req?.cookies?.CookiesGranted)
        res.status(200).send(
          await Pages.LandingPage.html({
            customData: customData,
          }),
        );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

    res.status(500).send(errorPage());
    
  }

});

// validate :lang and if it is valid and exist in SQL db redirect to relevant page
//     if (/^([A-Z]{1}[a-z]+)$/.test(req.params.lang))
visitor.use("/:lang",Index.cache(20) , async (req, res, next) => {
  try {

      const query = await Index.pool.query("SELECT * FROM variables");
      if (query.rows[0].value.includes(req.params.lang)) {
        req.customData={}

        req.customData.langCode =
          query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)];
        req.customData.language = req.params.lang;
        req.customData.clientIP =
          typeof req?.header("x-forwarded-for") == "string"
            ? req?.header("x-forwarded-for").split(",")[0]
            : "";
        req.customData.cookiesGranted = Boolean(req?.cookies?.CookiesGranted)

        next();
      } else {

        if (req.method == "GET") {

          res.status(404).send(
            await Pages.NotFound.html({
              customData: {language: "English",
                langCode: "en",cookiesGranted: Boolean(req?.cookies?.CookiesGranted)}
            }),
          );
          } else {
            res.status(405).send({
              message: `The method ${req.method} is not allowed for the requested endpoint.`,
            });
          }


      }

  } catch (e) {
    
    if (req.method == "GET") {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

      res.status(500).send(errorPage());
    } else {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

      res.status(500).send(JSON.stringify({ Message: "Error" }));
    }
  }
});

const subVisitor = Index.express.Router();
visitor.use("/:lang/", subVisitor);

// Landing Page
subVisitor.get("/", async (req, res, next) => {
  try {
    res.status(200).sendNoCache(
      await Pages.LandingPage.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}

    res.status(500).send(errorPage());
  }
});

// blogs page
subVisitor.get("/blogs/", async (req, res, next) => {
  try {
    res.status(200).sendNoCache(
      await Pages.Blogs.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    
    if(process.env.NODE_ENV == "developement"){console.log(e)}

    res.status(500).send(errorPage());
  }
});

// single blog
subVisitor.get("/blogs/:id/", async (req, res, next) => {
  try {
    const text = `SELECT ARRAY(SELECT id FROM blogs WHERE language= $1) AS ids`;
    var record = await Index.pool.query(text, [req.customData.language]);

      if (record.rows[0].ids.includes(Number(req.params.id))) {
        res.status(200).sendNoCache(
          await Pages.SingleBlog.html({
            blog_id: req.params.id,
            customData: req.customData,
          }),
        );
      } else {
        res.status(404).send(
          await Pages.NotFound.html({
            customData: req.customData,
          }),
        );
      }
    } 
   catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

// projects page
subVisitor.get("/projects/", async (req, res, next) => {
  try {
    res.status(200).sendNoCache(
      await Pages.Projects.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

// single project
subVisitor.get("/projects/:id", async (req, res, next) => {
  try {
    const text = `SELECT ARRAY(SELECT id FROM projects) AS ids`;
    var record = await Index.pool.query(text);


      if (record.rows[0].ids.includes(Number(req.params.id))) {
        res.status(200).sendNoCache(
          await Pages.SingleProject.html({
            id: req.params.id,
            customData: req.customData,
          }),
        );
      } else {
        res.status(404).send(
          await Pages.NotFound.html({
            customData: req.customData,
          }),
        );
      }
    
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

//contact page
subVisitor.get("/contact/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.Contact.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

// about page
subVisitor.get("/about/", async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.About.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

//services page
subVisitor.get("/services/",async (req, res, next) => {
  try {
    res.status(200).send(
      await Pages.Services.html({
        customData: req.customData,
      }),
    );
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }
});

subVisitor.use(async (req, res, next)=> {

  try {
    if(req.method == "GET") {
      res.status(404).send(
        await Pages.NotFound.html({
          customData: {language: req.customData.language,
            langCode: req.customData.langCode,cookiesGranted: Boolean(req?.cookies?.CookiesGranted)}
          
        })
      );
    }else{
      res.status(405).send({
        message: `The method ${req.method} is not allowed for the requested endpoint.`,
      });
    }
  } catch (e) {
    if(process.env.NODE_ENV == "developement"){console.log(e)}
    
    res.status(500).send(errorPage());
  }


})

module.exports = visitor;
