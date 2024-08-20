let ejs = require("ejs");

module.exports = data =>
	ejs.render(
		html`
			<div>
				<h1>Footer</h1>

				<p><%= data.description %></p>
			</div>
		`,
		{ data },
	);
