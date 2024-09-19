const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

const Framework = require("#Framework");

const translation = {
	Turkish: {
		title: "Aktif Projeler - kanby.net",
		description: "Her bir projemiz, kullanıcılarımızın geri bildirimleri doğrultusunda şekillenir ve gelişir. Biz, yenilikçi bir yaklaşım benimseyerek, sürdürülebilir çözümler üretmeye devam edeceğiz",
		key1: "Projeler",
		key2: "Proje henüz yok",
	},
	English: {
		title: "Active Projects - kanby.net",
		description: "Each of our projects is shaped and developed based on the feedback from our users. We continue to adopt an innovative approach and produce sustainable solutions",
		key1: "Projects",
		key2: "No Project exist yet",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await Framework.render`
 
			<title>Kanby | ${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}">
            <link rel="canonical" href="https://kanby.net/${data.language}/projects/">
	        <meta name="robots" content="index,follow">

			`,

			content: await Framework.render`


            <h1 style="text-align:center">${translation[data.language].key1}</h1>
				<div id="all-blogs-list">

				${async () => {
					const text = `SELECT "${data.language}",id FROM projects`;

					const values = [];

					var record = await Index.pool.query(text, values);

					if (record.rowCount != 0) {
						return "".concat(
							...record.rows.map(t => {
								return `

<div onclick="window.location.href = './${t.id}'"  class="all-blogs-item">

        <img  src="${t[data.language].thumbnail_url}" />

        <span>${t[data.language].title}</span>
        </div>
    `;
							}),
						);
					} else {
						return `<p>${translation[data.language].key2}</p>`;
					}
				}}
				
				</div>

				<style>

				.all-blogs-item{
				cursor:pointer;
				display:grid;
				min-width:200px;
				max-width:300px;
				grid-template-columns: 100%;
				grid-template-rows: 5fr 1fr;
				border:1px solid black;
				overflow: hidden;
				border-radius: .7rem;

				}

				.all-blogs-item img{
				
				width:100%
				}

				.all-blogs-item{
				display:grid;
				place-items:center;
				
				}
				
				#all-blogs-list{
				
				width:100%;
				display:flex;
				flex-wrap:wrap;
                padding: .5rem 2rem;
				gap:1rem;
				
				
				}
				
				</style>

 			
			 

      `,
		}),
};
