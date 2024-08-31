const Layouts = require("../Layouts/Layouts");


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

// ${(()=> String(Components.visitor.ErrorBox("")))()}

module.exports = () =>
	Layouts.VisitorLayout(
		(head = html`
			<link
				rel="stylesheet"
				href="/assets/globals.css" />
			<title>404</title>
		`),
		(content = html`

      <h1 style="text-align:center"> This page is not found</h1>
 		`),
	);
