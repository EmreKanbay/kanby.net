const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();
const cdn = process.env.CDN_DOMAIN;

const render = async (x, ...values) => {
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

			head: await render``,
			content: await render`



<div id="blog-top-bar">

	<button class="blog-button" id="edit-blog">
	<img  src="${cdn}/assets/pen.svg" />
	</button>

	<button class="blog-button" id="delete-blog">
	<img  src="${cdn}/assets/trash-icon.svg" />
	</button>

</div>


	
   
    ${async () => {


			const text = `SELECT * FROM blogs WHERE id= $1`;

			const values = [data.id];
		
			var query = await Index.pool.query(text, values);
			
			t = query.rows[0];

			return await render`
		

			<form data-blog-id="${data.id}" style="display:none" id="edit-blog-form">
		<span>Select a language:</span>
        				<select
						required

 					id="blog-form-language-edit">

				${async () => {
					return await Promise.all(
						(await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(async r => {
							return await render`
 
						<option ${() => {
							if (t.language == r) {
								return "selected";
							} else {
								return "";
							}
						}}  value="${() => r}">${() => r}</option>
					`;
						}),
					);
				}}
				</select>



		
						


				<br>
			
				<h2>Title</h2>
 
				<input value="${t.title}" required id="blog-title-edit" type="text">

				<h2>Description</h2>
 
				<input value="${t.description}" required id="blog-description-edit" type="text">


	
				<h2>Cover Image url</h2>

				<input value="${t.thumbnail_url}" id="blog-cover-image-edit"  type="text">


				<h2>Markdown</h2>
				<textarea class="markdown-editor-edit"  required id="blog-markdown-content-edit"  class="markdown-editor" >${t.raw_content}</textarea>

					<br>
					<br>


				<input value="Save Edit" type="submit" />

 </form>



 <div data-title="${he.encode(t.title)}" data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}" data-raw-content="${he.encode(t.raw_content)}" class="markdown-body">

<img class="thumbnail" src="${t.thumbnail_url}" />
<h1  class="page-title">${t.title}</h1>

	${t.rendered_content}
	
	    </div>


		
		`;
		}}
   


	<style>

			.markdown-editor-edit{

		resize:vertical;
		width:100%;
		height: 400px;
		}

	#blog-top-bar{
	
	display:flex;
	justify-content:right;
	gap:1rem;
	}

	.blog-button{
	cursor:pointer;
	width:5rem;
	height:4rem;
		border: none;
	border-radius: .4rem;
	padding:.5rem;
	margin: .4rem 0;
	}
	

	#edit-blog{
	background-color:hsl(0,0%,40%);

	}
	#delete-blog{
	
	background-color:hsl(0,100%,50%);

	}

		.blog-button img{
	filter: invert(1);
	height:100%
	}

	.thumbnail{
	
	width:100%;
	border: 2px solid black !important;
	}
	
	</style>
 
  <script>
  

 




 document.querySelector("#edit-blog-form").addEventListener("submit", async (e)=> {
	e.preventDefault()

		document.querySelector(".loading-block").classList.add("active")

	const res = await fetch("https://api.github.com/markdown", {
		headers: {"accept": "application/vnd.github+json"},
		method:"POST",
		body: JSON.stringify({"text": document.querySelector("#blog-markdown-content-edit").value, mode: "gfm"})
		})

		if(res.ok){
		
		const formData = new FormData()


	formData.append("blog_title", document.querySelector("#blog-title-edit").value)
		formData.append("blog_markdown_rendered", await res.text())
		formData.append("blog_markdwon_raw", document.querySelector("#blog-markdown-content-edit").value)
		formData.append("blog_language", document.querySelector("#blog-form-language-edit").value)
		formData.append("blog_description", document.querySelector("#blog-description-edit").value)
		formData.append("blog_cover_image", document.querySelector("#blog-cover-image-edit").value)
		formData.append("blog_id", document.querySelector("#edit-blog-form").getAttribute("data-blog-id"))
	

		const res2 = await fetch(".", {
		method:"PATCH",
		body:formData

		
		
		})
		document.querySelector(".loading-block").classList.remove("active")


		if(res2.ok) window.location.href = "./";

		}




	})


 document.querySelector("#edit-blog").addEventListener("click", async ()=> {
	



document.querySelector(".markdown-body").style.display = "none"
document.querySelector("#edit-blog-form").style.display = "block"
document.querySelector("#blog-top-bar").style.display = "none"
	
	})

	 document.querySelector("#delete-blog").addEventListener("click", async ()=> {
	

		const formData = new FormData()

		formData.append("id", "test")

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
	document.querySelector(".navbar-blogs").classList.add("is-active")

 
  </script>



	`,
		}),
};
