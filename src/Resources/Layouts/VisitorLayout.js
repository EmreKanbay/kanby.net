const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async data =>
	await Framework.render`
	<!doctype html>
	<html lang="en">
		<head>
				<meta charset="utf-8">
            	<meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="robots" content="index,follow">
				<link rel="stylesheet" href="/assets/globals.css" />
				<link rel="icon" href="${cdn}/assets/logo.svg">
				<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">
				<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/" >
				<link rel="alternate" hreflang="en" href="https://kanby.net/English/" >

				${await data.head}

			
		</head>
		<body>

			${await Components.visitor.Header.html({ language: data.language })} 
			
			<main style="padding-top:3rem">
			${await data.content} 
			</main>
			
			${await Components.visitor.Footer.html({ language: data.language })}
		

			</body>
	</html>
`;
