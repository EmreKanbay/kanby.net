const Layouts = require("#Layouts");
const Index = require("#Index");

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

module.exports = {
	html: async data =>
		await Layouts.AdminLayout({
			user_id: data.user_id,

head: await construct``,
			content: await construct`
 	<form id="add-project-form" >


						${async () => {
						return  "".concat(...((await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value).map(t => {
							return `

								
 


				<h2 data-lang="${t}">${t} Title</h2>
 
				<input  id="project-title-${t}" type="text">

				<h2>${t} Description</h2>
 
				<input  id="project-description-${t}" type="text">


	
				<h2>${t} Cover Image url</h2>
				<input id="project-cover-image-${t}"  type="text">
				<p>*Preferably cover image aspect ratio should be 4/3 (1280 x 960) and filetype should be png or jpg </p>



				<h2>${t} Markdown</h2>

				<textarea   id="project-markdown-content-${t}"  class="markdown-editor" ></textarea>
			<input class="preview-markdown" value="preview" type="button" />


	

			
					
`;
						}))
						
						
					}}
			

				<input type="submit" />

</form>
				<h2>Preview</h2>

				<div  class="markdown-body" ></div>

				<style>
				
				.markdown-editor{

				resize:vertical;
				width:100%;
				height: 400px;
				}
				
				
				</style>
	<script>

	document.querySelectorAll(".preview-markdown").forEach(ty => {ty.addEventListener("click",async (e)=> {
		

		document.querySelector(".loading-block").classList.add("active")

		const res = await fetch("https://api.github.com/markdown", {
		headers: {"accept": "application/vnd.github+json"},
		method:"POST",
		body: JSON.stringify({"text": e.target.previousElementSibling.value, mode: "gfm"})
		})

		if (res.ok){

		document.querySelector(".markdown-body").innerHTML = await res.text()
		document.querySelector(".loading-block").classList.remove("active")
		
 		}else {
 						 document.querySelector("#qUp2bc-container").classList.add("active")
		 document.querySelector("#qUp2bc-message").innerHTML = await response.text()


		}

		})})

	document.querySelector("#add-project-form").addEventListener("submit", async (e)=> {
		
		e.preventDefault()
		document.querySelector(".loading-block").classList.add("active")








 		const formData = new FormData();
			var all_langs = []

	document.querySelectorAll("[data-lang]").forEach(uzs => {
		
		all_langs.push(uzs.getAttribute("data-lang"))
		
		})

await Promise.all(all_langs.map(async yhz => {

		var res2 = await fetch("https://api.github.com/markdown", {
			headers: {"accept": "application/vnd.github+json"},
			method:"POST",
			body: JSON.stringify({"text": document.querySelector("#project-markdown-content-" + yhz).value, mode: "gfm"})
			})

		if(res2.ok){
		
				formData.append(yhz, JSON.stringify({
		
		title: document.querySelector("#project-title-" + yhz).value,
		markdown_raw:  document.querySelector("#project-markdown-content-" + yhz).value,
		markdown_rendered: await res2.text(),
		language: yhz,
		description: document.querySelector("#project-description-" + yhz).value,
		thumbnail_url: document.querySelector("#project-cover-image-" + yhz).value,
	
		}))

		}
	


	}))
		

		const response = await fetch("..", {
		method:"PUT",
		body: formData,
		
		}) 

		document.querySelector(".loading-block").classList.remove("active")



		if(response.ok){

 
		window.location.href = ".."
		
		}
		else{
		 document.querySelector("#qUp2bc-container").classList.add("active")
		 document.querySelector("#qUp2bc-message").innerHTML = await response.text()
		}


	
	

 
		
				



	

		})


	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-projects").classList.add("is-active")
	</script>

	



  `,
		}),
};


