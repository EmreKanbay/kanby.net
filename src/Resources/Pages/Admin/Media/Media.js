const Layouts = require("#Layouts");
const Index = require("#Index");

require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render``,
      content: await Framework.render`
 
	<h1>Media page</h1>

	<div id="media-display-cont">

	${async () => {

		var records = await Index.pool.query(`SELECT * FROM media`)

		if(records.rowCount != 0){
			return String(
				records.rows.map((t) => {
				  return `
			  
				  <div data-media-id="${t.id}" data-media-full-url="${t.full_url}" data-media-alt-text="${t.alt_text}"  class="media-element">
		  
				  <img src="${t.full_url}" alt="${t.alt_text}" />
		  
				  <a target="_blank" href="${t.full_url}">${t.full_url}</a>
		  
				  <button class="media-delete">delete</button>
			  </div>
				  `
				}),
			  ).replaceAll(",", "\n")
		}else{
			return `<h2>No Media Found</h2>`
		}

  }}



	${String(
    [2, 3, 1, 1, 1, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map(
      (t) => {
        return `
			  <div style="height:0" class="media-element placeholder">      
			  </div>
	  `;
      },
    ),
  ).replaceAll(",", "\n")}


	</div>


	<style>
	
	#media-display-cont{
margin-top:1rem;

display:flex;
flex-wrap: wrap;
gap:.5rem;
	}

.media-element{
    flex-grow:1;
 		min-width: 150px;
    max-width: 250px;
 }

.media-element img{
	width: 100%
}

	</style>

		<script>

		document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
document.querySelector(".navbar-media").classList.add("is-active")

document.querySelectorAll(".media-delete").forEach(t => {t.addEventListener("click", async (e)=> {


try{
if (window.navigator.onLine) {
const formData = new FormData();


formData.append("id", e.target.parentNode.getAttribute("data-media-id"))

	document.querySelector(".loading-block").classList.add("active")

 const res = await fetch(".", {

method:"DELETE",
body: formData,



})

		document.querySelector(".loading-block").classList.remove("active")

		if(res.ok){
		
		window.location.href = "."
		
		}else{
		
			document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"}

		}



else{
document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "No Internet Connection"}

}

catch(e){

document.querySelector("#qMQEbc-container").classList.add("active")
document.querySelector("#qMQEbc-message").innerHTML = "Unknown Error"
}

})})


	</script>
	



  `,
    }),
};
 
	



