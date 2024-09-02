const Components = require("#Components");

const Index = require("#Index");
 
const getComponents = Index.express.Router();

getComponents.post("/admin/:component_name", Index.express.json(), async (req, res) => {
	var record;
	try {
		if (typeof req.cookies?.login_name != "undefined" && typeof req.cookies?.password_hash != "undefined") {
			record = await Index.pool.query(
				`SELECT login_name, password_hash, id FROM "users" WHERE login_name='${req.cookies?.login_name}' AND password_hash='${req.cookies?.password_hash}'`,
			);

			if (record.rows.length == 1) {
			} else {
				res.statusMessage = "Not Authorized";
				res.status(401).send("<h1>Not Authorized</h1>");
				return;
			}

			if (typeof Components.admin[req.params.component_name] != "undefined") {
				res.send(
					JSON.stringify({
						html: await Components.admin[req.params.component_name].html(req.body),
						js: await Components.admin[req.params.component_name].js(req.body),
					}),
				);
			} else {
				res.send("<h1>Component Not Found</h1>");
			}
		} else {
			res.statusMessage = "Not Authorized";
			res.status(401).send("<h1>Not Authorized</h1>");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("<h1>Internal Server Error</h1>");
	}
});

getComponents.post("/visitor/:component_name", Index.express.json(), (req, res) => {
	if (typeof Components.visitor[req.params.component_name] != "undefined") {
		console.log(req.body);
		res.send(Components.visitor[req.params.component_name](req.body));
	} else {
		res.send("<h1>Component Not Found</h1>");
	}
});

module.exports = getComponents;
