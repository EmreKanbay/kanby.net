const Components = require("../Components/Components");

const html = async (x, ...values) => {
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



module.exports = async (head, content) => html`
	<!doctype html>
	<html lang="en">
		<head>
			${await head}
		</head>
		<body>
			${await Components.visitor.Header()} ${await content} ${Components.visitor.Footer()}
		</body>
	</html>
`;
