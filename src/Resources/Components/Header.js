let ejs = require("ejs");

const html = x => {
	return x + "";
};

module.exports = data =>
	ejs.render(
		html`
			<div class="header-container">
				<h1>HEADER</h1>

				<button onclick="ale()">test</button>

				<p><%= data.description %></p>
			</div>
		`,
		{ data },
	);
