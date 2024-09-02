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
	html: async (data) => await Layouts.AdminLayout({
		head: await construct`
		<link
			rel="stylesheet"
			href="/assets/globals.css" />
		<title>Admin</title>
	`,content: await construct`
 
	<form id="add-blog-form">
		<span>Select a language:</span>
        				<select
						required

					name="cars"
					id="blog-form-language">
					  <option value="" selected disabled hidden>language</option>

					${async () => {
						return String(
							(await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(t => {
								return `
						<option value="${t}">${t}</option>
					`;
							}),
						).replaceAll(",", "\n");
					}}
				</select>
				<br>
			
				<h2>Title</h2>
 
				<input required id="blog-title" type="text">

				<h2>Description</h2>
 
				<input required id="blog-description" type="text">


	
				<h2>Cover Image</h2>

				<input id="blog-cover-image"  type="file">


				<h2>Markdown</h2>
				<textarea  required id="blog-markdown-content"  class="markdown-editor" ></textarea>


				<h2>Meta Title</h2>
 
				<input required id="blog-meta-title" type="text">

				<h2>Meta Description</h2>
 
				<input required id="blog-meta-description" type="text">


					<br>
					<br>


				<input type="submit" />

				<input required id="preview-markdown" value="preview" type="button" />
</form>
				<h2>Preview</h2>

				<div required class="markdown-body" ></div>

				<style>
				
				.markdown-editor{

				resize:vertical;
				width:100%;
				height: 400px;
				}
				
				
				</style>
	<script>

	document.querySelector("#preview-markdown").addEventListener("click",async (e)=> {
		
		const res = await fetch("https://api.github.com/markdown", {
		headers: {"accept": "application/vnd.github+json"},
		method:"POST",
		body: JSON.stringify({"text": document.querySelector("#blog-markdown-content").value, mode: "gfm"})
		})

		if (res.ok){

		document.querySelector(".markdown-body").innerHTML = await res.text()
 		}

		})

	document.querySelector("#add-blog-form").addEventListener("submit", async (e)=> {

		e.preventDefault()
		
 	const res = await fetch("https://api.github.com/markdown", {
		headers: {"accept": "application/vnd.github+json"},
		method:"POST",
		body: JSON.stringify({"text": document.querySelector("#blog-markdown-content").value, mode: "gfm"})
		})

		if (res.ok){


 		const formData = new FormData();

		formData.append("blog_title", document.querySelector("#blog-title").value)
		formData.append("blog_markdown", await res.text())
		formData.append("blog_language", document.querySelector("#blog-form-language").value)
		formData.append("blog_description", document.querySelector("#blog-description").value)
		formData.append("blog_meta_description", document.querySelector("#blog-meta-description").value)
		formData.append("blog_meta_title", document.querySelector("#blog-meta-title").value)
 
		const response = await fetch("./", {
		method:"PUT",
		body: formData,
		
		}) 
		
		
		}


	

		})


	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-blogs").classList.add("is-active")
	</script>

	
	${()=> {return typeof data?.script != "undefined" ? `<script>${data?.script}</script>` : ""}}


  `}

	) ,js: async (data)=> await construct``
}
	
