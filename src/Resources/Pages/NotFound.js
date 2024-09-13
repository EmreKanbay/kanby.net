const Layouts = require("#Layouts");


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


const text = {
	Turkish: {
		key1:"Sayfa Bulunamadı",

	},
	English: {
		key1:"Page Not Found",

	}
 	}

	
module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,

			head: await construct`
		<title>404 | Not Found</title>
	`,
			content: await construct`


			<main style="width:100%; display:flex;align-items:center;flex-direction:column;margin:2rem 0rem">
			
			<img style="width:60%" src="${cdn}/assets/notfound.svg" alt="not-found"/>
			
			<h1 style="text-align:center">${text[data.language].key1}</h1>
			</main>



	   `,
		})
};
