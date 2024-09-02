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
 
	All Contents here

        				<select
					onchange=""
					name="cars"
					id="cars">
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


	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-contents").classList.add("is-active")
	</script>

	
	${()=> {return typeof data?.script != "undefined" ? `<script>${data?.script}</script>` : ""}}


  `}

	) ,js: async (data)=> await construct``
}
	
