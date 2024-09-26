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
    key2: "Merhaba, ben Emre Kanbay, talebe göre özel uygulamalar geliştiren freelance bir yazılım geliştiricisiyim. Fikirleri gerçeğe dönüştürme tutkusuyla, web ve mobil uygulamalardan masaüstü ve mobil cihazlar için oyun geliştirmeye kadar geniş bir yetenek yelpazesine sahibim. Ayrıca Nesnelerin İnterneti (IoT) projeleri üzerinde çalışıyor, sunucu kurulumu, hosting ve bulut çözümleri sunarak projenizin her aşamasının sorunsuz çalışmasını sağlıyorum. İster tamamen işlevsel bir uygulama, ister sağlam bir sunucu kurulumu arıyor olun, vizyonunuzu hayata geçirmek için buradayım.",
  },
  English: {
    title: "About",
    description:
      "I am a software engineer who writes code and designs interfaces",
    key1: "Who Am I?",
    key2: "Hi, I’m Emre Kanbay, a freelance developer specializing in creating custom apps on demand. With a passion for turning ideas into reality, I bring a wide range of skills to the table—from developing web and mobile apps to building games for desktop and mobile devices. I also work on Internet of Things (IoT) projects, handle server setups, hosting, and cloud solutions, ensuring every aspect of your project runs smoothly. Whether you're looking for a fully functional app or a robust server setup, I’m here to help bring your vision to life.",
  },
};

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
      langCode: data.langCode,
      language: data.language,
      head: await Framework.render`
 
			<title>${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}">

          
  		<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/about/" >
			<link rel="alternate" hreflang="en" href="https://kanby.net/English/about/" >
			<link rel="alternate" href="https://kanby.net/English/about/" hreflang="x-default" />
			`,

      content: await Framework.render`
					<div class="cont">
					
					<h1>${translation[data.language].key1}</h1>

					<p>${translation[data.language].key2}</p>
					

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
