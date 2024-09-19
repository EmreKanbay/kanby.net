require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
const render = async (x, ...values) => {
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

const translation = {
	Turkish: {
		key1: "Sosyal Medya",
		key2: "İçerikler",
		key2_1: "Bloglar",
		key2_2: "Projeler",


	},
	English: {
		key1: "Social Media",
		key2: "Content",
		key2_1: "Blogs",
		key2_2: "Projects",



	
	},
};

module.exports = {
	html: data => render`


    <footer class="K0e6gd-container">
    <div class="K0e6gd-sub-container">
        <div class="K0e6gd-heading">
            <p>${translation[data.language].key1}</p>
            <ul>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/github.svg"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://github.com/EmreKanbay">
                        Github
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/twitter.svg"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://x.com/_EmreKanbay_">
                        Twitter / X
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/linkedin.svg"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/EmreKanbay/">
                        LinkedIn
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/codepen.svg"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://codepen.io/Emre-Kanbay">
                        CodePen
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/tiktok.svg"
                        alt="" />
                    <a
                        target="_blank"
                        href="https://www.tiktok.com/@Emre_Kanbay">
                        Tiktok
                    </a>
                </li>
                <li class="external-link">
                    <img
                        src="${cdn}/assets/Instagram.svg"
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
            <p>${translation[data.language].key2}</p>
            <ul>

                <li>
                    <a
                         href="/${data.language}/blogs">
                        ${translation[data.language].key2_1}
                    </a>
                </li>

                               <li>
                    <a
                         href="/${data.language}/projects">
                        ${translation[data.language].key2_2}
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
	js: data => render``,
};
