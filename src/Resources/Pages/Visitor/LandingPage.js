const Layouts = require("#Layouts");
const Framework = require("#Framework");
const Components = require("#Components");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const translation = {
  Turkish: {
    title: "kanby.net - blogları ve projeler",
    description:
      "yazılım ve tasarım ile ilgili olan içeriklerimi paylaştığım bu site açık kaynak kodludur, github sayfamdan bu sitenin kaynak koduna ulaşabilirsiniz",
    key1: "Ben Emre,",
    key2: "Yıldız Teknik Üniversitesinde Kimya Mühendisliği öğrencisiyim, Boş zamanlarımda proje geliştirmeyi seviyorum, bu siteyi projelerimi ve bloglarımın paylaşmak için yazdım",
    key3: "En Yeni Bloglar",
    key4: "Blog Bulunamadı",
    key5: "projeler",

    key7: "Projeler",
    key8: "Proje bulunamadı",
  },
  English: {
    title: "kanby.net - blogs and projects",
    description:"This site, where I share my content related to software and design, is open source. You can access the source code of this site from my GitHub page",
    key1: "I am Emre,",
    key2: "I am a chemical engineering student in Yıldız Technical University, I love to develop apps in my free time, I built this website to share my projects and blogs",
    key3: "New Blogs",
    key4: "No Blog found",
    key5: "Projects",

    key7: "Projects",
    key8: "No projects found",
  },
};

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
      customData: data.customData,
      head: await Framework.render`

			<title>${he.encode(translation[data.customData.language].title)}</title>
			

      <meta name="description" content="${he.encode(translation[data.customData.language].description)}"/>
      
  		<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/" >
			<link rel="alternate" hreflang="en" href="https://kanby.net/English/" >
			<link rel="alternate" href="https://kanby.net/English/" hreflang="x-default" />

			
   <meta property="og:title" content="${he.encode(translation[data.customData.language].title)}" />
<meta property="og:description" content="${he.encode(translation[data.customData.language].description)}" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://kanby.net/${data.customData.language}/" />
          <meta property="og:image" content="${cdn}/assets/logo-128.png" />



          
			`,

      content: await Framework.render`

			${await Components.visitor.Marquee.html({ text: '<img style="height:30px" alt="kanby.net-rss-icon" alt="rss-kanby.net" src="https://cdn.kanby.net/assets/rss-icon.png">RSS Available<img alt="rss-kanby.net" style="height:30px" src="https://cdn.kanby.net/assets/rss-icon.png">', time: 20 })}
				<main id="page-container">
					

					<div class="profile-container">
						<figure class="image-profile">
							<img
								src="${cdn}/assets/EmreKanbay.jpeg"
								alt="Emre-Kanbay-kanby.net-software-engineer"/>
							<figcaption>Emre Kanbay</figcaption>
						</figure>

						<div>
							<p class="profile-heading">${translation[data.customData.language].key1}</p>
							<p class="profile-description">${translation[data.customData.language].key2}</p>
						</div>
					</div>


					<div>
						<p style="margin-left:2rem;font-size:2rem"><a hreflang="${data.customData.langCode}" href="blogs/">${translation[data.customData.language].key3}</a></p>

						<div class="all-blogs-list">
							${async () => {
                const text = `SELECT * FROM blogs WHERE language= $1 and status != 'draft' LIMIT 3`;

                const values = [data.customData.language];

                var record = await Index.pool.query(text, values);

                if (record.rowCount != 0) {
                  return "".concat(
                    ...(await Promise.all(
                      record.rows.map(async (t) => {
                        try {
							
                          const text1 = `SELECT "alt_text" FROM media where full_url = $1 `;
                          const values1 = [t.thumbnail_url.trim()];
						  
                          var record1 = await Index.pool.query(text1, values1);
						  if(record1.rowCount == 0){

							alt_text = "placeholder-image"

						  }else{
							  alt_text = record1.rows[0].alt_text;
						  }
                        } catch (e) {
                          alt_text = "kanby.net-open-source-developer";
                        }

                        return `

<a rel="ugc" hreflang="${data.customData.langCode}" href="blogs/${t.id}/"  class="all-blogs-item">

        <img alt="${alt_text}"  src="${t.thumbnail_url}" />

        <span>${t.title}</span>
        </a>
    `;
                      }),
                    )),
                  );
                } else {
                  return `<p>${translation[data.customData.language].key4}</p>`;
                }
              }}
						</div>
					</div>

					<p style="margin-left:2rem;font-size:2rem"><a hreflang="${data.customData.langCode}" href="projects/">${translation[data.customData.language].key5}</a></p>

					<div class="all-blogs-list">

					${async () => {
            const text = `SELECT "${data.customData.language}",id FROM projects LIMIT 3`;
            const values = [];
            var record = await Index.pool.query(text, values);

            if (record.rowCount != 0) {
              return "".concat(
                ...(await Promise.all(
                  record.rows.map(async (t) => {
                    var alt_text = "";
                    try {
                      const text1 = `SELECT "alt_text" FROM media where full_url = $1 `;
                      const values1 = [t[data.customData.language].thumbnail_url.trim()];
                      var record1 = await Index.pool.query(text1, values1);

					  if(record1.rowCount == 0){

						alt_text = "placeholder-image"

					  }else{
						  alt_text = record1.rows[0].alt_text;
					  }
                    } catch (e) {
                      alt_text = "kanby.net-app-developer";
                    }

                    return `
					<a rel="ugc" hreflang="${data.customData.langCode}" href="projects/${t.id}/"  class="all-blogs-item">
						<div class="icon">
							<img alt="${alt_text}" src="${t[data.customData.language].thumbnail_url}" />
						</div>
						<span>${t[data.customData.language].title}</span>
					</a>
`;
                  }),
                )),
              );
            } else {
              return `<p>${translation[data.customData.language].key8}</p>`;
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
