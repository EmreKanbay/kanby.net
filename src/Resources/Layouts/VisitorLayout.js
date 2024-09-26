const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async (data) =>
  await Framework.render/*html*/`
	<!doctype html>
	<html lang="${data.langCode}">
		<head>
		<base href="/${data.language}/">
		<meta charset="utf-8">
       	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preload" href="${cdn}/assets/github-markdown-light.css" as="style" />
        <link rel="preload" href="${cdn}/assets/loading.svg" as="image" type="image/svg+xml"/>
        <link href="${cdn}" rel="dns-prefetch">
		<link rel="stylesheet" href="${cdn}/assets/globals.css" />
		<link rel="apple-touch-icon" sizes="128x128" href="${cdn}/assets/logo-128.png">
		<link rel="icon" type="image/svg+xml" href="${cdn}/assets/logo.svg">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-16.png" sizes="16x16">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="${cdn}/assets/logo-48.png" sizes="48x48">
		<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">
		<link rel="preconnect" href="${cdn}" />
		${await data.head}
		</head>
		<body>

			${await Components.visitor.Header.html({ language: data.language, langCode: data.langCode })} 
			
			<main style="padding-top:3rem">
			${await data.content} 
			</main>
			
			${await Components.visitor.Footer.html({ language: data.language, langCode: data.langCode })}
			${await Components.visitor.CookieConsent.html({ language: data.language, langCode: data.langCode })}

		

			</body>
	</html>
`;
