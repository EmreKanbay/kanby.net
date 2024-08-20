const Header = require("../Components/Header");
const Footer = require("../Components/Footer");
const BoilerPlate = require("../Components/BoilerPlate");

const html = x => {
	return x + "";
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
    ${Header({ description: "This is my header" })}

            admin panel is this

    ${Footer({ description: "this is my footer" })}
     `),
	);
