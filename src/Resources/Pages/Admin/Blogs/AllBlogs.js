const Layouts = require("#Layouts");
const Index = require("#Index");

const Framework = require("#Framework");
require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;
module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render`
					<link rel="stylesheet" href="${cdn}/assets/github-markdown-light.css" />
	  `,
      content: await Framework.render`

<h1  class="page-title">Blogs</h1>

<span>language:</span>
        				<select
  					id="all-blogs-language">
					${async () => {
            return String(
              (
                await Index.pool.query(`SELECT * FROM "variables"`)
              ).rows[0].value.map((t) => {
                return `
					  <option value="" selected disabled hidden>language</option>

						<option value="${t}">${t}</option>
					`;
              }),
            ).replaceAll(",", "\n");
          }}
				</select>



				<div id="all-blogs-list">
				<h1>Select a language</h1>
			
				
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
				gap:1rem;
				
				
				}
				
				</style>
	<script>



				document.querySelector("#all-blogs-language").addEventListener("change",async ()=> {
					


					try{

						    if (window.navigator.onLine) {
							const formData = new FormData()

					formData.append("language", document.querySelector("#all-blogs-language").value)

					


		document.querySelector(".loading-block").classList.add("active")
					
					const res = await fetch(".", {
					method:"POST",
					body: formData
					
					})
		document.querySelector(".loading-block").classList.remove("active")
					var rows = await res.json()

					if(res.ok){
					

					document.querySelector("#all-blogs-list").innerHTML = rows.message 
 
					}else{

			document.querySelector("#qMQEbc-container").classList.add("active")
            document.querySelector("#qMQEbc-message").innerHTML = rows.message 
					
					}
							}
							else{
			document.querySelector("#qMQEbc-container").classList.add("active")
            document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"
							}
					
					
			}
					catch(e){

								document.querySelector("#qMQEbc-container").classList.add("active")
            document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
					}
					
					})



	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-blogs").classList.add("is-active")
	</script>




  `,
    }),
};
