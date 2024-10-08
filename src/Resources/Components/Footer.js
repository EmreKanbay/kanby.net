require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
const Framework = require("#Framework");

const translation = {
  Turkish: {
    key1: "Sosyal Medya",
    key2: "İçerikler",
    key2_1: "Bloglar",
    key2_2: "Projeler",
    key3: "Bağlatılar",
    key3_1: "İletişim",
    key3_2: "Hakkında",
    key3_3: "Hizmetler",
  },
  English: {
    key1: "Social Media",
    key2: "Content",
    key2_1: "Blogs",
    key2_2: "Projects",
    key3: "Links",
    key3_1: "Contact",
    key3_2: "About",
    key3_3: "Services",
  },
};

module.exports = {
  html: (data) => Framework.render`


    <footer class="K0e6gd-container">
    <div class="K0e6gd-sub-container">
        <div class="K0e6gd-heading">
            <p>${translation[data.customData.language].key1}</p>
            <ul>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/github.svg"
                        alt="" />
                    <a
                    rel="nofollow"
                        target="_blank"
                        href="https://github.com/EmreKanbay">
                        Github
                    </a>
                </li>

                <li class="external-link">
                    <img
                        src="${cdn}/assets/linkedin.svg"
                        alt="" />
                    <a
                    rel="nofollow"
                        target="_blank"
                        href="https://www.linkedin.com/in/EmreKanbay/">
                        LinkedIn
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/instagram.svg"
                        alt="" />
                    <a
                    rel="nofollow"
                        target="_blank"
                        href="https://www.instagram.com/emrekanbay.en/">
                        Instagram
                    </a>
                </li>
            </ul>
        </div>

      



                <div class="K0e6gd-heading">
            <p>${translation[data.customData.language].key2}</p>
            <ul>

                <li>
                    <a
                    hreflang="${data.customData.langCode}"
                         href="blogs/">
                        ${translation[data.customData.language].key2_1}
                    </a>
                </li>

                               <li>
                    <a
                    hreflang="${data.customData.langCode}"
                         href="projects/">
                        ${translation[data.customData.language].key2_2}
                    </a>
                </li>

            </ul>
        </div>


		 <div class="K0e6gd-heading">
            <p>${translation[data.customData.language].key3}</p>
            <ul>

                <li>
                    <a
                    hreflang="${data.customData.langCode}"
                         href="contact/">
                        ${translation[data.customData.language].key3_1}
                    </a>
                </li>

                               <li>
                    <a
                    hreflang="${data.customData.langCode}"
                         href="about/">
                        ${translation[data.customData.language].key3_2}
                    </a>
                </li>

				    </li>

                               <li>
                    <a
                    hreflang="${data.customData.langCode}"
                         href="services/">
                        ${translation[data.customData.language].key3_3}
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

			background-image: url("${cdn}/assets/footer_background.svg");
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

		.K0e6gd-heading > ul > li.external-link::after {
			content: "";
			width: 1.3rem;
			height: 1.3rem;
			background-image: url("${cdn}/assets/external-link.svg");
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
  js: (data) => Framework.render``,
};
