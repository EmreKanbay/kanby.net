//Import libraries
const express = require("express");
const multer = require("multer");
const pg = require("pg");
require("dotenv").config();
const sha256 = require("js-sha256");
const path = require("path");
const cookieParser = require("cookie-parser");
const notFound = require("./Resources/Pages/NotFound");
const crypto = require("crypto");

//Initalize libraries
const { Pool } = pg;

//configure libraries
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
});

var DB_connected = false;
(async () => {
	try {
		await pool.query("SELECT 1");
		console.log("works")
		await pool.query("SELECT * FROM users");
		console.log("works")
		await pool.query("SELECT * FROM blogs");
		console.log("works")
		await pool.query("SELECT * FROM variables");
		console.log("DB connected succesfully");
		DB_connected = true;
	} catch (e) {
		DB_connected = false;

		console.log("hata");
		console.log(e);
	}
})();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./src/Media");
	},
	filename: async function (req, file, cb) {
		var [main, ext] = file.originalname.split(".");

		cb(null, main + "-" + crypto.randomUUID().split("-")[1] + "." + ext);
	},
});

const upload = multer({ storage: storage });

const auth = async (req, res) => {
	var record = await pool.query(
		`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req?.cookies?.login_name}' AND password_hash='${req?.cookies?.password_hash}'`,
	);

	if (record.rows.length == 1) {
		res.cookie("login_name", record.rows[0].login_name, { expires: new Date(Date.now() + 36000000), httpOnly: false });
		res.cookie("password_hash", record.rows[0].password_hash, {
			expires: new Date(Date.now() + 36000000),
			httpOnly: false,
		});
		res.cookie("user_id", record.rows[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: false });

		return { authenticated: true, record: record };
	} else return { authenticated: false };
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
const admin = require("./Routes/admin");
const visitor = require("./Routes/visitor");
const getComponents = require("./Routes/getComponent");

// Setup Middlewares
root.use(cookieParser());

root.get('/robots.txt', function (req, res, next) {
    res.type('text/plain')

     res.send("User-agent: *\nDisallow: /");
});


root.use("/", (req, res, next) => {
	if (DB_connected) next();
	else res.send("DB is not connected");
});

// remove trailing slash to all requests

root.use((req, res, next) => {
	var static = ["media", "assets", "robots.txt"];

	if (!static.includes(req.path.split("/")[1]) || typeof req.path.split("/")[1] == "undefined") {
		if (req.path.substr(-1) !== "/") {
			// req.url = .slice(0,-1)
			// root.handle(req, res, next)
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
});

// Admin'e gelince credential kontrol ediyor Çünki yetki gerektiren tek admin var

root.use("/admin/", async (req, res, next) => {
	if (DB_connected) {
	} else {
		res.send("DB CONENCTİON ERROR");
		return;
	}
	var checkAuth = await auth(req, res);

	if (checkAuth.authenticated) {
		if (req.path == "/login/") {
			res.redirect(new URL(`/admin/${checkAuth.record.rows[0]?.id}/dashboard`, req.protocol + "://" + req.get("host")));
		} else if (req.path == "/") {
			res.redirect(new URL(`/admin/${checkAuth.record.rows[0]?.id}/dashboard`, req.protocol + "://" + req.get("host")));
		} else {
			next();
		}
	} else {
		if (req.path == "/login/") {
			next();
		} else {
			res.statusMessage = "Not Authorized";
			res.status(401).send("<h1>Not Authorized</h1>");
		}
	}
});

// Statik medyalar
root.use("/assets", express.static(path.join(__dirname, "kanby.net/assets")));


root.use("/media", express.static(path.join(__dirname, "Media")));

// Route Handlers
root.use("/admin", admin);

root.use("/get-component", getComponents);

root.use("/", visitor);

root.use("/", async (req, res) => {
	res.send(await notFound.html());
});

// start server
root.listen(3000, () => {
	console.log("Server Connected");
});
