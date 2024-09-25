const Layouts = require("#Layouts");
const Index = require("#Index");
var he = require("he");

const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.AdminLayout({
      user_id: data.user_id,

      head: await Framework.render``,
      content: await Framework.render`

<h1  class="page-title">Projects</h1>

 



				<div id="all-blogs-list">
			
				${async () => {
          const text = `SELECT * FROM projects`;

          const values = [];

          var record = await Index.pool.query(text, values);

          if (record.rowCount == 0) {
            return "<h1>No Project exist</h1>";
          } else {
            return "".concat(
              ...record.rows.map((t) => {
                return `

 <a href="/admin/${data.user_id}/projects/${t.id}/"  class="all-blogs-item">

			<img  src="${t["English"].thumbnail_url}" />

			<span>${t["English"].title}</span>
			</a>
		`;
              }),
            );
          }
        }}
				
				</div>

				<style>

				.all-blogs-item{
				cursor:pointer;
				display:grid;
				min-width:200px;
				max-width:300px;
				grid-template-columns: 100%;
				grid-template-rows: 5fr 1fr;
				border:1px solid black;
				overflow: hidden;
				border-radius: .7rem;

				}

				.all-blogs-item img{
				
				width:100%
				}

				.all-blogs-item{
				display:grid;
				place-items:center;
				
				}
				
				#all-blogs-list{
				
				width:100%;
				display:flex;
				flex-wrap:wrap;
				gap:1rem;
				
				
				}
				
				</style>
	<script>




	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-projects").classList.add("is-active")
	</script>




  `,
    }),
};
