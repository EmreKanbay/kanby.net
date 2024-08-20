const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

module.exports = (head, body) => html`
	<!doctype html>
	<html lang="en">
		<head>
			${head}
		</head>
		<body>
			${body}
		</body>
	</html>
`;
