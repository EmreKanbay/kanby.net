const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

const Framework = require("#Framework");

const translation = {
	Turkish: {
		title: "Bloglar - Freelance Tasarımcı ve Yazılımcı - kanby.net",
		description: "Ben arayüz tasarlayan ve kod yazan bir yazılımcıyım",

		key1: "Bloglar",
		key2: "Blog henüz yok",
	},
	English: {
		title: "Freelance Designer and Programmer - kanby.net",
		description: "I am a software engineer who writes code and designs interfaces",

		key1: "Blogs",
		key2: "No blog exist yet",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await Framework.render`

			<title>${he.encode(translation[data.language].title)}</title>
            <meta name="description" content="${he.encode(translation[data.language].description)}"/>
            <link rel="canonical" href="https://kanby.net/${data.language}/blogs/">
	        <meta name="robots" content="index,follow">

			`,

			content: await Framework.render`


            <h1 style="text-align:center">${translation[data.language].key1}</h1>
				<div id="all-blogs-list">

				${async () => {
					const text = `SELECT * FROM blogs WHERE language= $1`;

					const values = [data.language];

					var record = await Index.pool.query(text, values);

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
