const Layouts = require("#Layouts");


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
 
		<title>Admin</title>
	`,content: await construct`
 
	This is dashboard

	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-dashboard").classList.add("is-active")
	</script>


	${()=> {return typeof data?.script != "undefined" ? `<script>${data?.script}</script>` : ""}}


  `}

	) ,js: async (data)=> await construct``
}
	
