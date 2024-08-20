const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};
module.exports = data => html`
	<div>
		<h1>Footer</h1>

		<p>${data.description}</p>
	</div>
`;
