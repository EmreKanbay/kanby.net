const Layouts = require("#Layouts");

const Framework = require("#Framework");


module.exports = {
	html: async data =>
		await Layouts.AdminLayout({
			user_id: data.user_id,
head: await Framework.render``,
			content: await Framework.render`
 
	This is dashboard

	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-dashboard").classList.add("is-active")
	</script>





  `,
		}),
};
