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

 
	 

				${async () => {
		

					const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

					const values = [data.language, data.blog_id];
				
					var record = await Index.pool.query(text, values);

					return `
                    
                    
					<div id="blog-container" >
						<div id="blog-container-text">
						<p class="blog-title" >${record.rows[0].title}</p>
						<p class="blog-description">${record.rows[0].description}</p>
						</div>
						<img class="cover-img" src="${record.rows[0].thumbnail_url}" />					
					</div>


					<div class="seperator"></div>
                    

					<div class="markdown-body content">
                 ${record.rows[0].rendered_content}
					</div>
                    
                    `;
				}}
	 
			 
		 
         <style>
         
		 @media only screen and (max-width: 700px) {

		 .content{
		padding: 0 1rem;
		 
		 }

		 .blog-title{
		 
		 font-size: 2rem;
		 font-weight: bold;
		 margin: 0;
		 }

		#blog-container-text{
			 padding: 0 1rem;
		 justify-self:center;
		 display:flex;
		 flex-direction: column;
		 grid-area:b;

		 }


		 .cover-img{
		 width: 50%;
		 justify-self: center;
		 
		 grid-area: a;
		 
		 }


		 #blog-container{
		 
		 display: grid;
		 grid-template-columns: 100%;
		 grid-template-rows: auto auto;
		 grid-template-areas: "a" "b";
		 
		 
		 }


		}


	
 @media only screen and (min-width: 700px){

		 .content{
		padding: 0 1rem;
		 
		 }

		 .blog-title{
		 
		 font-size: 1.7rem;
		 font-weight: bold;
		 margin: 0;
		 }

		#blog-container-text{
			 padding: 0 1rem;
		 justify-self:left;
		 align-self: center;
		 display:flex;
		 flex-direction: column;
		 grid-area:b;

		 }


		 .cover-img{
		 justify-self: center;
		 
		 grid-area: a;
		 
		 }


		 #blog-container{
		 
		 display: grid;
		 grid-template-columns: 1fr 1fr;
		 grid-template-rows: auto;
		 grid-template-areas: "a b";
		 
		 
		 }

		}
 




         .seperator{
		 
		 height:2px;
		 width:100%;
		 background-color:black;
		 margin-bottom:1rem;
		 }

				.title{
				font-size:2rem;
				font-weight:bold;
				}
		
          </style>

      `,
		}),
};
