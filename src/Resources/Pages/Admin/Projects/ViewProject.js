const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();
const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = {
	html: async data =>
		await Layouts.AdminLayout({
			user_id: data.user_id,

			head: await Framework.render``,
			content: await Framework.render`



<div id="project-top-bar">

	<button class="project-button" id="edit-project">
	<img  src="${cdn}/assets/pen.svg" />
	</button>

	<button class="project-button" id="delete-project">
	<img  src="${cdn}/assets/trash-icon.svg" />
	</button>

</div>


		<div id="project-edit-cont">
	
   
    ${async () => {
			const text = `SELECT * FROM projects WHERE id= $1`;

			const values = [data.id];

			var query = await Index.pool.query(text, values);

			t = query.rows[0];

			return await Framework.render`

			${async () => {
				return "".concat(
					...(await Promise.all(
						Object.values(t).map(async trx => {
							if (trx?.title) {
								return await Framework.render`

<details>

<summary>${trx?.language}</summary>



					<form class="form-edit-project" data-project-id=${data.id} data-language="${trx?.language}">
				<h2 data-lang="${trx?.language}">${trx?.language} Title</h2>
 
				<input value="${trx?.title}"  id="project-title-${trx?.language}" type="text">

				<h2>${trx?.language} Description</h2>
 
				<input value="${trx?.description}"   id="project-description-${trx?.language}" type="text">


	
				<h2>${trx?.language} Cover Image url</h2>
				<input value="${trx?.thumbnail_url}"  id="project-cover-image-${trx?.language}"  type="text">
				<p>*Preferably cover image aspect ratio should be 4/3 (1280 x 960) and filetype should be png or jpg </p>




	<h2>${trx?.language} Links</h2>
				<div class="cont-links-${trx?.language}">
					<cite>*Link titles must be different, or it will corrupt</cite>

					<div class="cont-links-inner-${trx?.language}">
					
	
							${async () => {
								if (trx?.links) {
									const links = JSON.parse(trx?.links);

									return "".concat(
										...Object.keys(links).map(ytz => {
											return `<div class="project-link-cont-${trx?.language}"><span>Title: </span> <input value="${ytz}" class="link-title-${trx?.language}" placeholder="title" type="text"> <span>Link: </span> <input  value="${links[ytz]}" class="link-link-${trx?.language}" placeholder="link" type="text"><input onclick="this.parentNode.remove()" class="remove-link" type="button" value="-"></div>`;
										}),
									);
								} else {
									return `<div class="project-link-cont-${trx?.language}"><span>Title: </span> <input class="link-title-${trx?.language}" placeholder="title" type="text"> <span>Link: </span> <input class="link-link-${trx?.language}" placeholder="link" type="text"><input onclick="this.parentNode.remove()" class="remove-link" type="button" value="-"></div>`;
								}
							}}
					
					
						</div>

				<input onclick="addNewLink(this, '${trx?.language}')" type="button" class="add-link" value="+">
				</div>






				<h2>${trx?.language} Markdown</h2>

				<textarea   id="project-markdown-content-${trx?.language}"  class="markdown-editor" >${trx?.markdown_raw}</textarea>
 <input type="submit">
</form>
	</details>

			
					
`;
							} else return ``;
						}),
					)),
				);
			}}

		
		`;
		}}
	
   
</div>













<div id="project-view-cont">
${async () => {
	return "".concat(
		...Object.values(t).map(trx => {
			if (trx?.title) {
				return `

<details>
<summary>${trx?.language}</summary>

 <h2 data-lang="${trx?.language}">${trx?.language} Title: ${trx?.title}</h2>

 
<h2>${trx?.language} Description: ${trx?.description}</h2>

 


<h2>${trx?.language} Cover Image url: ${trx?.thumbnail_url}</h2>
 


<h2>${trx?.language} Markdown: ${trx?.markdown_raw}</h2>
 




</details>



`;
			} else return ``;
		}),
	);
}}


</div>


	<style>

	#project-edit-cont{
	display:none;
	
	}

			.markdown-editor-edit{

		resize:vertical;
		width:100%;
		height: 400px;
		}

	#project-top-bar{
	
	display:flex;
	justify-content:right;
	gap:1rem;
	}

	.project-button{
	cursor:pointer;
	width:5rem;
	height:4rem;
		border: none;
	border-radius: .4rem;
	padding:.5rem;
	margin: .4rem 0;
	}
	

	#edit-project{
	background-color:hsl(0,0%,40%);

	}
	#delete-project{
	
	background-color:hsl(0,100%,50%);

	}

		.project-button img{
	filter: invert(1);
	height:100%
	}

	.thumbnail{
	
	width:100%;
	border: 2px solid black !important;
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






  
document.querySelectorAll(".form-edit-project").forEach(ety => {ety.addEventListener("submit", async (e)=> {
	e.preventDefault()


	const lngt = ety.getAttribute("data-language")
	const frmid = ety.getAttribute("data-project-id")

 
		document.querySelector(".loading-block").classList.add("active")

	const res = await fetch("https://api.github.com/markdown", {
		headers: {"accept": "application/vnd.github+json"},
		method:"POST",
		body: JSON.stringify({"text": document.querySelector("#project-markdown-content-" + lngt).value, mode: "gfm"})
		})

		const markdown_rndnr = await res.text()
		
		const formData = new FormData()

	var links = {}
	document.querySelectorAll(".link-title-" + lngt).forEach(tete => {
		
		links[tete.value] = tete.nextElementSibling.nextElementSibling.value
		
		})

		if(res.ok){

	  formData.append(lngt, JSON.stringify({
		
	  			links: JSON.stringify(links),
				title: document.querySelector("#project-title-" + lngt).value,
				markdown_raw:  document.querySelector("#project-markdown-content-" + lngt).value,
				markdown_rendered: markdown_rndnr,
				language: lngt,
				description: document.querySelector("#project-description-" + lngt).value,
				thumbnail_url: document.querySelector("#project-cover-image-" + lngt).value,
			
}))

formData.append("id", frmid)


				const res2 = await fetch(".", {
					method:"PATCH",
					body:formData
			
					
					
					})
					document.querySelector(".loading-block").classList.remove("active")
			
			
					if(res2.ok) window.location.href = ".";
		}
		

		


		}

	)})




 document.querySelector("#edit-project").addEventListener("click", async ()=> {
	






document.querySelector("#project-view-cont").style.display = "none"
document.querySelector("#project-edit-cont").style.display = "block"
document.querySelector("#project-top-bar").style.display = "none"
	
	})
 
	 document.querySelector("#delete-project").addEventListener("click", async ()=> {
	

		const formData = new FormData()

		formData.append("id", document.querySelector("[data-project-id]").getAttribute("data-project-id"))

		document.querySelector(".loading-block").classList.add("active")

		const res = await fetch(".", {
		method:"DELETE",
		body: formData
		})
	
		document.querySelector(".loading-block").classList.remove("active")


		if (res.ok){

		window.location.href = "../"
		
		}else{
		
		}
	 
	
	})
 
 
 	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-projects").classList.add("is-active")

  </script>



	`,
		}),
};
