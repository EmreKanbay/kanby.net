const Layouts = require("#Layouts");
const Framework = require("#Framework");
const Components = require("#Components");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const translation = {
  Turkish: {
    title: "Hakkında",
    description: "Ben arayüz tasarlayan ve kod yazan bir yazılımcıyım",
    key1: "Ben Kimim?",
    key2: "Yaılım yazmak hobisi olan bir insanım",
  },
  English: {
    title: "About",
    description:
      "I am a software engineer who writes code and designs interfaces",
    key1: "Who Am I?",
    key2: "A person who likes to code",
  },
};

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
      customData: data.customData,

      head: await Framework.render`
 
			<title>${he.encode(translation[data.customData.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.customData.language].description)}">

          
  		<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/about/" >
			<link rel="alternate" hreflang="en" href="https://kanby.net/English/about/" >
			<link rel="alternate" href="https://kanby.net/English/about/" hreflang="x-default" />
			`,

      content: await Framework.render`
					<div class="cont">
					
					<h1>${translation[data.customData.language].key1}</h1>

					<p>${translation[data.customData.language].key2}</p>
					

					</div>

					<style>
					
					.cont{
					
					width:80%;
					margin:auto;
					}

					.cont p{
					
							text-align: justify;

					}
			
					
					</style>
			`,
    }),
};
