let ejs = require("ejs");

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
