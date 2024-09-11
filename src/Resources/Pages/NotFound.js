const Layouts = require("#Layouts");


const construct = async (x, ...values) => {
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

module.exports = { 
	html: async (data) =>  await Layouts.VisitorLayout({
		head: await construct`
		<title>404</title>
	`,content: await construct`

	<h1 style="text-align:center"> This page is not found</h1>
${()=> {return typeof data?.script != "undefined" ? `<script>${data?.script}</script>` : ""}}

	   `

	}
	), js: (data) => construct``
}
	
