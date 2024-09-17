const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const construct = async (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) {
			if (typeof values[u] == "function") {
				rendered = rendered.concat(await values[u]());
			} else {
				rendered = rendered.concat(values[u]);
			}
		}
	}

	return rendered;
};


module.exports = async data =>
	await construct`
	<!doctype html>
	<html lang="en">
		<head>
 
				<link rel="stylesheet" href="${cdn}/assets/globals.css?${Date.now()}" />
				<link rel="icon" href="${cdn}/assets/logo.svg">


			${await data.head}
		</head>
		<body>
			${await Components.visitor.Header.html({ language: data.language })} 
			
			${await data.content} 
			
			${await Components.visitor.Footer.html({ language: data.language })}
		

			</body>
	</html>
`;
