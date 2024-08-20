let ejs = require("ejs");

const html = x => {
	return x + "";
};

module.exports = (head, body) =>
	ejs.render(
		html`
			<!doctype html>
			<html lang="en">
				<head>
					<%- head %>
				</head>
				<body>
					<%- body %>
				</body>
			</html>
		`,
		{ head, body },
	);
