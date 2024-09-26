const Layouts = require("#Layouts");
const Index = require("#Index");

const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render``,
      content: await Framework.render`
 
	<h1>add media</h1>

<form id="media-form">


<cite>*File name must have an accurate extention. Eg. image.png </cite>
<br>
<cite>*Only use Dashes(-) and underscores(_) for filename, do not use anything else  </cite>
<br>
<cite>*Preferably use avif and webp as image extention, they are better for compression process which leads faster loads </cite>
<br>
<p style="display:inline">File name:</p>
<input placeholder="my-image.webp" id="media-name" type="text"/><br> 
<p style="display:inline">Alt Text:</p>
<input placeholder="my-alt-text" id="alt_text" type="text"/><br>


 
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

try{
	if (window.navigator.onLine) {
		
	document.querySelector(".loading-block").classList.add("active")
		const formData = new FormData();

formData.append("file_name", document.querySelector("#media-name").value)
formData.append("alt_text", document.querySelector("#alt_text").value)


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
	 document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
}
	
	}
	else{
					document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"
}}

catch(e){

				document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"}


})




 

	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-media").classList.add("is-active")
	</script>
	



  `,
    }),
};






