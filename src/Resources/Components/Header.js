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

const translation = {
	Turkish: {
		key1: "Ücretsiz Araçlar",
		key1_1: "Tavsiye Yönetim Aracı",
		key1_2: "Not Yönetim Aracı",
		key1_3: "Finans Yönetim Aracı",
		key1_4: "İnsan İlişkileri Yönetim Aracı",
		key2: "Sosyal Medya",
		key2_1: "Github",
		key2_2: "Twitter / X",
		key2_3: "Linkedin",
		key2_4: "Codepen",
		key2_5: "Tiktok",
		key2_6: "Instagram",
		key3: "Bağlantılar",
		key3_1: "Bloglar",
		key3_2: "Haberler",
		key3_3: "İçerikler",
		key3_4: "Medya Galerisi",
	},
	English: {
		key1: "Free Tools",
		key1_1: "Advice Manager",
		key1_2: "Cheat Sheet Manager",
		key1_3: "Finance Manager",
		key1_4: "Personal Relations Manager",
		key2: "Social Media",
		key2_1: "Github",
		key2_2: "Twitter / X",
		key2_3: "Linkedin",
		key2_4: "Codepen",
		key2_5: "Tiktok",
		key2_6: "Instagram",
		key3: "Links",
		key3_1: "Blogs",
		key3_2: "News",
		key3_3: "Contents",
		key3_4: "Media Gallery",
	},
};

module.exports = {
	html: data => construct`
	
	<header class="liwlCh-header-container">
    <input
        class="liwlCh-header-menu-toggle"
        type="checkbox"
        name=""
        id="" />

        <nav class="liwlCh-header-menu-navigation">


            <div class="liwlCh-header-menu-navigation-heading">
                <a href="">${translation[data.language].key1}</a>
                <ul>
                    <li><a href="">${translation[data.language].key1_1}</a></li>
                    <li><a href="">${translation[data.language].key1_2}</a></li>
                    <li><a href="">${translation[data.language].key1_3}</a></li>
                    <li><a href="">${translation[data.language].key1_4}</a></li>
                </ul>
            </div>


            <div class="liwlCh-header-menu-navigation-heading">
                <a href="">${translation[data.language].key2}</a>
                <ul>
                    <li><a href="">${translation[data.language].key2_1}</a></li>
                    <li><a href="">${translation[data.language].key2_2}</a></li>
                    <li><a href="">${translation[data.language].key2_3}</a></li>
                    <li><a href="">${translation[data.language].key2_4}</a></li>
                    <li><a href="">${translation[data.language].key2_5}</a></li>
                    <li><a href="">${translation[data.language].key2_6}</a></li>
                </ul>
            </div>


			            <div class="liwlCh-header-menu-navigation-heading">
                <a href="">${translation[data.language].key3}</a>
                <ul>
                    <li><a href="">${translation[data.language].key3_1}</a></li>
                    <li><a href="">${translation[data.language].key3_2}</a></li>
                    <li><a href="">${translation[data.language].key3_3}</a></li>
                    <li><a href="">${translation[data.language].key3_4}</a></li>
                </ul>
            </div>
            
            
       
    
        
    </nav>

    <a
        class="liwlCh-header-menu-logo"
        href="${"https://kanby.net/" + data.language + "/"}"></a>

    <div
        tabindex="0"
        class="liwlCh-header-menu-search">
        <div class="liwlCh-header-menu-search-top-bar">
            <form class="liwlCh-header-menu-search-top-bar-form">
                <span>
                    <input
                        type="text"
                        placeholder="I am looking for..." />
                    <input
                        type="submit"
                        value="" />
                </span>
                <input
                    onclick="cancelSearchTab(this)"
                    type="button"
                    value="" />
                <cite>Not Available</cite>
            </form>
        </div>
    </div>
</header>



	<script>
		const cancelSearchTab = e => {
			e.blur();
		};

		document.querySelector(".liwlCh-header-menu-search-top-bar-form").addEventListener("submit", e => {
			e.preventDefault();
			alert("Search Not Available Yet");
		});
	</script>

	<style>
		@media only screen and (min-width: 0) {

			.liwlCh-header-menu-navigation{
			overscroll-behavior: none;
			z-index:123
			}
			.liwlCh-header-container {
				display: grid;
				--header-height: 3rem;
				grid-template-rows: var(--header-height);
				border-bottom: 1px solid rgb(33, 33, 33, 0.4);
				gap: 1rem;
				z-index: 99;
			}

			.liwlCh-header-menu-toggle {
				all: unset;
				top: 50%;
				transform: translateY(-50%);
				position: relative;
				transform: translateY(-50%);
				height: 60%;
				cursor: pointer;
				padding: 0.3rem;
				background-image: url("${cdn}/assets/menu-icon.svg?${Date.now()}");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
			}

			.liwlCh-header-menu-toggle:checked {
				background-image: url("${cdn}/assets/cancel.svg?${Date.now()}");
			}

			.liwlCh-header-menu-logo {
				grid-row: 1 / 2;
				height: 100%;
				margin-left: 0.5rem;
				background-image: url("${cdn}/assets/logo.svg?${Date.now()}");
				background-size: contain;
				background-repeat: no-repeat;
			}

			.liwlCh-header-menu-search {
				margin: auto 0;
				cursor: pointer;
				height: 80%;
				margin-right: 0.3rem;
				grid-column: 3 / 4;
				grid-row: 1 / 2;
				background-image: url("${cdn}/assets/search-icon.svg?${Date.now()}");
				background-size: contain;
				background-repeat: no-repeat;
				background-position: right;
			}

			.liwlCh-header-menu-search-top-bar {
				position: absolute;
				cursor: default;

				width: 100%;
				left: 0;
				bottom: 100%;
				height: 100%;
				border-bottom: 1px solid rgb(33, 33, 33, 0.4);
				background-color: rgb(255, 255, 255, 0.9);
			}
			.liwlCh-header-menu-search:focus-within div {
				transform: translateY(100%);
				display: flex;
				justify-content: space-around;
			}

			.liwlCh-header-menu-search-top-bar-form {
				height: min-content;

				padding-top: 1rem;
				display: grid;
				grid-template-columns: 5fr 1fr;
				grid-template-rows: 1fr 1fr;
				gap: 1rem;
			}
			.liwlCh-header-menu-search-top-bar-form input[type="text"] {
				padding: 1rem;
				border-top-left-radius: 1rem;
				border-bottom-left-radius: 1rem;
				border: 1px solid rgb(33, 33, 33, 0.4);
			}
			.liwlCh-header-menu-search-top-bar-form > span {
				grid-area: 1 / 1 / span 1 / span 1;
				display: flex;
			}

			.liwlCh-header-menu-search-top-bar-form input[type="button"] {
				padding: 1rem;

				border: 1px solid rgb(33, 33, 33, 0.4);
				cursor: pointer;

				grid-area: 1 / 2 / span 1 / span 1;

				border-radius: 1rem;
				background-image: url("${cdn}/assets/cancel.svg?${Date.now()}");
				background-position: center;
				background-repeat: no-repeat;

				background-size: 60%;
			}
			.liwlCh-header-menu-search-top-bar-form input[type="submit"] {
				padding: 1rem;

				border: 1px solid rgb(33, 33, 33, 0.4);
				cursor: pointer;

				border-top-right-radius: 1rem;
				border-bottom-right-radius: 1rem;

				background-image: url("${cdn}/assets/search-icon.svg?${Date.now()}");
				background-position: center;
				background-size: 60%;
				background-repeat: no-repeat;
			}
			.liwlCh-header-menu-search-top-bar-form cite {
				text-align: center;
				grid-area: 2 / 1 / span 1 / span 2;
			}
		}

		/* @For Mobile Devices */
		@media only screen and (max-width: 480px) {
			.liwlCh-header-menu-toggle:checked + .liwlCh-header-menu-navigation {
				transform: translateX(100%);
			}
			.liwlCh-header-container {
				grid-template-columns: 1fr 3fr 1fr;
			}

			.liwlCh-header-menu-navigation {
				

 				overflow-y: scroll;
				position: absolute;
				box-sizing: border-box;
				top: calc(var(--header-height) + 1px);
				right: 100%;
				width: 100%;
				height: calc(100vh - var(--header-height) - 1px);
				background-color: white;
				transition: transform 0.2s linear;
			}

			.liwlCh-header-menu-navigation-heading {
				padding-top: 1rem;
				padding-bottom: 1rem;
				font-family: "Roboto", sans-serif;
				font-weight: 400;
				font-style: normal;
				margin: 0;
			}
			.liwlCh-header-menu-navigation-heading > a {
				margin-left: 1rem;
				position: relative;
				display: flex;
				align-items: center;
				font-size: 2rem;
				width: max-content;
				margin-bottom: 0;
				text-decoration: none;
			}

			.liwlCh-header-menu-navigation-heading > a::after {
				opacity: 0.6;
				content: "";
				background-image: url("${cdn}/assets/external-link.svg?${Date.now()}");
				background-size: 80%;
				background-repeat: no-repeat;
				background-position: center;
				width: 2rem;
				left: 100%;
				height: 2rem;

				position: absolute;
			}

			.liwlCh-header-menu-navigation-heading ul {
				margin: 0;
			}
			.liwlCh-header-menu-navigation-heading li {
				position: relative;
				display: flex;
				align-items: center;
				padding: 0.5rem;
				margin: 0;
				width: max-content;
			}

			.liwlCh-header-menu-navigation-heading li::after {
				content: "";
				opacity: 0.6;

				background-image: url("${cdn}/assets/internal-link.svg?${Date.now()}");
				background-size: 80%;
				background-repeat: no-repeat;
				background-position: center;
				right: 100%;
				width: 2rem;
				height: 2rem;

				position: absolute;
			}

			.liwlCh-header-menu-navigation-heading > ul > li > a {
				color: black;
			}

			.liwlCh-header-menu-toggle {
				grid-column: 1 / 2;
				grid-row: 1 / 2;
			}

			.liwlCh-header-menu-logo {
				grid-column: 2 / 3;
				background-position: center;
			}
		}

		/* @For Tablets */
		@media only screen and (max-width: 1024px) and (min-width: 481px) {
			.liwlCh-header-menu-toggle:checked + .liwlCh-header-menu-navigation {
				transform: translateX(100%);
			}

			.liwlCh-header-container {
				grid-template-columns: 8fr 1fr 1fr;
			}

			.liwlCh-header-menu-toggle {
				grid-column: 3 / 4;
				grid-row: 1 / 2;
			}

			.liwlCh-header-menu-navigation {
				overflow-y: scroll;
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: left;
				box-sizing: border-box;
				top: calc(var(--header-height) + 1px);
				right: 100%;
				width: 100%;
				height: calc(100vh - var(--header-height) - 1px);
				background-color: white;
				transition: transform 0.2s linear;
			}

			.liwlCh-header-menu-navigation-heading {
				padding-top: 1rem;
				padding-bottom: 1rem;
				font-family: "Roboto", sans-serif;
				font-weight: 400;
				font-style: normal;
				margin: 0;
			}

			.liwlCh-header-menu-navigation-heading > a {
				margin-left: 1rem;
				position: relative;
				display: flex;
				align-items: center;
				font-size: 2rem;
				width: max-content;
				margin-bottom: 0;
				text-decoration: none;
			}

			.liwlCh-header-menu-navigation-heading > a::after {
				opacity: 0.6;
				content: "";
				background-image: url("${cdn}/assets/external-link.svg?${Date.now()}");
				background-size: 80%;
				background-repeat: no-repeat;
				background-position: center;
				width: 2rem;
				left: 100%;
				height: 2rem;
				position: absolute;
			}

			.liwlCh-header-menu-navigation-heading ul {
				margin: 0;
			}
			.liwlCh-header-menu-navigation-heading li {
				position: relative;
				display: flex;
				align-items: center;
				padding: 0.5rem;
				margin: 0;
				width: max-content;
			}

			.liwlCh-header-menu-navigation-heading li::after {
				content: "";
				opacity: 0.6;

				background-image: url("${cdn}/assets/internal-link.svg?${Date.now()}");
				background-size: 80%;
				background-repeat: no-repeat;
				background-position: center;
				right: 100%;
				width: 2rem;
				height: 2rem;

				position: absolute;
			}

			.liwlCh-header-menu-navigation-heading > ul > li > a {
				color: black;
			}

			.liwlCh-header-menu-navigation-heading {
				height: min-content;
			}

			.liwlCh-header-menu-logo {
				grid-column: 1 / 2;
				background-position: left;
				width: 8rem;
			}

			.liwlCh-header-menu-search {
				grid-column: 2 / 3;
			}
		}

		/* @For Desktops */
		@media only screen and (min-width: 1025px) {
			.liwlCh-header-container {
				grid-template-columns: min-content 8fr 1fr;
			}

			.liwlCh-header-menu-toggle {
				display: none;
			}

			.liwlCh-header-menu-logo {
				grid-column: 1 / 2;
				background-position: center;
				width: 9rem;
			}

			.liwlCh-header-menu-navigation {
				display: flex;
				justify-content: start;
				column-gap: 1.7rem;
				grid-column: 2 / 3;
				grid-row: 1 /2;
			}

			.liwlCh-header-menu-navigation-heading {
				display: flex;
				cursor: pointer;
				position: relative;
				align-items: center;
				width: max-content;
				padding: 0 0.5rem;
			}
			.liwlCh-header-menu-navigation-heading > a::before {
				content: "";
				left: 100%;
				position: absolute;
				width: 1.2rem;
				opacity: 0.4;
				height: 1.2rem;
				background-image: url("${cdn}/assets/down-angle.svg?${Date.now()}");
				background-repeat: no-repeat;
				background-size: 100%;
				background-position: center;
				margin-left: 0.3rem;
			}

			.liwlCh-header-menu-navigation-heading > a {
				position: relative;
				font-family: "Roboto", sans-serif;
				font-weight: 400;
				display: flex;
				align-items: center;
				font-style: normal;
				font-size: 1.2rem;
				color: black;
				text-decoration: none;
				width: max-content;
				margin: 0;
			}

			.liwlCh-header-menu-navigation-heading > a::after {
				transform: scaleX(0);
				position: absolute;
				transform-origin: center;
				left: 0;
				top: 100%;
				transition: transform 0.1s linear;
				width: 100%;
				height: 3px;
				background-color: rgb(33, 33, 33, 0.4);
				content: "";
			}

			.liwlCh-header-menu-navigation-heading:hover > a::after {
				transform: scaleX(1);
			}

			.liwlCh-header-menu-navigation-heading:hover > ul {
				opacity: 1;
				pointer-events: all;
				transform: scaleY(1);
			}

			.liwlCh-header-menu-navigation-heading > ul {
				cursor: default;
				background-color: white;
				border-left: 1px solid rgb(33, 33, 33, 0.4);
				border-right: 1px solid rgb(33, 33, 33, 0.4);
				border-bottom: 1px solid rgb(33, 33, 33, 0.4);
				border-bottom-left-radius: 1rem;
				border-bottom-right-radius: 1rem;
				transform: scaleY(0);
				width: max-content;
				transform-origin: top center;
				transition:
					opacity 0.1s linear,
					transform 0.1s linear;

				pointer-events: none;
				position: absolute;

				top: 100%;
				padding: 0 1rem 0.5rem 2rem;
				margin: 0;
			}
			.liwlCh-header-menu-navigation-heading > ul > li {
				font-family: "Roboto", sans-serif;
				font-weight: 400;
				font-size: 1.1rem;
				font-style: normal;
				margin: 0.6rem 1rem 1rem 1rem;
			}

			.liwlCh-header-menu-navigation-heading > ul > li > a {
				color: black;
			}
		}
	</style>
`,
	js: data => construct``,
};
