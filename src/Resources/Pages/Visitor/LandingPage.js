const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

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
		key1: "Düşünce, Tasarım, Yazılım",
		key2: "Talep üzerine uygulamalar geliştiriyorum. Bu uygulamalar web uygulamaları, iOS ve Android uygulamaları, masaüstü ve mobil için oyunlar, IoT projeleri, sunucu kurulumu, hosting, bulut sunucu kurulumu ve SQL sunucu kurulumu içeriyor",
		key3: "En Yeni Bloglar",
		key4: "Blog Bulunamadı",
		key5: "Açık kaynak projeler",
		key6: "Yönetici",
	},
	English: {
		key1: "Think, Design, Code",
		key2: "I develop apps from on demand. These apps contains web apps, IOS and Android apps, Games for desktop and mobile, Iot projects, Server setup, hosting, cloud server setup, SQL server setup",
		key3: "New Blogs",
		key4: "No Blog found",
		key5: "Open Source Projects",
		key6: "Supervisor",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await construct`
 
			<title>Kanby</title>
			`,

			content: await construct`
				<main id="page-container">
					<div class="profile-container">
						<figure class="image-profile">
							<img
								src="${cdn}/assets/EmreKanbay.jpeg"
								alt="Trulli"
								style="width:100%" />
							<figcaption>Emre Kanbay | ${text[data.language].key6}</figcaption>
						</figure>

						<div>
							<p class="profile-heading">${text[data.language].key1}</p>
							<p class="profile-description">${text[data.language].key2}</p>
						</div>
					</div>

					<h1>What I Do?</h1>

					<ul>
						<li>Turnkey projects (ready for production)</li>
						<li>Web Apps with Admin management page with log in just like this one</li>
						<li>High Level Web Apps Like instagram, Facebook, amazon, twitch and so on</li>
						<li>Mobile & Desktop Application</li>
						<li>Testing for existing apps</li>
						<li>API Development</li>
						<li>Physical Server Setup</li>
						<li>Cloud Server Setup</li>
						<li>Saas Video Edits</li>
						<li>Music For Product Videos</li>
						<li>Logo Design For Branding</li>
						<li>Game Development</li>
					</ul>

					<div>
						<p style="margin-left:2rem;font-size:2rem"><a href="./blogs">${text[data.language].key3}</a></p>

						<div class="all-blogs-list">
							${async () => {
								var record = await Index.pool.query(`SELECT * FROM blogs WHERE language='${data.language}' LIMIT 3`);

								if (record.rowCount != 0) {
									return "".concat(
										...record.rows.map(t => {
											return `

<div onclick="window.location.href = './${t.id}'" data-title="${he.encode(t.title)}" data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}" data-raw-content="${he.encode(t.raw_content)}"  class="all-blogs-item">

        <img  src="${t.thumbnail_url}" />

        <span>${t.title}</span>
        </div>
    `;
										}),
									);
								} else {
									return `<p>${text[data.language].key4}</p>`;
								}
							}}
						</div>
					</div>

					<p style="margin-left:2rem;font-size:2rem">${text[data.language].key5}</p>

					<div class="all-blogs-list">
						<div class="all-blogs-item ">
							<div class="icon">
								<img src="${cdn}/assets/advice.svg" />
							</div>

							<span>Advice Manager</span>
						</div>

						<div class="all-blogs-item">
							<div class="icon">
								<img
									style="width: 40%;"
									src="${cdn}/assets/CheatSheet.svg" />
							</div>

							<span>Cheat Sheet Manager</span>
						</div>

						<div class="all-blogs-item">
							<div class="icon">
								<img src="${cdn}/assets/middleeast-map.svg" />
							</div>

							<span>Survive in Middle East</span>
						</div>

						<div class="all-blogs-item">
							<div class="icon">
								<img src="${cdn}/assets/external-link-icon.svg" />
							</div>

							<span>Link Optimiser</span>
						</div>
					</div>
				</main>

				<style>
					.all-blogs-item:has(.icon) {
						height: 200px;
					}

					.all-blogs-item:has(.icon) .icon img {
						width: 60%;
					}
					.icon {
						display: grid;
						place-items: center;

						padding: 1rem;
						width: 100%;
						height: 100%;
					}

					.all-blogs-item {
						cursor: pointer;
						display: grid;
						min-width: 200px;
						max-width: 240px;
						grid-template-columns: 100%;
						grid-template-rows: 5fr 1fr;
						border: 1px solid black;
						overflow: hidden;
						border-radius: 0.7rem;
					}

					.all-blogs-item img {
						width: 100%;
					}

					.all-blogs-item {
						display: grid;
						place-items: center;
					}

					.all-blogs-list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin: 0.5rem 2rem;
						gap: 1rem;
					}
					#page-container {
						margin: auto;
						width: 80%;
						max-width: 900px;
					}

					.profile-container {
						display: flex;

						justify-content: space-between;
					}
					.profile-container figure figcaption {
						white-space: nowrap;
					}

					.profile-container figure {
						flex-grow: 1;
					}
					.profile-container figure img {
						border-radius: 1rem 1rem 1rem 0rem;
					}

					.profile-heading {
						font-size: 2rem;
						white-space: nowrap;
						font-weight: bold;
					}
				</style>
			`,
		}),
};
