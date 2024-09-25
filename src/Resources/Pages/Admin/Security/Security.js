const Layouts = require("#Layouts");
const Index = require("#Index");

const Framework = require("#Framework");

module.exports = {
  html: async (data) => {
    return await Layouts.AdminLayout({
      user_id: data.user_id,
      head: await Framework.render``,
      content: await Framework.render`

<h1>Security</h1>
    				

	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-security").classList.add("is-active")
	</script>





  `,
    });
  },
};
