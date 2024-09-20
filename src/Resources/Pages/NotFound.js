const Layouts = require("#Layouts");

require("dotenv").config();
const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

const translation = {
	Turkish: {
		key1: "Sayfa Bulunamadı",
	},
	English: {
		key1: "Page Not Found",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
	    langCode:data.langCode,
			language: data.language,

			head: await Framework.render`
		<title>404 | Not Found</title>
	`,
			content: await Framework.render`


			<main style="width:100%; display:flex;align-items:center;flex-direction:column;margin:2rem 0rem">
			
			<img style="width:60%" src="${cdn}/assets/notfound.svg" alt="not-found"/>
			
			<h1 style="text-align:center">${translation[data.language].key1}</h1>
			</main>



	   `,
		}),
};
