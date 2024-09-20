const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");
require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
const Framework = require("#Framework");

const translation = {
	Turkish: {
		key1: "Oluşturulma Tarihi: ",
		key2: "Son Güncellenme Tarihi: ",
	},
	English: {
		key1: "Creation Date: ",
		key2: "Last Modify Date",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await Framework.render`

			${async () => {
				const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

				const values = [data.language, data.blog_id];

				var record = await Index.pool.query(text, values);

				return `
				  <!--Stylesheet for markdown-->
					<link rel="stylesheet" href="${cdn}/assets/github-markdown-light.css" />
					<meta name="description" content="${he.encode(record.rows[0].description)}"/>
					<title>${he.encode(record.rows[0].title)}</title>
					<link rel="canonical" href="https://kanby.net/${data.language}/blogs/${record.rows[0].id}">
	    		    <meta name="robots" content="index,follow">
					`;
			}}
 
			


			`,

			content: await Framework.render`

 
	 

				${async () => {
					const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

					const values = [data.language, data.blog_id];

					var record = await Index.pool.query(text, values);

					return `
                    
                     
					<div id="blog-container" >

						<aside>
						<img class="cover-img" src="${record.rows[0].thumbnail_url}" />					
						<p class="blog-title" >${record.rows[0].title}</p>
						<p class="blog-description">${record.rows[0].description}</p>
 						<span style="display:flex;height:3rem;align-items:center;gap:1rem"><img  style="border-radius:50%;height:100%" src="https://avatars.githubusercontent.com/u/80778171?v=4"><p class="blog-author">${record.rows[0].author}</p></span>
 						<p class="blog-author">${translation[data.language].key1} ${new Date(record.rows[0].creation_date * 1).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
 						<p class="blog-author">${translation[data.language].key2} ${new Date(record.rows[0].last_modify_date * 1).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>


						</aside>
		
					<div class="markdown-body">
                 ${record.rows[0].rendered_content}
					</div>


								</div>
                    
                    `;
				}}
	 
			 
		 
         <style>

 

		 .blog-title{
		 
		 font-size: 2rem;
		 font-weight: bold;
		 margin: 0;
		 }
         
		 @media only screen and (max-width: 900px) {

		aside{
			 padding: 0 1rem;
 		 display:flex;
		 flex-direction: column;
 
		 }

		 .cover-img{
		 margin:auto;
		 width: 50%;
		 justify-self: center;
		 border-radius: 1rem;
		 
 		 
		 }


		 #blog-container{
		 padding:.7rem;
		 gap:1rem;
		 
		 display: grid;
		 grid-template-columns: 100%;
		 grid-template-rows: auto auto;
 		 
		 
		 }


		}


	
 @media only screen and (min-width: 900px){

 
		aside{
			 padding: 0 1rem;
		 justify-self:left;
 		 display:flex;
		 flex-direction: column;
		 height:min-content;
		 grid-area:b;
		  border-left: 1px solid hsl(0, 0%, 70%);


		 }


		 .cover-img{
		 width:80%;
		 justify-self: center;
		 border-radius: 1rem;
			 
		 }


		 #blog-container{

		 margin:0 auto;
		 max-width: 1200px;		 
		 padding:1rem;
		 gap:1rem;
		 display: grid;
		 grid-template-columns: 3fr 1fr;
		 grid-template-rows: auto;
		 grid-template-areas: "a b";
		 
		 
		 }

		}
 
          </style>

      `,
		}),
};
