const Layouts = require("../Layouts/Layouts");


const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

module.exports = () =>
	Layouts.VisitorLayout(
		(head = html`
			<link
				rel="stylesheet"
				href="/assets/globals.css" />
			<title>Kanby</title>
		`),
		(body = `
  
    Landing Page
    
      `),
	);
