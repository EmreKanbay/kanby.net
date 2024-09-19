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
			language: data.language,
			head: await Framework.render`
			<title>${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}">
            <link rel="canonical" href="https://kanby.net/${data.language}/services/">
	        <meta name="robots" content="index,follow">

			`,

			content: await Framework.render`
Services
			`,
		}),
};
