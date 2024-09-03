//Import libraries
const express = require("express");
 const multer = require("multer");
const pg = require("pg");
require("dotenv").config();
const sha256 = require("js-sha256");
const path = require("path");
const cookieParser = require("cookie-parser");
const notFound = require("./Resources/Pages/NotFound")




//Initalize libraries
const { Pool } = pg;
const upload = multer();

//configure libraries
const pool = new Pool({
connectionString: process.env.PG_STRING
});


var DB_connected = false;
(async () => {

	try{
		await pool.query("SELECT 1")
		await pool.query("SELECT * FROM users")
		await pool.query("SELECT * FROM blogs")
		await pool.query("SELECT * FROM variables")
 		console.log("DB connected succesfully")
		DB_connected = true
	
	}catch(e){
		DB_connected = false
	
		console.log("hata")
		console.log(e)
	}

})()


const auth =async (req, res) => {
 

		var record = await pool.query(
			`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req?.cookies?.login_name}' AND password_hash='${req?.cookies?.password_hash}'`,
		);
	
		if (record.rows.length == 1) {
			res.cookie('login_name', record.rows[0].login_name, { expires: new Date(Date.now() + 36000000), httpOnly: false })
			res.cookie('password_hash', record.rows[0].password_hash, { expires: new Date(Date.now() + 36000000), httpOnly: false })
			res.cookie('user_id', record.rows[0].id, { expires: new Date(Date.now() + 36000000), httpOnly: false })
			
			return {authenticated: true, record: record}
		}
		else return {authenticated: false}
	

	
}




//Global variables
module.exports = {
	__rootDir: __dirname,
	pool,
	upload,
	express,
	auth,
	sha256
};

// Setup Routes
const root = express();
const admin = require("./Routes/admin");
const visitor = require("./Routes/visitor");
const getComponents = require("./Routes/getComponent");
 
// Setup Middlewares
 root.use(cookieParser());

 root.use("/" , (req, res, next) => {

if(DB_connected) next()
else res.send("DB is not connected")


 })


// Admin'e gelince credential kontrol ediyor Çünki yetki gerektiren tek admin var
root.use("/admin/", async (req, res, next) => {


	if(DB_connected){}
	else{res.send("DB CONENCTİON ERROR");return}
		var checkAuth = await auth(req,res)
 			
		if(checkAuth.authenticated){
	
			if (req.path == "/login") {
				res.redirect(new URL(`/admin/${checkAuth.record.rows[0]?.id}/dashboard`, req.protocol + "://" + req.get("host")));
			} else if (req.path == "/") {
				res.redirect(new URL(`/admin/${checkAuth.record.rows[0]?.id}/dashboard`, req.protocol + "://" + req.get("host")));
			} else {
				next();
			}
		}  else {
			if (req.path == "/login") {
				next();
			} else {
				res.statusMessage = "Not Authorized";
				res.status(401).send("<h1>Not Authorized</h1>");
			}
		}


			 
				
		
	
	
});



// Statik medyalar
root.use("/assets", express.static(path.join(__dirname, "Assets")));

// Route Handlers
root.use("/admin", admin);

root.use("/get-component", getComponents);
 

root.use("/" , visitor)



root.use("/", async (req, res) => {
	res.send(await notFound.html())
});




// start server
root.listen(3000, () => {
	console.log("Server Connected");
});
