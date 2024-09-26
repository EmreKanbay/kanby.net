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
    description: "Ben arayüz tasarlayan ve kod yazan bir yazılımcıyım",
    key1: "Hizmetlerim",
    key1_1:
      "Geniş bir yelpazede sunduğum hizmetlerle projelerinizi dijital dünyaya taşıyorum. İşte sizin için sunabileceğim hizmetler:",
    key2: "Web Uygulamaları",
    key2_1:
      "İhtiyaçlarınıza özel, modern, kullanıcı dostu web uygulamaları geliştiriyorum. Hızlı, güvenli ve sorunsuz çalışan çözümler sunuyorum",
    key3: "Mobil Uygulamalar (iOS & Android)",
    key3_1:
      "iOS ve Android platformlarına yönelik, hem işlevsel hem de estetik mobil uygulamalar geliştiriyorum. Tüm cihazlarda mükemmel bir kullanıcı deneyimi sağlıyorum",
    key4: "Oyun Geliştirme (Masaüstü & Mobil)",
    key4_1:
      "Masaüstü ve mobil cihazlar için akıcı, eğlenceli ve yüksek performanslı oyunlar tasarlıyor ve geliştiriyorum",
    key5: "IoT (Nesnelerin İnterneti) Projeleri",
    key5_1:
      "Akıllı cihazlarınızı bir araya getirip iş süreçlerinizi optimize eden IoT projeleriyle dijital dönüşümünüzü destekliyorum",
    key6: "Sunucu Kurulumu & Hosting",
    key6_1:
      "Güçlü, güvenli ve ölçeklenebilir sunucu çözümleri sunuyorum. Sunucu kurulumu, yönetimi ve hosting hizmetleri ile altyapınızı baştan sona inşa ediyorum",
    key7: "Bulut Sunucu Kurulumu",
    key7_1:
      "Bulut sunucuları üzerine kurulum yaparak verilerinizi güvenli bir şekilde yönetmenize olanak tanıyorum. Esnek ve ölçeklenebilir bulut çözümleri sunuyorum",
    key8: "SQL Sunucu Kurulumu",
    key8_1:
      "Veritabanı yönetim sistemlerinizi optimize ederek verilerinizi daha etkin ve güvenli bir şekilde depolamanıza yardımcı oluyorum",
  },
  English: {
    title: "Services",
    description:
      "I am a software engineer who writes code and designs interfaces",
    key1: "My Services",
    key1_1:
      "I offer a wide range of services to bring your projects into the digital world. Here’s what I can do for you:",
    key2: "Web Applications",
    key2_1:
      "I develop modern, user-friendly web applications tailored to your needs. I provide fast, secure, and seamless solutions",
    key3: "Mobile Applications (iOS & Android)",
    key3_1:
      "I create functional and aesthetic mobile apps for both iOS and Android platforms, ensuring an excellent user experience across all devices",
    key4: "Game Development (Desktop & Mobile)",
    key4_1:
      "I design and develop smooth, engaging, and high-performance games for desktop and mobile platforms",
    key5: "IoT (Internet of Things) Projects",
    key5_1:
      "I support your digital transformation with IoT projects that connect smart devices and optimize your business processes",
    key6: "Server Setup & Hosting",
    key6_1:
      "I provide powerful, secure, and scalable server solutions. From server setup to management and hosting services, I build your infrastructure from the ground up",
    key7: "Cloud Server Setup",
    key7_1:
      "I enable you to securely manage your data with cloud server setups. I offer flexible and scalable cloud solutions",
    key8: "SQL Server Setup",
    key8_1:
      "I help you store and manage your data more efficiently and securely by optimizing your database management systems",
  },
};

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
      customData: data.customData,

      head: await Framework.render`
			<title>${he.encode(translation[data.customData.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.customData.language].description)}">
									
        	<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/services/" >
		<link rel="alternate" hreflang="en" href="https://kanby.net/English/services/" >
		<link rel="alternate" href="https://kanby.net/English/services/" hreflang="x-default" />

			`,

      content: await Framework.render`
					<div class="cont">
					
					<h1>${translation[data.customData.language].key1}</h1>

					<p>${translation[data.customData.language].key1_1}</p>

					<h2>${translation[data.customData.language].key2}</h2>
					<p>${translation[data.customData.language].key2_1}</p>

					<h2>${translation[data.customData.language].key3}</h2>
					<p>${translation[data.customData.language].key3_1}</p>

					<h2>${translation[data.customData.language].key4}</h2>
					<p>${translation[data.customData.language].key4_1}</p>

					<h2>${translation[data.customData.language].key5}</h2>
					<p>${translation[data.customData.language].key5_1}</p>

					<h2>${translation[data.customData.language].key6}</h2>
					<p>${translation[data.customData.language].key6_1}</p>

					<h2>${translation[data.customData.language].key7}</h2>
					<p>${translation[data.customData.language].key7_1}</p>

					<h2>${translation[data.customData.language].key8}</h2>
					<p>${translation[data.customData.language].key8_1}</p>

					
					



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
