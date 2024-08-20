const Resources = require("#Resources");
const Index = require("#Index");
const sha256 = require("js-sha256");

const admin = Index.express.Router();

admin.get("/", (req, res) => {
	res.redirect("/");
});

admin.get("/login", (req, res) => {
	res.send(Resources.LoginPage());
});

admin.post("/login", Index.upload.none(), async (req, res) => {
	var record;

	// 

	try {
		record = await Index.pool.query(
			`SELECT login_name, password_hash,id FROM "users" WHERE login_name='${req.body["login_name"]}'`,
		);
	} catch {
		res.statusCode = 500;
		res.statusMessage = "Server Error";
		res.send();
	}

 
	try {
		if (record.rowCount == 0) {
			res.statusCode = 404;
			res.statusMessage = "User Not Found";
			res.send();
		} else if (record.rowCount == 1) {
			if (record.rows[0]["password_hash"] == sha256(req.body["login_password"])) {
 				res.cookie("login_name", record.rows[0]["login_name"]);
 				res.cookie("password_hash", record.rows[0]["password_hash"]);
				res.statusCode = 202;
				res.statusMessage = "Password Is Accurate";
                res.redirect(new URL(`/admin/${record.rows[0]["id"]}`,req.protocol+ "://" + req.get("host")))
            } else {
				res.statusCode = 401;
				res.statusMessage = "Password Is Inaccurate";
				res.send();
			}
		} else {
			res.statusCode = 500;
			res.statusMessage = "Multiple Users Have Found In Database";
			res.send();
		}
	} catch (error) {
		res.statusCode = 500;
		res.statusMessage = "Internal Server Error" + error;
		res.send();
	}
});

admin.get("/:id", (req, res) => {
 	res.send("UserPage");
});

module.exports = admin;
