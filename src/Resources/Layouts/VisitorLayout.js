const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

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

const script = data => construct``;

module.exports = async data =>
	await construct`
	<!doctype html>
	<html lang="en">
		<head>


		<style>
		.loading-inline {
display: none;
width: 100%;
height: 70px;
background-repeat: no-repeat;
background-image: url("${cdn}/assets/loading.svg?${Date.now()}");
background-position: center;
background-size: 15%;
}
.loading-inline.active {
display: block;
}

.loading-block {
position: fixed;
z-index:1;
display: none;
width: 80vw;
height: 100%;
background-repeat: no-repeat;
background-image: url("${cdn}/assets/loading.svg?${Date.now()}");
background-position: center;
background-size: 5%;
background-color: rgb(11, 11, 11, 0.5);
}
.loading-block.active {
display: block;
}
</style>
		<link rel="icon" href="${cdn}/assets/logo.svg">

				<link
			rel="stylesheet"
			href="${cdn}/assets/globals.css?${Date.now()}" />
			${await data.head}
		</head>
		<body>
			${await Components.visitor.Header.html()} ${await data.content} ${await Components.visitor.Footer.html()}
		

			</body>
	</html>
`;
