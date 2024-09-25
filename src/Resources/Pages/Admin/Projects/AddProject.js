const Layouts = require("#Layouts");
const Index = require("#Index");

const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render``,
      content: await Framework.render`
 	<form id="add-project-form" >


						${async () => {
              return "".concat(
                ...(
                  await Index.pool.query(`SELECT * FROM "variables"`)
                ).rows[0].value.map((t) => {
                  return `

				<h2 data-lang="${t}">${t} Title</h2>
 
				<input  id="project-title-${t}" type="text">

				<h2>${t} Description</h2>
 
				<input  id="project-description-${t}" type="text">


	
				<h2>${t} Cover Image url</h2>
				<input id="project-cover-image-${t}"  type="text">
				<p>*Preferably cover image aspect ratio should be 4/3 (1280 x 960) and filetype should be png or jpg </p>

				<h2>${t} Links</h2>
				<div class="cont-links-${t}">
					<cite>*Link titles must be different, or it will corrupt</cite>

					<div class="cont-links-inner-${t}"></div>
					
				<input onclick="addNewLink(this, '${t}')" type="button" class="add-link" value="+">
				</div>
				

				<h2>${t} Markdown</h2>
 
				



				<textarea   id="project-markdown-content-${t}"  class="markdown-editor" ></textarea>
			<input class="preview-markdown" value="preview" type="button" />

			
					
`;
                }),
              );
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


	const addNewLink = (t, lng)=> {


		var a = document.createElement("div")
		var b = document.createElement("span")
		var c = document.createElement("input")
		var d = document.createElement("span")
		var e = document.createElement("input")
		var f = document.createElement("input")

		a.append(b)
		a.append(c)
		a.append(d)
		a.append(e)
		a.append(f)

	a.classList.add("project-link-cont-"+ lng)
	b.innerText = "Title: "
	c.classList.add("link-title-" + lng)
	c.setAttribute("placeholder", "Title")	
	c.setAttribute("type", "text")	
	d.innerText = "Link: "
	e.classList.add("link-link-" + lng)
	e.setAttribute("placeholder", "Link")	
	e.setAttribute("type", "text")	
 	f.setAttribute("type", "button")	
 	f.setAttribute("value", "-")	
	f.addEventListener("click", (e) => {

		e.target.parentNode.remove()		
		
		
		})



	t.previousElementSibling.append(a)
 
	
	}


	document.querySelectorAll(".preview-markdown").forEach(ty => {ty.addEventListener("click",async (e)=> {
		
try{

	if (window.navigator.onLine) {
	
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
		 document.querySelector("#qUp2bc-message").innerHTML = "No Internet Connection"


		}}


	else{
	document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"
	}
}
catch(e){
				document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"

}

		

		})})




	document.querySelector("#add-project-form").addEventListener("submit", async (e)=> {
		
		e.preventDefault()



		try{
			if (window.navigator.onLine) {
			
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
		
					var links = {}
		
					document.querySelectorAll(".link-title-"+ yhz).forEach(yxu => {
						links[yxu.value] = yxu.nextElementSibling.nextElementSibling.value
					})
		
				
						formData.append(yhz, JSON.stringify({
				links: JSON.stringify(links),
				title: document.querySelector("#project-title-" + yhz).value,
				markdown_raw:  document.querySelector("#project-markdown-content-" + yhz).value,
				markdown_rendered: await res2.text(),
				language: yhz,
				description: document.querySelector("#project-description-" + yhz).value,
				thumbnail_url: document.querySelector("#project-cover-image-" + yhz).value,
			
				}))
		
				
		
		
		
				}else{
					document.querySelector("#qUp2bc-container").classList.add("active")
					document.querySelector("#qUp2bc-message").innerHTML = "Markdown Render Failed"
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
				 document.querySelector("#qUp2bc-message").innerHTML = "Unknown Error"
				}
			
			}
			else{
							document.querySelector("#qMQEbc-container").classList.add("active")
		document.querySelector("#qMQEbc-message").innerHTML = "No Internet  Connection"
			}
		}
		catch(e){
						document.querySelector("#qMQEbc-container").classList.add("active")
		document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
		}
		})


	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-projects").classList.add("is-active")
	</script>
  `,
    }),
};


