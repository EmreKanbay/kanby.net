const Header = require("../Components/Header");
const Footer = require("../Components/Footer");
const BoilerPlate = require("../Components/BoilerPlate");

const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

module.exports = () =>
	BoilerPlate(
		(head = html`
			<link
				rel="stylesheet"
				href="/assets/globals.css"
			/>
			<title>Login</title>
		`),
		(body = `
    ${Header({ description: "ads" })}
 
    content goes here
    
    ${Footer({ description: "ads" })}
     `),
	);
