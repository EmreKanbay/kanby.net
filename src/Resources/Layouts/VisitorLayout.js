const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async (data) =>
  await Framework.render`
	<!doctype html>
	<html lang="${data.langCode}">
		<head>

<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "o8vt7cctt3");
</script>


		<base href="/${data.language}/">
		<meta charset="utf-8">
				
       	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="index,follow">
        
        <!--Stylesheet for markdown-->
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
		

			</body>
	</html>
`;
