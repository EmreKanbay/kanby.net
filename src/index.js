//Import libraries
const express = require("express");
var cors = require("cors");
const multer = require("multer");
const pg = require("pg");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

//Initalize libraries
const { Pool } = pg;
const upload = multer();

//configure libraries
const pool = new Pool({
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	database: process.env.PG_DB,
});

//Global variables
module.exports = {
	__rootDir: __dirname,
	pool,
	upload,
	express,
};

// Setup Routes
const root = express();
const admin = require("./Routes/admin");
const getComponents = require("./Routes/getComponent");

// Setup Middlewares
root.use(cors());
root.use(cookieParser());

root.use("/admin/", async (req, res, next) => {
	var record;
	try {
		if (typeof req.cookies?.login_name != "undefined" && typeof req.cookies?.password_hash != "undefined") {
			record = await pool.query(
				`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req.cookies?.login_name}' AND password_hash='${req.cookies?.password_hash}'`,
			);

			if (record.rows.length == 1) {
				if (req.path == "/login") {
					res.redirect(new URL(`/admin/${record.rows[0]?.id}`, req.protocol + "://" + req.get("host")));
				} else if (req.path == "/") {
					res.redirect(new URL(`/admin/${record.rows[0]?.id}`, req.protocol + "://" + req.get("host")));
				} else {
					next();
				}
			} else {
				if (req.path == "/login") {
					next();
				} else {
					res.statusMessage = "Not Authorized";
					res.status(401).send("<h1>Not Authorized</h1>");
				}
			}
		} else {
			if (req.path == "/login") {
				next();
			} else {
				// res.redirect(new URL(`/`, req.protocol + "://" + req.get("host")));

				res.statusMessage = "Not Authorized";
				res.status(401).send("<h1>Not Authorized</h1>");
			}
		}
	} catch (error) {
		console.log(error);
		// res.redirect(new URL(`/`, req.protocol + "://" + req.get("host")));
		res.statusMessage = "Internal Server Error";
		res.status(401).send("<h1>Internal Server Error</h1>");
	}
});

// Define Routes
root.use("/assets", express.static(path.join(__dirname, "Assets")));
root.use("/admin", admin);
root.use("/get-component", getComponents);

root.get("/", (req, res) => {
	res.send("Home Page");
});

// start server
root.listen(3000, () => {
	console.log("Server Connected");
});
