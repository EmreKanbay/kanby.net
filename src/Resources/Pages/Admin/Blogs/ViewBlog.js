const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

require("dotenv").config();
const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render``,
      content: await Framework.render`



<div id="blog-top-bar">

	<button class="blog-button" id="edit-blog">
	<img  src="${cdn}/assets/pen.svg" />
	</button>


	<button class="blog-button" id="delete-blog">
	<img src="${cdn}/assets/trash-icon.svg">
	</button>


</div>


	
   
    ${async () => {
      const text = `SELECT * FROM blogs WHERE id= $1`;

      const values = [data.id];

      var query = await Index.pool.query(text, values);

      t = query.rows[0];

      return await Framework.render`
		

			<form data-blog-id="${data.id}" style="display:none" id="edit-blog-form">
		<span>Select a language:</span>
        				<select
						required

 					id="blog-form-language-edit">

				${async () => {
          return await Promise.all(
            (
              await Index.pool.query(`SELECT * FROM "variables"`)
            ).rows[0].value.map(async (r) => {
              return await Framework.render`
 
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
			
				<h2>Blog Page Title</h2>
 
				<input value="${t.title}" required id="blog-title-edit" type="text">

				<h2>Blog Page Description</h2>
 
				<input value="${t.description}" required id="blog-description-edit" type="text">


	
				<h2>Cover Image url</h2>

				<input value="${t.thumbnail_url}" id="blog-cover-image-edit"  type="text">


				<h2>Blog Content(Markdown)</h2>
				<textarea class="markdown-editor-edit"  required id="blog-markdown-content-edit"  class="markdown-editor" >${t.raw_content}</textarea>

					<br>
					<br>
          <label>Status: </label>
          <select required name="status" id="blog-status">
            <option ${t.status == "draft" ? "selected" :""} value="draft">draft</option>
            <option ${t.status == "published" ? "selected" :""} value="published">published</option>

          </select>
          <br>
          <br>

				<input id="blog-edit-submit" value="Save Edit" type="submit" />
				<input id="blog-edit-preview" value="preview" type="button" />

 </form>

				<h2>Preview</h2>
				<div  class="markdown-body" ></div>




 <div id="view-blog-here" data-title="${he.encode(t.title)}" data-thumbnail-url="${he.encode(t.thumbnail_url)}" data-description="${he.encode(t.description)}" data-raw-content="${he.encode(t.raw_content)}" class="markdown-body">

<img class="thumbnail" src="${t.thumbnail_url}" />
<h1  class="page-title">${t.title}</h1>

	${t.rendered_content}
	
	    </div>


		
		`;
    }}
   


	<style>



	#blog-title-edit,#blog-description-edit, #blog-cover-image-edit {
	
	width:100%;
	padding:1rem;
	font-size: 1.3rem;
	padding:1rem;
	box-sizing:border-box;
	
	}
	#blog-description-edit{
	height:2rem;
	}

	#blog-edit-submit{
	
	padding:.5rem 1rem;
	border-radius: .4rem;
	font-size:2rem;
	border: 2px solid black;
	background: white;
	}

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
  





	document.querySelector("#blog-edit-preview").addEventListener("click", async (e) => {

try{


if (window.navigator.onLine) {

document.querySelector(".loading-block").classList.add("active")

const res = await fetch("https://api.github.com/markdown", {
	headers: {
		"accept": "application/vnd.github+json"
	},
	method: "POST",
	body: JSON.stringify({
		"text": document.querySelector(".markdown-editor-edit").value,
		mode: "gfm"
	})
})

document.querySelector(".loading-block").classList.remove("active")


if (res.ok) {

	document.querySelector(".markdown-body").innerHTML = await res.text()
	document.querySelector("#qMQEbc-container").classList.remove("active")

} else {
	document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "Error While Preview"


}

} else {
document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"
}


}
catch(e){
document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
}


})



 










 document.querySelector("#edit-blog-form").addEventListener("submit", async (e)=> {
	e.preventDefault()


	try{
	

	if (window.navigator.onLine) {
	
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
		formData.append("blog_status", document.querySelector("#blog-status").value)
	

		const res2 = await fetch(".", {
		method:"PATCH",
		body:formData		
		})
		document.querySelector(".loading-block").classList.remove("active")


		if(res2.ok) window.location.href = "./";
		else{
		
			document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
	
	}

		}
	else{
	document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "Markdown Render Failed"
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


 document.querySelector("#edit-blog").addEventListener("click", async ()=> {
	



document.querySelector("#view-blog-here").style.display = "none"
document.querySelector("#edit-blog-form").style.display = "block"
document.querySelector("#blog-top-bar").style.display = "none"
	
	})



	 document.querySelector("#delete-blog").addEventListener("click", async ()=> {
	
		document.querySelector("dialog").show()

		document.querySelector(".dialog-title").innerText = "Delete Blog?"

  
		document.querySelector(".dialog-action").addEventListener("click", async ()=> {

try{
	if (window.navigator.onLine) {
	
	
		const formData = new FormData()

		document.querySelector(".loading-block").classList.add("active")

		const res = await fetch(".", {
		method:"DELETE",
		body: formData
		})
	
		document.querySelector(".loading-block").classList.remove("active")


		if (res.ok){

		window.location.href = "../"
		
		}else{
		
				document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"}
		}
	 
		
	else{
				document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"
	}
}
catch(e){

				document.querySelector("#qMQEbc-container").classList.add("active")
	document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"}

		}, { once: true})

	
	})
 
 	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-blogs").classList.add("is-active")

 
  </script>



	`,
    }),
};

