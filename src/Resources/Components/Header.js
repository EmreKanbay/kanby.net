const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

module.exports = data => html`
	<div class="header-container">
		${[1, 2, 3, 4]
			.map(t => {
				return `<div>Your number is ${t}</div>`;
			})
			.toString()
			.replace(/,/g, "")}
		<h1>HEADER</h1>

		<button onclick="ale()">test</button>

		<p>${data.description}</p>
	</div>

	<script>
		function ale() {
			alert(12);
		}
	</script>
`;
