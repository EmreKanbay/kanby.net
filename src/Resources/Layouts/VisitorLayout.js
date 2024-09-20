const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async data =>
	await Framework.render`
	<!doctype html>
	<html lang="${data.langCode}">
		<head>
				<meta charset="utf-8">
       	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="index,follow">
        
        <!--Stylesheet for markdown-->
        <link rel="preload" href="${cdn}/assets/github-markdown-light.css" as="style" />
        
        <link href="${cdn}" rel="dns-prefetch">
				<link rel="stylesheet" href="/assets/globals.css" />
				
				
				<link rel="apple-touch-icon" sizes="128x128" href="${cdn}/assets/logo-128.png">
				<link rel="icon" type="image/svg+xml" href="${cdn}/assets/logo.svg">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-48.png" sizes="48x48">


				<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">
				<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/" >
				<link rel="alternate" hreflang="en" href="https://kanby.net/English/" >
				<link rel="preconnect" href="${cdn}" />


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
