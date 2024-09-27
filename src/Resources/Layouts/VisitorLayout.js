const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async (data) =>
  await Framework.render/*html*/`
	<!doctype html>
	<html lang="${data.customData.langCode}">
		<head>

		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-F9V8ZKW15K"></script>
		<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-F9V8ZKW15K');
		</script>


		<base href="/${data.customData.language}/">
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

			${await Components.visitor.Header.html({ customData: data.customData })} 
			
			<main style="padding-top:3rem">
			${await data.content} 
			</main>


			
			${await Components.visitor.Footer.html({ customData: data.customData })}
			${async ()=> {

				if(!data.customData.cookiesGranted) return await Components.visitor.CookieConsent.html({ customData: data.customData })
				
			}}

 
			</body>
	</html>
`;
