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


const text = {
	Turkish: {
		key1:"Bloglar",
		key2:"İçerikler",
		key3:"Haberler",
	},
	English: {
		key1:"Blogs",
		key2:"Contents",
		key3:"News",
	}
 	}


module.exports = {
	html: async (data) =>
		await Layouts.VisitorLayout({

			language: data.language,
			head: await construct`
 
			<title>Kanby</title>
			`,

			content: await construct`



			 <div class="blog-body">

				${async ()=> {

		var record = await Index.pool.query(`SELECT * FROM blogs WHERE language='${data.language}' AND id = '${data.blog_id}' `);


					return `
                    
                    <p >${record.rows[0].title}</p>
                    <p>${record.rows[0].description}</p>
                    <img src="${record.rows[0].thumbnail_url}" />
                ${record.rows[0].rendered_content}
                    
                    `


				}}
				
		 </div>
			 
         <style>
         
         
         .blog-body{
         
         display:flex;
         margin:auto;
         flex-direction:column;
         align-items:flex-start;
         width:max-content;

         }
         </style>

      `,
		})
};
