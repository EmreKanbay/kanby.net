const Components = require("../Components");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async (data) =>
  await Framework.render`
	<!doctype html>
	<html>
		<head>

		<meta charset="utf-8">
                	<meta name="robots" content="noindex,nofollow">

       	<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${cdn}" rel="dns-prefetch">
		<link rel="preconnect" href="${cdn}" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri+Quran&display=swap" rel="stylesheet">
		${await data.head}
		</head>
		<body>
			
			${await data.content} 

			</body>
	</html>
`;
