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

 

				${async () => {
		

					const text = `SELECT "${data.language}",id FROM projects WHERE id = ${data.id}`;

					const values = [];
				
					var record = await Index.pool.query(text, values);

                    

					return await construct`
                    
			 <div class="blog-container">
        
											<aside>
  				 
								<img class="cover-img" src="${record.rows[0][data.language].thumbnail_url}" />
           			 <p class="blog-title" >${record.rows[0][data.language].title}</p>
                    <p class="blog-description">${record.rows[0][data.language].description}</p>

                    ${async () => {

 						return "".concat(...Object.keys(JSON.parse(record.rows[0][data.language].links)).map( yy => {
							
							return `<p>${yy} -> ${JSON.parse(record.rows[0][data.language].links)[yy]}</p>`
							}))
						
						
						}}


						</aside>


					<div class="markdown-body">
                 ${record.rows[0][data.language].markdown_rendered}
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
         
		 @media only screen and (max-width: 800px) {

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


		 .blog-container{
		 padding:.7rem;
		 gap:1rem;
		 
		 display: grid;
		 grid-template-columns: 100%;
		 grid-template-rows: auto auto;
 		 
		 
		 }


		}


	
 @media only screen and (min-width: 800px){

 
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


		 .blog-container{

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
