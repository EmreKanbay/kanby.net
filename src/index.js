// API Libraries
const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const compression = require("compression");

// Database Libraries
const pg = require("pg");
const redis = require("redis");

// Other Libraries
require("dotenv").config();
const crypto = require("crypto");
const LoginPage = require("./Resources/Pages/Visitor/LoginPage");
const Framework = require("#Framework");
const Components = require("#Components");
const NotFound = require("./Resources/Pages/NotFound");

const errorPage = () =>
  `<h1>🤠kanby.net has encountered with an error🤠</h1>
	<h2>please... please, do not let anyone know this but developer. Becouse it would be a security threat. Please report this error to Developer at emre@kanby.net </h2>
	<h2>Meanwhile developer: 😱🤕😓😭</h2>
  <img src="https://cdn.kanby.net/assets/kanby-net-error.gif">`;

const cdn = process.env.CDN_DOMAIN;
const upload = multer();

// Setup REDİS Server
const client = redis
  .createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  })
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("connect", () => {
    console.log("Redis connected succesfully");
  });
var REDIS_works = false;

// Setup POSTGRES Server
const { Pool } = pg;
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  idleTimeoutMillis: 30000, // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection cannot be established
});
var SQL_works = false;

// Connect Redis and Postgres
(async () => {
  try {
    await client.connect();
    REDIS_works = true;
    // await client.flushDb();
  } catch (error) {
    console.log("redis connection ERROR");
    REDIS_works = false;

    
  }

  try {
    await pool.query("SELECT * FROM users LIMIT 1");
    await pool.query("SELECT * FROM blogs LIMIT 1");
    await pool.query("SELECT * FROM variables LIMIT 1");
    await pool.query("SELECT * FROM projects LIMIT 1");
    await pool.query("SELECT * FROM media LIMIT 1");
    console.log("Postgres connected succesfully");
    SQL_works = true;
  } catch (e) {
    SQL_works = false;

    
  }
})();

// Setup Routes
const root = express();
/* SETUP MIDDLEWARES */

// For Compression
root.use(compression());
root.use((req, res, next) => {
  res.set("content-type", "text/html; charset=utf-8");
  next();
});

// For Reading Request cookies
root.use(cookieParser());

// Cors Policy
root.use(cors({ origin: "https://kanby.net" }));

// Hide "express.js" from visible on headers
root.disable("x-powered-by");

// Security Headers
root.use(
  "/:lang/",
  helmet({
    xFrameOptions: { action: "deny" },
    referrerPolicy: {
      policy: "no-referrer",
    },
    xPoweredBy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        fontSrc: ["'self'", cdn],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
        styleSrc: ["'self'", "'unsafe-inline'", cdn], // Allow styles from self and inline styles
        imgSrc: ["'self'", cdn], // Allow images from self and data URIs
        connectSrc: ["'self'", cdn], // Allow connections, fetch requests
        // Add other directives as needed
      },
    },
  }),
);
root.use(
  "/admin/",
  helmet({
    xFrameOptions: { action: "deny" },
    referrerPolicy: {
      policy: "no-referrer",
    },
    xPoweredBy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        fontSrc: ["'self'", cdn],
        scriptSrcAttr: ["self", "'unsafe-inline'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://unpkg.com/react@18/umd/react.production.min.js",
          "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
          "https://unpkg.com/babel-standalone@6/babel.js",
        ], // Allow scripts from self and CDN
        upgradeInsecureRequests: [],
        styleSrc: ["'self'", "'unsafe-inline'", cdn], // Allow styles from self and inline styles
        imgSrc: ["'self'", cdn], // Allow images from self and data URIs
        connectSrc: ["'self'", cdn, "https://api.github.com/markdown"], // Allow connections, fetch requests
        // Add other directives as needed
      },
    },
  }),
);

//DB check
root.use((req, res, next) => {
  if (SQL_works && REDIS_works) next();
  else res.send("DB is not connected");
});

// Rate Limit
root.use(async (req, res, next) => {
  try {
    const redisKey = `request:${typeof req?.header("x-forwarded-for") == "string" ? req?.header("x-forwarded-for").split(",")[0] : ""}:count`;
    const currentCount = await client.get(redisKey);

    const redisKey_login = `request:${typeof req?.header("x-forwarded-for") == "string" ? req?.header("x-forwarded-for").split(",")[0] : ""}:login`;
    const currentCount_login = await client.get(redisKey_login);

    var temp =
      typeof req?.header("x-forwarded-for") == "string"
        ? `${req?.header("x-forwarded-for").split(",")[0]}`
        : "undefined";
    var tempRequest = `request_ips:${temp}:${Date.now()}:${req.path}`;

    if (req.path.split("/")?.[1] != "admin") {
      await client.set(tempRequest, temp);
      await client.expire(tempRequest, 172800);
    }

    if (Number(await currentCount_login) >= 10) {
      res.status(401).send("too many requests");
      return;
    }

    if (isNaN(Number(String(await currentCount)))) {
      await client.set(redisKey, "0");
      await client.expire(redisKey, 100);

      next();
      return;
    } else {
      if (Number(await currentCount) >= 50) {
        res.send("too many requests");
        return;
      } else {
        await client.incr(redisKey); // Increments by 1

        next();
        return;
      }
    }
  } catch (e) {
    
    res.send(`<h1>Error: \n  </h1>`);
    return;
  }
});

// Robots.txt
root.get("/robots.txt", function (req, res, next) {
  try {
    res.set("content-type", "text/plain; charset=utf-8");

    res.send(`User-agent: *
Disallow: /admin/
Sitemap: https://kanby.net/sitemap.xml
   `);
  } catch (e) {
    

    res.type("text/html");

    res.send(`<h1>Error: </h1> \n  `);
  }
});

// Manifest.json - Static
root.get("/manifest.json", function (req, res, next) {
  try {
    res.set("content-type", "application/json; charset=utf-8");
    res.send(
      JSON.stringify({
        manifest_version: 3,
        name: "kanby.net - freelance design and development",
        short_name: "kanby.net",
        description: "Freelance desinger and developer",
        version: "1.0.0",
        author: "Emre Kanbay",
        icons: [
          {
            src: cdn + "/assets/logo-16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: cdn + "/assets/logo-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: cdn + "/assets/logo-128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: cdn + "/assets/logo.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        orientation: "portrait",
      }),
    );
  } catch (e) {
    res.type("text/html");

    res.send(`<h1>Error: </h1> \n  `);
    
  }
});

// Rss.xml - Dynamic - English Only For Now
root.get("/rss.xml", async function (req, res, next) {
  try {
    res.set("content-type", "application/xml; charset=utf-8");

    const rss = await Framework.render`<?xml version="1.0" encoding="UTF-8"?>
	<rss version="2.0">
	  <channel>
		<title>Blogs</title>
		<link>https://kanby.net/English/blogs/</link>
		${async () => {
      try {
        const text = `SELECT * FROM blogs Where language='English'`;

        const values = [];

        var record = await pool.query(text, values);

        return "".concat(
          ...(await Promise.all(
            record.rows.map((t) => {
              return `
	<item>
		<title>${t.title}</title>
		<link>https://kanby.net/English/blogs/${t.id}/</link>
		<description>${t.description}</description>
		<pubDate>${new Date(t.creation_date * 1)}</pubDate>
	</item>
				`;
            }),
          )),
        );
      } catch (error) {
        
        return ``;
      }
    }}
		</channel>
 
		<channel>
		<title>Projects</title>
		<link>https://kanby.net/English/projects/</link>
		${async () => {
      try {
        const text = `SELECT * FROM projects`;

        const values = [];

        var record = await pool.query(text, values);

        return "".concat(
          ...(await Promise.all(
            record.rows.map((t) => {
              return `
	<item>
		<title>${t["English"].title}</title>
		<link>https://kanby.net/English/projects/${t.id}/</link>
		<description>${t["English"].description}</description>
	</item>
				`;
            }),
          )),
        );
      } catch (error) {
        
        return ``;
      }
    }}
		</channel>
 </rss>`;

    res.send(rss);
  } catch (e) {
    res.type("text/html");
    res.send(`<h1>Error: </h1> \n  `);
    
  }
});

// Sitemap.xml - Dynamic - Multilinugal
root.get("/sitemap.xml", async function (req, res, next) {
  try {
    res.set("content-type", "application/xml; charset=utf-8");

    const sitemap =
      await Framework.render`<?xml version="1.0" encoding="UTF-8"?>
 
 <urlset 
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
     http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
     xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:xhtml="http://www.w3.org/1999/xhtml"   
 >
	<url>
		<loc>https://kanby.net/Turkish/contact/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/contact/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/contact/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/contact/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/contact/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/contact/" />
	</url>
 
	<url>
		<loc>https://kanby.net/Turkish/services/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/services/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/services/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/services/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/services/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/services/" />
	</url>
 
	<url>
		<loc>https://kanby.net/Turkish/about/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/about/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/about/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/about/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/about/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/about/" />
	</url>
 
 
	<url>
		<loc>https://kanby.net/Turkish/projects/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/projects/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/projects/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/projects/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/projects/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/projects/" />
	</url>
 
	<url>
		<loc>https://kanby.net/Turkish/blogs/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/blogs/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/blogs/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/blogs/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/blogs/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/blogs/" />
	</url>
 
	<url>
		<loc>https://kanby.net/Turkish/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/" />
	</url>
 
	<url>
		<loc>https://kanby.net/English/</loc>   
		<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/" />
		<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/" />
	</url>
 
		${async () => {
      try {
        const text = `SELECT * FROM blogs Where language='English'`;

        const values = [];

        var record = await pool.query(text, values);

        return "".concat(
          ...(await Promise.all(
            record.rows.map((t) => {
              return `
<url>
<loc>https://kanby.net/English/blogs/${t.id}/</loc>   
<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/blogs/${t.id}/" />
</url>
					`;
            }),
          )),
        );
      } catch (error) {
        
        return ``;
      }
    }}
 
				${async () => {
          try {
            const text = `SELECT * FROM blogs Where language='Turkish'`;

            const values = [];

            var record = await pool.query(text, values);

            return "".concat(
              ...(await Promise.all(
                record.rows.map((t) => {
                  return `
<url>
<loc>https://kanby.net/Turkish/blogs/${t.id}/</loc>   
<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/${t.id}/" />
</url>
				`;
                }),
              )),
            );
          } catch (error) {
            
            return ``;
          }
        }}
 
 
						${async () => {
              try {
                const text = `SELECT * FROM projects`;

                const values = [];

                var record = await pool.query(text, values);

                return "".concat(
                  ...(await Promise.all(
                    record.rows.map((t) => {
                      return `
<url>
<loc>https://kanby.net/Turkish/projects/${t.id}/</loc>   
<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/projects/${t.id}/" />
<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/projects/${t.id}/" />
</url>
<url>
<loc>https://kanby.net/English/projects/${t.id}/</loc>   
<xhtml:link rel="alternate" hreflang="en" href="https://kanby.net/English/projects/${t.id}/" />
<xhtml:link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/projects/${t.id}/" />
</url>
				`;
                    }),
                  )),
                );
              } catch (error) {
                
                return ``;
              }
            }}
 </urlset>
 `;

    res.send(sitemap);
  } catch (e) {
    res.type("text/html");
    res.send(`<h1>Error: </h1> \n  `);
    
  }
});

// Security of Root endpoint
root.all("/", (req, res, next) => {
  if (req.method == "GET") next();
  else {
    res.status(405).send({
      message: `The method ${req.method} is not allowed for the requested endpoint.`,
    });
  }
});

// These are the endpoints which should not add trailing slashes
// Rest endpoints will have trailing slashes to be consistent
root.use((req, res, next) => {
  var preservedPaths = [
    "mainfest.json",
    "sitemap.xml",
    "robots.txt",
    "rss.xml",
  ];

  try {
    if (req.method == "GET") {
      if (
        !preservedPaths.includes(req.path.split("/")[1]) ||
        typeof req.path.split("/")[1] == "undefined"
      ) {
        if (req.path.substr(-1) !== "/") {
          res.redirect(req.path + "/");
          return;
        } else {
          next();
          return;
        }
      } else {
        next();
        return;
      }
    } else {
      next();
    }
  } catch (e) {
    res.send(`<h1>Error: </h1> \n  `);
    
  }
});

// Authemtication middleware For Logged In Users
const auth = async (req, res, next) => {
  try {
    const token = req?.cookies?.SessionToken;

    var JWT_SECRET;

    if (await client.get("JWT_SECRET")) {
      JWT_SECRET = await client.get("JWT_SECRET");
    } else {
      JWT_SECRET = crypto.randomBytes(64).toString("hex");
      await client.set("JWT_SECRET", JWT_SECRET);
      await client.expire("JWT_SECRET", 60 * 60 * 24 * 7);
    }

    if (req.method == "POST" && req.originalUrl == "/admin/login/") {
      const redisKey = `request:${typeof req?.header("x-forwarded-for") == "string" ? req?.header("x-forwarded-for").split(",")[0] : ""}:login`;
      const currentCount = await client.get(redisKey);

      var temp =
        typeof req?.header("x-forwarded-for") == "string"
          ? `${req?.header("x-forwarded-for").split(",")[0]}`
          : "undefined";
      var tempLogin = `login_attempts:${temp}:${Date.now()}`;
      await client.set(tempLogin, temp);
      await client.expire(tempLogin, 172800);

      if (isNaN(Number(String(await currentCount)))) {
        await client.set(redisKey, "0");
        await client.expire(redisKey, 172800);
      } else {
        await client.incr(redisKey); // Increments by 1
      }

      if (token) {
        res.clearCookie("SessionToken");
        res.send("Existing token found, token removed.");
        return;
      }

      const text = `SELECT id, password_hash,salt  FROM "users" WHERE login_name = $1`;

      const values = [String(req?.body?.login_name)];
      var record = await pool.query(text, values);

      if (
        record.rows.length == 1 &&
        record.rows[0].password_hash ==
          crypto
            .createHash("sha256")
            .update(
              String(record.rows[0].salt) +
                "" +
                String(req?.body?.login_password),
            )
            .digest("hex")
      ) {
        const token = jwt.sign(
          {
            username: req?.body?.login_name,
            ip:
              typeof req?.header("x-forwarded-for") == "string"
                ? req?.header("x-forwarded-for").split(",")[0]
                : "",
          },
          JWT_SECRET,
          { expiresIn: "7200s" },
        );
        res.cookie("SessionToken", token, {
          expires: new Date(Date.now() + 3600 * 60 * 10),
          httpOnly: true,
          secure: true,
          domain: req.get("host") == "localhost" ? "" : "kanby.net",
          sameSite: "strict",
        });
        req.customData = { record };
        next();
        await client.set(redisKey, "0");
        await client.expire(redisKey, 172800);
        return;
      } else {
        res
          .status(401)
          .send(
            await Components.visitor.ErrorBox.html({ message: "login failed" }),
          );
        return;
      }
    }

    if (!token) {
      if (req.method == "GET") {
        res.send(await LoginPage.html({ langCode: "en", language: "English" }));
      } else {
        res.status(405).send({
          error: "Not Autherized",
        });
      }
      return;
    }

    var ret;
    // Verifies The Token
    try {
      ret = jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          return { pass: false };
        }

        if (
          String(payload.ip) ==
          String(
            typeof req?.header("x-forwarded-for") == "string"
              ? req?.header("x-forwarded-for").split(",")[0]
              : "",
          )
        ) {
          return { pass: true, payload: payload };
        } else {
          return { pass: false };
        }
      });
    } catch (e) {
      
      ret = { pass: false };
    }

    // if token is valid and ip address is same and user id is accurate, continiue with next()
    if (ret.pass) {
      const text = `SELECT login_name, password_hash, id FROM "users" WHERE login_name = $1`;

      const values = [ret?.payload?.username];

      var record = await pool.query(text, values);

      if (req.params.id == record.rows[0].id || req.params.id == "login") {
        req.customData = { record };
        next();
        return;
      } else {
        if (req.method == "GET") {
          res.status(401).send("<h1>Not autherized</h1>");
        } else {
          res.status(401).send({
            error: "Not autherized",
          });
        }
        return;
      }
    } else {
      res.clearCookie("SessionToken");
      if (req.method == "GET") {
        res.send(await LoginPage.html({ langCode: "en", language: "English" }));
      } else {
        res.status(401).send({
          error: "Not autherized",
        });
      }
      return;
    }
    // else values = [req?.cookies?.login_name, req?.cookies?.password_hash];
  } catch (e) {
    res.status(500).send(errorPage());
    return;
  }
};

// Process Login attemt
root.post("/admin/login/", upload.none(), auth, async (req, res, next) => {
  try {
    res.redirect(
      `${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`,
    );
  } catch (e) {
    res.send(`<h1>Error: </h1> \n  `);
    
  }
});

// Check authentication for admin page
root.use("/admin/:id", auth, async (req, res, next) => {
  try {
    if (req.originalUrl == `/admin/${req.customData.record.rows[0]["id"]}/`)
      res.redirect(
        `${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`,
      );
    else if (req.originalUrl == "/admin/login/")
      res.redirect(
        `${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`,
      );
    else next();
  } catch (e) {
    res.status(500).send(errorPage());
    
  }
});

// Export Variables
module.exports = {
  __rootDir: __dirname,
  pool,
  upload,
  express,
  client,
  crypto,
};

// Route Handlers
const visitor = require("./Routes/visitor");
const admin = require("./Routes/admin");
root.use("/admin", admin);
root.use("/", visitor);

// not found page
root.use("/:lang", async (req, res, next) => {
  try {
    if (req.method == "GET") {
      
      const query = await pool.query("SELECT * FROM variables");
      if (query.rows[0].value.includes(req.params.lang)) {
        const langCode =
          query.rows[0].value_2[query.rows[0].value.indexOf(req.params.lang)];

        res.send(
          await NotFound.html({
            language: req.params.lang,
            langCode: langCode,
          }),
        );
      } else {
        res.send(await NotFound.html({ language: "English", langCode: "en" }));
      }
    } else {
      res.status(405).send({
        message: `The method ${req.method} is not allowed for the requested endpoint.`,
      });
    }
  } catch (error) {
    
    res.status(500).send(errorPage());
  }
});

// start server
const server = root.listen(3000, () => {
  console.log("Server Connected");
});

// Shutdown DBs properly
process.on("SIGINT", async () => {
  await client.quit();
  await pool.end();
  server.close(() => {
    console.log("EXPRESS server closed");
    console.log("REDIS server closed");
    console.log("SQL server closed");
    process.exit(0);
  });
});
process.on("SIGTERM", async () => {
  await client.quit();
  await pool.end();
  server.close(() => {
    console.log("EXPRESS server closed");
    console.log("REDIS server closed");
    console.log("SQL server closed");
    process.exit(0);
  });
});
