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
 
	<form id="add-blog-form">
		<span>Select a language:</span>
        				<select
						required

					name="cars"
					id="blog-form-language">
					  <option value="" selected disabled hidden>language</option>

					${async () => {
            return String(
              (
                await Index.pool.query(`SELECT * FROM "variables"`)
              ).rows[0].value.map((t) => {
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


	
				<h2>Cover Image url</h2>
				<input id="blog-cover-image"  type="text">
				<p>*Preferably cover image aspect ratio should be 4/3 (1280 x 960) and filetype should be png or jpg </p>


				<h2>Markdown</h2>
				<textarea  required id="blog-markdown-content"  class="markdown-editor" ></textarea>

					<br>
					<br>

          <label>Status: </label>
          <select required name="status" id="blog-status">
            <option selected value="draft">draft</option>
            <option value="published">published</option>

          </select>
          <br>
          <br>

				<input type="submit" />

				<input id="preview-markdown" value="preview" type="button" />
</form>
				<h2>Preview</h2>

				<div class="markdown-body" ></div>

				<style>
				
				.markdown-editor{

				resize:vertical;
				width:100%;
				height: 400px;
				}
				
				
				</style>
	<script>

window.onbeforeunload = function() {
    return true;
};



	document.querySelector("#preview-markdown").addEventListener("click", async (e) => {

try{


if (window.navigator.onLine) {

document.querySelector(".loading-block").classList.add("active")

const res = await fetch("https://api.github.com/markdown", {
	headers: {
		"accept": "application/vnd.github+json"
	},
	method: "POST",
	body: JSON.stringify({
		"text": document.querySelector("#blog-markdown-content").value,
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




document.querySelector("#add-blog-form").addEventListener("submit", async (e) => {

window.onbeforeunload = undefined

    e.preventDefault()

try{
    if (window.navigator.onLine) {

        document.querySelector(".loading-block").classList.add("active")


        const res = await fetch("https://api.github.com/markdown", {
            headers: {
                "accept": "application/vnd.github+json"
            },
            method: "POST",
            body: JSON.stringify({
                "text": document.querySelector("#blog-markdown-content").value,
                mode: "gfm"
            })
        })


        if (res.ok) {

            const formData = new FormData();

            formData.append("blog_title", document.querySelector("#blog-title").value)
            formData.append("blog_markdown_rendered", await res.text())
            formData.append("blog_markdwon_raw", document.querySelector("#blog-markdown-content").value)
            formData.append("blog_language", document.querySelector("#blog-form-language").value)
            formData.append("blog_description", document.querySelector("#blog-description").value)
            formData.append("blog_cover_image", document.querySelector("#blog-cover-image").value)
            formData.append("blog_status", document.querySelector("#blog-status").value)

            const response = await fetch("..", {
                method: "PUT",
                body: formData,

            })


            document.querySelector(".loading-block").classList.remove("active")



            if (response.ok) {
                window.location.href = ".."
            } else {
                document.querySelector("#qMQEbc-container").classList.add("active")
                document.querySelector("#qMQEbc-message").innerHTML = "Blog could not be added due to error"
            }



        } else {
            document.querySelector("#qMQEbc-container").classList.add("active")
            document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"


        }

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




