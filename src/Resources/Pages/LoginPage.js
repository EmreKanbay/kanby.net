const Header = require("../Components/Header");
const LoginForm = require("../Components/LoginForm");
const Footer = require("../Components/Footer");
const BoilerPlate = require("../Components/BoilerPlate");

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
    ${LoginForm({})}
    ${Footer({ description: "ads" })}
     `),
	);
