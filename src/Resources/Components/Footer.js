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
		key1:"Sosyal Medya",
		key2:"Bağlantılar",
        key2_1:"Bloglar",
        key2_2:"Haberler",
        key2_3:"İçerikler",
        key2_4:"Medya Galerisi",
        key3:"Hizmetler",
        key3_1:"Özel İnternet Uygulaması",
        key3_2:"IOS Uygulaması",
        key3_3:"Android Uygulaması",
        key3_4:"Masaüstü Uygulaması",
        key4:"Ürünler",
        key4_1:"Restoran Yönetimi",
        key4_2:"İçerik Yönetim Sistemi",
        key4_3:"Kurumsal Kaynak Yönetimi",
        key4_4:"Server Kurulumu",
        key4_5:"Muhasebe Otomasyonu",
        key5:"Ücretsiz Araçlar",
        key5_1:"Tavsiye Yönetim Aracı",
        key5_2:"Not Yönetim Aracı",
        key5_3:"Finans Yönetim Aracı",
        key5_4:"İnsan İlişkileri Yönetim Aracı",
 	},
	English: {
		key1:"Social Media",
		key2:"Links",
        key2_1:"Blogs",
        key2_2:"News",
        key2_3:"Contents",
        key2_4:"Media Gallery",
        key3:"Services",
        key3_1:"Custom Web App",
        key3_2:"IOS App",
        key3_3:"Android App",
        key3_4:"Desktop App",
        key4:"Products",
        key4_1:"Restaurant Management",
        key4_2:"Content Management System",
        key4_3:"Enterprise resource planning",
        key4_4:"Server Setup",
        key4_5:"Accountant Automation",
        key5:"Free Tools",
        key5_1:"Advice Manager",
        key5_2:"Cheat Sheet Manager",
        key5_3:"Finance Manager",
        key5_4:"Personal Relations Manager",
 	}
 	}


module.exports = {
	html: data => construct`


    <footer class="K0e6gd-container">
    <div class="K0e6gd-sub-container">
        <div class="K0e6gd-heading">
            <p>${text[data.language].key1}</p>
            <ul>
                <li>
                    <img
                        src="${cdn}/assets/github.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://github.com/EmreKanbay">
                        Github
                    </a>
                </li>
                <li>
                    <img
                        src="${cdn}/assets/twitter.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://x.com/_EmreKanbay_">
                        Twitter / X
                    </a>
                </li>
                <li>
                    <img
                        src="${cdn}/assets/linkedin.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/EmreKanbay/">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <img
                        src="${cdn}/assets/codepen.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://codepen.io/Emre-Kanbay">
                        CodePen
                    </a>
                </li>
                <li>
                    <img
                        src="${cdn}/assets/tiktok.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://www.tiktok.com/@Emre_Kanbay">
                        Tiktok
                    </a>
                </li>
                <li>
                    <img
                        src="${cdn}/assets/Instagram.svg?${Date.now()}"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://www.instagram.com/_emrekanbay_">
                        Instagram
                    </a>
                </li>
            </ul>
        </div>

        <div class="K0e6gd-heading">
            <p>${text[data.language].key2}</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="/company">
                        ${text[data.language].key2_1}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/team">
                        ${text[data.language].key2_2}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/careers">
                        ${text[data.language].key2_3}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/press">
                        ${text[data.language].key2_4}
                    </a>
                </li>
            </ul>
        </div>


        <div class="K0e6gd-heading">
            <p>${text[data.language].key3}</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="/company">
                        ${text[data.language].key3_1}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/team">
                        ${text[data.language].key3_2}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/careers">
                        ${text[data.language].key3_3}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/press">
                        ${text[data.language].key3_4}
                    </a>
                </li>
            </ul>
        </div>



        <div class="K0e6gd-heading">
            <p>${text[data.language].key4}</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="/company">
                        ${text[data.language].key4_1}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/team">
                        ${text[data.language].key4_2}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/careers">
                        ${text[data.language].key4_3}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/press">
                        ${text[data.language].key4_4}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/press">
                        ${text[data.language].key4_5}
                    </a>
                </li>
            </ul>
        </div>



                <div class="K0e6gd-heading">
            <p>${text[data.language].key5}</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="/company">
                        ${text[data.language].key5_1}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/team">
                        ${text[data.language].key5_2}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/careers">
                        ${text[data.language].key5_3}
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="/press">
                        ${text[data.language].key5_4}
                    </a>
                </li>

            </ul>
        </div>




    </div>
</footer>

	<style>
		.K0e6gd-container {
			width: 100%;
			display: flex;
			height: min-content;
			justify-content: center;
			position: relative;
		}

		.K0e6gd-container::before {
			container-type: inline-size;

			content: "";
			position: absolute;
			width: 100%;
			z-index: -1;
			height: 100%;

			background-image: url("${cdn}/assets/footer_background.svg?${Date.now()}");
			background-repeat: no-repeat;
			transform: rotate(180deg);
			filter: brightness(80%);

			background-size: cover;
			background-position: bottom;
		}

		.K0e6gd-sub-container {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			max-width: max-content;
		}

		.K0e6gd-heading {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: start;
			flex-grow: 1;
			margin: 2rem;
		}

		.K0e6gd-heading > p {
			font-family: "Roboto", sans-serif;
			margin: 0;
			font-size: 1.3rem;
			color: white;
			font-weight: 400;
			font-style: normal;
		}

		.K0e6gd-heading > ul > li > img {
			width: 1.5rem;
		}

		.K0e6gd-heading > ul > li::after {
			content: "";
			width: 1.3rem;
			height: 1.3rem;
			background-image: url("${cdn}/assets/external-link.svg?${Date.now()}");
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			opacity: 0.7;
			filter: invert(1);
		}

		.K0e6gd-heading > ul > li > a {
			color: white;
		}
		.K0e6gd-heading > ul > li {
			display: flex;
			align-items: center;
			padding-left: 0;
			gap: 0.4rem;
			margin: 1rem 0;
			font-size: 1rem;
			font-family: "Roboto", sans-serif;
			font-weight: 400;
			font-style: normal;
		}
	</style>
`,
	js: data => construct``,
};
