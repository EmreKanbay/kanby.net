const Components = require("../Components");

const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};
module.exports = (head, content) => html`
	<!doctype html>
	<html lang="en">
		<head>
			${head}
		</head>
		<body>
			${Components.visitor.Header()} ${content} ${Components.visitor.Footer()}
		</body>
	</html>
`;
