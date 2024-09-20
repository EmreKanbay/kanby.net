const Layouts = require("#Layouts");
const Framework = require("#Framework");
const Components = require("#Components");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const translation = {
	Turkish: {
		title: "kanby.net - Freelance tasarım ve yazılım",
		description:
			"Burada, yaratıcı tasarım projelerimden ve özelleştirilmiş yazılım çözümlerimden örnekler bulabilirsiniz. Web tasarımı, kullanıcı deneyimi (UX), ve yazılım geliştirme konularında sunduğum hizmetlerle, projelerinize estetik ve işlevsellik katmayı amaçlıyorum",
		key1: "Düşünce, Tasarım, Yazılım",
		key2: "Talep üzerine uygulamalar geliştiriyorum. Bu uygulamalar web uygulamaları, iOS ve Android uygulamaları, masaüstü ve mobil için oyunlar, IoT projeleri, sunucu kurulumu, hosting, bulut sunucu kurulumu ve SQL sunucu kurulumu içeriyor",
		key3: "En Yeni Bloglar",
		key4: "Blog Bulunamadı",
		key5: "Açık kaynak projeler",
 
		key7: "Projeler",
		key8: "Proje bulunamadı",
	},
	English: {
		title: "kanby.net - freelance designer and programmer",
		description:
			"Here, you can find examples of my creative design projects and custom software solutions. With my services in web design, user experience (UX), and software development, I aim to add both aesthetics and functionality to your projects",
		key1: "Think, Design, Code",
		key2: "I develop apps from on demand. These apps contains web apps, IOS and Android apps, Games for desktop and mobile, Iot projects, Server setup, hosting, cloud server setup, SQL server setup",
		key3: "New Blogs",
		key4: "No Blog found",
		key5: "Open Source Projects",
 
		key7: "Projects",
		key8: "No projects found",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
	    langCode:data.langCode,
			language: data.language,
			head: await Framework.render`

			<title>${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}"/>
            <link rel="canonical" href="https://kanby.net/${data.language}/">
	        <meta name="robots" content="index,follow">

			`,

			content: await Framework.render`

			${await Components.visitor.Marquee.html({ text: '<img style="height:30px" src="https://cdn.kanby.net/assets/rss-icon.png">RSS Available<img style="height:30px" src="https://cdn.kanby.net/assets/rss-icon.png">', time: 20 })}
				<main id="page-container">
					<div class="profile-container">
						<figure class="image-profile">
							<img
								src="${cdn}/assets/EmreKanbay.jpeg"
								alt="Emre-Kanbay-kanby.net-software-engineer"/>
							<figcaption>Emre Kanbay</figcaption>
						</figure>

						<div>
							<p class="profile-heading">${translation[data.language].key1}</p>
							<p class="profile-description">${translation[data.language].key2}</p>
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
  					</ul>

					<div>
						<p style="margin-left:2rem;font-size:2rem"><a href="./blogs">${translation[data.language].key3}</a></p>

						<div class="all-blogs-list">
							${async () => {
								const text = `SELECT * FROM blogs WHERE language= $1 LIMIT 3`;

								const values = [data.language];

								var record = await Index.pool.query(text, values);

								if (record.rowCount != 0) {
									return "".concat(...await Promise.all(record.rows.map(async t => {
									
									try{
            		const text1 = `SELECT "alt_text" FROM media where full_url = $1 `;
            		const values1 = [t.thumbnail_url.trim()];
             		var record1 = await Index.pool.query(text1, values1);
            		alt_text = record1.rows[0].alt_text
            }
            catch(e){
              alt_text = "kanby.net-freelance-developer-designer"
            }
            
										return `

<a rel="ugc" href="/${data.language}/blogs/${t.id}/"  class="all-blogs-item">

        <img alt="${alt_text}"  src="${t.thumbnail_url}" />

        <span>${t.title}</span>
        </a>
    `;
									})));
								} else {
									return `<p>${translation[data.language].key4}</p>`;
								}
							}}
						</div>
					</div>

					<p style="margin-left:2rem;font-size:2rem"><a href="/${data.language}/projects">${translation[data.language].key5}</a></p>

					<div class="all-blogs-list">

					${async () => {
						const text = `SELECT "${data.language}",id FROM projects LIMIT 3`;
						const values = [];
						var record = await Index.pool.query(text, values);
						
						if (record.rowCount != 0) {
							return "".concat(...await Promise.all(record.rows.map(async t => {
                var alt_text = ""
            try{
            		const text1 = `SELECT "alt_text" FROM media where full_url = $1 `;
            		const values1 = [t[data.language].thumbnail_url.trim()];
             		var record1 = await Index.pool.query(text1, values1);
            		alt_text = record1.rows[0].alt_text
            }
            catch(e){
              alt_text = "kanby.net-freelance-developer-designer"
            }
							
 									return `
					<a rel="ugc" href="/${data.language}/projects/${t.id}/"  class="all-blogs-item">
						<div class="icon">
							<img alt="${alt_text}" src="${t[data.language].thumbnail_url}" />
						</div>
						<span>${t[data.language].title}</span>
					</a>
`;
							}))
							);
						} else {
							return `<p>${translation[data.language].key8}</p>`;
						}
					}}


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
						display: grid;
						grid-template-columns: 1fr 1fr;
						grid-template-rows: auto auto;
						justify-content:center;
						grid-template-areas: "a b" "a b";

 					}

					@media only screen and (max-width: 600px){

					.profile-container {
					grid-template-areas: "a a" "b b"

					}
					}
					.profile-container >  div {
					grid-area: b;
					margin: 1rem;
					
					}

					.profile-container figure  {
					margin: 1rem;
					grid-area: a;
					}

					.profile-container figure img {
					width: 100%;
						border-radius: 1rem 1rem 1rem 0rem;
					}

					.profile-heading {
						font-size: 2rem;
						margin:0;
 						font-weight: bold;
					}
				</style>
			`,
		}),
};
