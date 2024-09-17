const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

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
		key1: "Bloglar",
		key2: "İçerikler",
		key3: "Haberler",
	},
	English: {
		key1: "Blogs",
		key2: "Contents",
		key3: "News",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await construct`
						${ async () => {


				const text = `SELECT * FROM projects WHERE id = $1`;

					const values = [data.id];

				
					var record = await Index.pool.query(text, values);
 
					return `
					<meta charset="utf-8">
					<meta name=”description” content=”${record.rows[0][data.language].description}”/>
					<title>${record.rows[0][data.language].title}</title>
					`
			}}
 			`,

			content: await construct`

 
			 <div class="blog-body">

				${async () => {
		

					const text = `SELECT "${data.language}",id FROM projects WHERE id = ${data.id}`;

					const values = [];
				
					var record = await Index.pool.query(text, values);

                    

					return `
                    
                    <p class="title" >${record.rows[0][data.language].title}</p>
                    <p>${record.rows[0][data.language].description}</p>

					<div class="seperator"></div>
                    <img class="cover-img" src="${record.rows[0][data.language].thumbnail_url}" />

					<div class="markdown-body">
                 ${record.rows[0][data.language].markdown_rendered}
					</div>
                    
                    `;
				}}
				
		 </div>
			 
		 
         <style>
         
         .seperator{
		 
		 height:2px;
		 width:100%;
		 background-color:black;
		 margin-bottom:1rem;
		 }
         .blog-body{
         
         display:flex;
		 width:100%;
           flex-direction:column;
          align-items:center;
 
         }
				.title{
				font-size:2rem;
				font-weight:bold;
				}
		
		 .cover-img{width:80%;max-width:900px}
         </style>

      `,
		}),
};
