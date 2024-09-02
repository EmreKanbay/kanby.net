const Components = require("../Components");

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

const script = (data) => construct``


module.exports = async (data) => await  construct`
	<!doctype html>
	<html lang="en">
		<head>
			${await data.head}
		</head>
		<body>
			${await Components.visitor.Header.html()} ${await data.content} ${await Components.visitor.Footer.html()}
		
			${()=> {return typeof script() != "undefined" ? `<script>${script()}</script>` : null}}
		
			</body>
	</html>
`

