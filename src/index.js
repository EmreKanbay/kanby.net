//Import libraries
const express = require("express");
const multer = require("multer");
const pg = require("pg");
const dotenv = require("dotenv")
const sha256 = require("js-sha256");
const path = require("path");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const Framework = require("#Framework");
const Components = require("#Components");
const LoginPage = require("./Resources/Pages/Visitor/LoginPage")
const jwt = require("jsonwebtoken")
 

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
});
 
const cdn = process.env.CDN_DOMAIN;

var DB_connected = false;

(async () => {
	try {
		await pool.query("SELECT * FROM users LIMIT 1");
		await pool.query("SELECT * FROM blogs LIMIT 1");
		await pool.query("SELECT * FROM variables LIMIT 1");
		await pool.query("SELECT * FROM projects LIMIT 1");
		await pool.query("SELECT * FROM media LIMIT 1");
		console.log("DB connected succesfully");
		DB_connected = true;
	} catch (e) {
		DB_connected = false;

		console.log(e);
	}
})();

const storage = multer.diskStorage({
	filename: async function (req, file, cb) {
	try{
  	var [main, ext] = file.originalname.split(".");
  
  	cb(null, main + "-" + crypto.randomUUID().split("-")[1] + "." + ext);

	}catch(e) {console.log(e)}
	},
});

const upload = multer({ storage });

const auth = async (req, res, next) => {
	try{
 	const token = req?.cookies?.SessionToken

	 if(req.method == "POST" && req.originalUrl == "/admin/login/") {
 
		if (token){
			res.clearCookie("SessionToken")
			res.send("Existing token found, token removed.")
			return;
		}
		const text = `SELECT login_name, password_hash, id FROM "users" WHERE login_name = $1 AND password_hash= $2`;
		const values = [req?.body?.login_name, sha256(req?.body?.login_password)];
		var record = await pool.query(text, values);
	
		if (record.rows.length == 1) {

			const token = jwt.sign({username: req?.body?.login_name}, process.env.JWT_SECRET, { expiresIn: '100s' });
			res.cookie("SessionToken", token, { expires: new Date(Date.now() + 1000000), httpOnly: true, secure: true });
			req.customData = {record}
			next()
			return
	// res.cookie("login_name", record.rows[0].login_name, { expires: new Date(Date.now() + 36000000), httpOnly: true, secure: true });
	// res.cookie("password_hash", record.rows[0].password_hash, { expires: new Date(Date.now() + 36000000), httpOnly: true, secure: true });
	// res.cookie("user_id", record.rows[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: true });
	} else  {  
		
		res.status(401).send(await Components.visitor.ErrorBox.html({ message: "login failed" }))
		return;
	};
	
	
	 }

  	if (!token){
		res.send(await LoginPage.html({langCode: "en", language: "English"}));	
		return
	}


	var ret;
	
	try{
		ret = jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				return { pass:false }}
			return { pass:true, payload: payload}
	})
	}catch(e){console.log(e); ret = { pass:false }}




if (ret.pass) {

	const text = `SELECT login_name, password_hash, id FROM "users" WHERE login_name = $1`;

const values = [ret?.payload?.username];

var record = await pool.query(text, values);

if(req.params.id == record.rows[0].id || req.params.id == "login" ){
	
	req.customData = {record}
		next()
		return;

}else{
	res.status(401).send("<h1>Not Authorized</h1>");
	return
}
}
else{
	res.clearCookie("SessionToken")
	 res.send("Credentials not accepted, try again");
	 return
} 
// else values = [req?.cookies?.login_name, req?.cookies?.password_hash];  
 	
	}
	catch(e){
	console.log(e)
		}


};

//Global variables
module.exports = {
	__rootDir: __dirname,
	pool,
	upload,
	express,
	auth,
	sha256,
};

// Setup Routes
const root = express();
const visitor = require("./Routes/visitor");
const getComponents = require("./Routes/getComponent");
const admin = require("./Routes/admin");


// Setup Middlewares
root.use(cookieParser());

root.get("/robots.txt", function (req, res, next) {
  
  try{
   	res.type("text/plain");
   
	res.send(`User-agent: *
   Disallow: /admin/
   Sitemap https://kanby.net/sitemap.xml
   `);
  }catch(e){
    
    console.log(e)
    res.status(500).send("<h1>Error</h1>")
  }

});

root.get("/manifest.json", function (req, res, next) {
  try{
    res.type("application/json");
    res.send(JSON.stringify(
	{
    "manifest_version": 3,
    "name": "kanby.net - freelance design and development",
    "short_name": "kanby.net",
    "description": "Freelance desinger and developer",
     "version": "1.0.0",
	"author": "Emre Kanbay",
	"icons": [
	
       {
         "src": cdn + "/assets/logo-16.png",
         "sizes": "16x16",
         "type": "image/png"
       },
       {
         "src": cdn + "/assets/logo-64.png",
         "sizes": "64x64",
         "type": "image/png"
       },
       {
         "src": cdn + "/assets/logo-128.png",
         "sizes": "128x128",
         "type": "image/png"
       },
       {
         "src": cdn + "/assets/logo.svg",
         "sizes": "any",
         "type": "image/svg+xml"
       }
     ],
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#ffffff",
     "orientation": "portrait",
	}))
    
  }catch(e){
    res.status(500).send("<h1>Error</h1>")
    console.log(e)
  }

	;});

root.get("/rss.xml", async function (req, res, next) {
  
try{
 	res.type("application/xml");
 
	const rss = await Framework.render
 `<?xml version="1.0" encoding="UTF-8"?>
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
			record.rows.map(t => {
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
	console.log(error)
	return ``
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
			record.rows.map(t => {
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
	console.log(error)
	return``
}
		}}
		</channel>
 </rss>`
 
	res.send(rss);
}catch(e){
  console.log(e)
  res.status(500).send("<h1>Error</h1>")
}
});

root.get("/sitemap.xml", async function (req, res, next) {
try{
 	res.type("application/xml");
 
	const sitemap = await Framework.render
 `<?xml version="1.0" encoding="UTF-8"?>
 
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
			record.rows.map(t => {
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
	console.log(error)
	return``
}
		}}
 
				${async () => {
try {
	const text = `SELECT * FROM blogs Where language='Turkish'`;
 
	const values = [];

	var record = await pool.query(text, values);

	return "".concat(
		...(await Promise.all(
			record.rows.map(t => {
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
	console.log(error)
	return ``
}
		}}
 
 
						${async () => {
try {
	const text = `SELECT * FROM projects`;
 
	const values = [];

	var record = await pool.query(text, values);

	return "".concat(
		...(await Promise.all(
			record.rows.map(t => {
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
	console.log(error)
	return``
	
}
		}}
 </urlset>
 `
 
	res.send(sitemap);
}catch(e){
  console.log(e)
  res.status(500).send("<h1>Error</h1>")
}
});

//DB check
root.use((req, res, next) => {
	if (DB_connected) next();
	else res.send("DB is not connected");
});

// These are the endpoints which should not add trailing slashes
root.use((req, res, next) => {
	var preservedPaths = ["mainfest.json", "sitemap.xml", "assets", "robots.txt", "rss.xml"];

try{
 	if (!preservedPaths.includes(req.path.split("/")[1]) || typeof req.path.split("/")[1] == "undefined") {
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
}catch(e){
  console.log(e)
  res.status(500).send("<h1>Error</h1>")
}
});

root.post("/admin/login/", upload.none(), auth , async (req, res, next) => {
  
	try{	  
		res.redirect(`${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`);
	}catch(e){
			console.log(e);
		  res.status(500).send("Error");
	  
	}
  
	
  })

root.use("/admin/:id", auth, async (req, res, next) => {
  
	try {
		if(req.method == "POST" && req.originalUrl == "/admin/login/") {return}

 	if (req.originalUrl == `/admin/${req.customData.record.rows[0]["id"]}/`) res.redirect(`${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`);
	else if (req.originalUrl == "/admin/login/") res.redirect(`${req.protocol}://${req.get("host")}/admin/${req.customData.record.rows[0]["id"]}/dashboard/`);
    else next(); 

	
	} catch (error) {
		console.log(error);
		res.status(500).send("Error");
	}
});




// root.use("/media", express.static(path.join(__dirname, "Media")));

// Route Handlers
root.use("/assets", express.static(path.join(__dirname, "Assets")));
root.use("/admin", admin);
root.use("/get-component", getComponents);
root.use("/", visitor);

// start server
root.listen(3000, () => {
	console.log("Server Connected");
});
