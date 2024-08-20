let ejs = require("ejs");
const html = x => {
	return x + "";
};

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
