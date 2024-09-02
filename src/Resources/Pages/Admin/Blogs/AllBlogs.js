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
 
	All Blogs here

        				<select
  					id="all-blogs-language">
					${async () => {
						return String(
							(await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(t => {
								return `
					  <option value="" selected disabled hidden>language</option>

						<option value="${t}">${t}</option>
					`;
							}),
						).replaceAll(",", "\n");
					}}
				</select>


				<div id="all-blogs-list"></div>








				<style>
				
				#all-blogs-list{
				
				width:100%;
				display:flex;
				gap:1rem;
				
				
				}
				
				</style>
	<script>

				document.querySelector("#all-blogs-language").addEventListener("change",async ()=> {
					

					const formData = new FormData()

					formData.append("language", document.querySelector("#all-blogs-language").value)
					const res = await fetch(window.location.href, {
					method:"POST",
					body: formData
					
					})

					if(res.ok){
					
					document.querySelector("#all-blogs-list").innerHTML
					console.log(await res.json())
					}
					
					})



	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-blogs").classList.add("is-active")
	</script>

	
	${()=> {return typeof data?.script != "undefined" ? `<script>${data?.script}</script>` : ""}}


  `}

	) ,js: async (data)=> await construct``
}
	
