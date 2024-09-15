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
 
			<title>Kanby</title>
			`,

			content: await construct`

 
			 <div class="blog-body">

				${async () => {
		

					const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

					const values = [data.language, data.blog_id];
				
					var record = await Index.pool.query(text, values);

					return `
                    
                    <p class="title" >${record.rows[0].title}</p>
                    <p>${record.rows[0].description}</p>

					<div class="seperator"></div>
                    <img class="cover-img" src="${record.rows[0].thumbnail_url}" />

					<div class="content">
                 ${record.rows[0].rendered_content}
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
