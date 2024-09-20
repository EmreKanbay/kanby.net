const Layouts = require("#Layouts");
const Framework = require("#Framework");
const Components = require("#Components");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const translation = {
	Turkish: {
		title: "Servisler",
        description:"Ben arayüz tasarlayan ve kod yazan bir yazılımcıyım",

	},
	English: {
		title: "Services",
        description:'I am a software engineer who writes code and designs interfaces',

	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
      langCode:data.langCode,
			language: data.language,
			head: await Framework.render`
			<title>${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}">
	        <meta name="robots" content="index,follow">
									
        	<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/services/" >
		<link rel="alternate" hreflang="en" href="https://kanby.net/English/services/" >
		<link rel="alternate" href="https://kanby.net/English/services/" hreflang="x-default" />

			`,

			content: await Framework.render`
Services
			`,
		}),
};
