const Header = require("../Components/Header");
const Footer = require("../Components/Footer");
const VisitorStaticPageLayout = require("../Layouts/VisitorStaticPageLayout");

const html = x => {
	return x + "";
};

module.exports = () =>
	VisitorStaticPageLayout(
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
