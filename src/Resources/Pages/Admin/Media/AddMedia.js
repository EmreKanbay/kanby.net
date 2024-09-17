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
 
	<h1>add media</h1>

<form id="media-form">


<input id="media-upload" type="file"/><br>


<p style="display:inline">File name:</p>
<input placeholder="my-image" id="media-name" type="text"/><br> 
<p style="display:inline">Alt Text:</p>
<input placeholder="my-alt-text" id="alt_text" type="text"/><br>



<img id="preview" /> <br>

 
 <input type="submit"/>

</form>


<style>

#preview{
width: 40vw;

}
</style>


		<script>



			
document.querySelector("#media-form").addEventListener("submit", async (e)=> {
	e.preventDefault();

	const formData = new FormData();
 
	formData.append("media", document.querySelector("#media-upload").files[0], document.querySelector("#media-name").value + "." + document.querySelector("#media-upload").files[0].name.split(".")[document.querySelector("#media-upload").files[0].name.split(".").length - 1])
	formData.append("alt_text", document.querySelector("#alt_text").value)
 
		document.querySelector(".loading-block").classList.add("active")

 	const res = await fetch("..", {

	method:"PUT",
	body: formData,

	
	
	})

			document.querySelector(".loading-block").classList.remove("active")


	if(res.ok) {
                window.location.href = ".."
	
	}
	else{
	
	 document.querySelector("#qMQEbc-container").classList.add("active")
		 document.querySelector("#qMQEbc-message").innerHTML = await res.text()
}
}	)





document.querySelector("#media-upload").addEventListener("change", (e) => {
	
	const [file] = document.querySelector("#media-upload").files

	if (file) {
	
	document.querySelector("#preview").src = URL.createObjectURL(file)

	
	}
	
	})

 

	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-media").classList.add("is-active")
	</script>
	



  `,
		}),
};
