const Layouts = require("#Layouts");
const Index = require("#Index");
const Framework = require("#Framework");
const he = require("he");

const translation = {
  Turkish: {
    title: "Bloglar - kanby.net",
    description: "kanby.net mevcut bloglar",
    key1: "Bloglar",
    key2: "Blog henüz yok",
  },
  English: {
    title: "Blogs - kanby.net",
    description: "kanby.net all available blogs",
    key1: "Blogs",
    key2: "No blog exist yet",
  },
};

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
      customData: data.customData,

      head: await Framework.render`
			<title>${he.encode(translation[data.customData.language].title)}</title>
			<meta name="description" content="${he.encode(translation[data.customData.language].description)}">
                   
         	<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/blogs/" >
			<link rel="alternate" hreflang="en" href="https://kanby.net/English/blogs/" >
			<link rel="alternate" href="https://kanby.net/English/blogs/" hreflang="x-default" />
			`,

      content: await Framework.render`


            <h1 style="text-align:center">${translation[data.customData.language].key1}</h1>
				<div id="all-blogs-list">

				${async () => {
          const text = `SELECT * FROM blogs WHERE language= $1 and status != 'draft'`;

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
                    alt_text = "kanby.net-developer-designer";
                  }
                  return `

<a rel="ugc" hreflang="${data.customData.langCode}" href="blogs/${t.id}/"   class="all-blogs-item">

        <img alt="${alt_text}"  src="${t.thumbnail_url}" />

        <span>${t.title}</span>
        </a>
    `;
                }),
              )),
            );
          } else {
            return `<p>${translation[data.customData.language].key2}</p>`;
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
