const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
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



<div class="profile-container">

<figure class="image-profile"> 
  <img src="${cdn}/assets/EmreKanbay.jpeg" alt="Trulli" style="width:100%">
  <figcaption>Emre Kanbay</figcaption>
</figure>


<div>
<p class="profile-heading">Think, Design, Code</p>
<p class="profile-description">I develop apps from on demand. These apps contains web apps, IOS and Android apps, Games for desktop and mobile, Iot projects, Server setup, hosting, cloud server setup, SQL server setup</p>
</div>


</div>

			
 <div>
 
 <p style="margin-left:2rem;font-size:2rem">En yeni Bloglar</p>


<div id="all-blogs-list">

				${async ()=> {

		var record = await Index.pool.query(`SELECT * FROM blogs WHERE language='${data.language}' LIMIT 3`);

        if(record.rowCount != 0){
            return "".concat(
                ...record.rows.map(t => {
                    return `

<div onclick="window.location.href = './${t.id}'" data-title="${he.encode(t.title)}" data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}" data-raw-content="${he.encode(t.raw_content)}"  class="all-blogs-item">

        <img  src="${t.thumbnail_url}" />

        <span>${t.title}</span>
        </div>
    `;
                }),
            )

        }else{

            return `<p>${text[data.language].key2}</p>`
        }
				}}
				
				</div>
 
 </div> 











			<p>Ücretsiz Araçlar</p>
			<p>Açık Kaynak Projeler</p>
			<p>Bloglar</p>


 				<h2 style="text-align:center"><a href="./blogs">${text[data.language].key1}</a></h2>
				<h2 style="text-align:center" ><a>${text[data.language].key2}</a></h2>
				<h2 style="text-align:center" ><a>${text[data.language].key3}</a></h2>



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
                margin: .5rem 2rem;
				gap:1rem;
				
				
				}
				

			
			.profile-container{
			margin:auto;
			width:80%;
			max-width: 900px;
			display: flex;
 
			justify-content: center;
			
			}
			.profile-container figure figcaption{

			white-space: nowrap;

		}
			
			.profile-container figure{
			
			
			flex-grow:1;
			}
			.profile-container figure img{
			border-radius: 1rem 1rem 1rem 0rem;}

			.profile-heading{
			font-size:2rem;
			white-space: nowrap;
			font-weight:bold;
			
			}
			</style>
			 

      `,
		})
};
