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
  html: async (data) =>
    await Layouts.VisitorLayout({
		customData: data.customData,

      head: await Framework.render`

			${async () => {
        const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

        const values = [data.customData.language, data.blog_id];

        var record = await Index.pool.query(text, values);

        return `
				  <!--Stylesheet for markdown-->
					<link rel="stylesheet" href="${cdn}/assets/github-markdown-light.css" />
					<meta name="description" content="${he.encode(record.rows[0].description)}"/>
					<title>${he.encode(record.rows[0].title)}</title>
								
					<link rel="canonical" href="https://kanby.net/${data.customData.language}/blogs/${data.blog_id}/" />
								
        <meta property="og:title" content="${he.encode(record.rows[0].title)}" />
        <meta property="og:description" content="${he.encode(record.rows[0].description)}" />

          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://kanby.net/${data.customData.language}/blogs/${data.blog_id}" />
          <meta property="og:image" content="${he.encode(record.rows[0].thumbnail_url)}" />
          
          
          
       	<link rel="alternate" hreflang="${data.customData.langCode}" href="https://kanby.net/${data.customData.language}/projects/${data.blog_id}/" >
					`;
      }}
 
			


			`,

      content: await Framework.render`

 
	 

				${async () => {
          const text = `SELECT * FROM blogs WHERE language= $1 AND id = $2`;

          const values = [data.customData.language, data.blog_id];

          var record = await Index.pool.query(text, values);

          const text1 = `SELECT profile_picture_url FROM users WHERE public_name = $1`;

          const values1 = [record.rows[0].author];

          var record1 = await Index.pool.query(text1, values1);

          return `
                    
                     
					<div id="blog-container" >

						<aside>
						<p class="blog-title" >${record.rows[0].title}</p>
						<p class="blog-description">${record.rows[0].description}</p>
						<span style="display:flex;height:3rem;align-items:center;gap:1rem"><img  style="border-radius:50%;height:100%" src="${record1.rows[0].profile_picture_url}"><p class="blog-author">${record.rows[0].author}</p></span>
						<p class="blog-author">${translation[data.customData.language].key1} ${new Date(record.rows[0].creation_date * 1).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
						<p class="blog-author">${translation[data.customData.language].key2} ${new Date(record.rows[0].last_modify_date * 1).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
						<img class="cover-img" src="${record.rows[0].thumbnail_url}" />					
						</aside>
		
					<article class="markdown-body">
                 ${record.rows[0].rendered_content}
					</article>
					
		<script src="https://utteranc.es/client.js"
        repo="EmreKanbay/kanby.net"
        issue-term="blog-${data.blog_id}-comments"
        theme="github-light"
        crossorigin="anonymous"
        async>
			</script>


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
		 width: 60%;
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

 		 max-width: 1500px;		 
		 margin: 0 auto;
		 padding:1rem 4rem; 
		 gap:1rem;
		 display: grid;
		 grid-template-columns: 80% 20%;
		 grid-template-rows: auto;
		 grid-template-areas: "a b";
		 
		 
		 }

		}
 
          </style>

      `,
    }),
};
