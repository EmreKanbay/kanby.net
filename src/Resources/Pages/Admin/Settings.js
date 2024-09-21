const Layouts = require("#Layouts");

const Framework = require("#Framework");

module.exports = {
	html: async data =>
		await Layouts.AdminLayout({
			user_id: data.user_id,
			head: await Framework.render``,
			content: await Framework.render`

Settings
    				<!-- REACT COMPONENT START -->
				<div id="customReactComponent"></div>

				<script type="text/babel">
					const { useState } = React


					function Increment() {
				  
				  
				  
					const [count, setCount] = useState(10);
					function handleClick() {
					  setCount(count + 1);
					}
					  return (<button onClick={handleClick}>YOUR IP = ${data.reqIp} - Click Count {count} </button>)
					}
				  
					// Render the component to the DOM
					ReactDOM.render(
					  <Increment />,
					  document.getElementById("customReactComponent")
					);
</script>
				<!-- REACT COMPONENT END -->


	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-settings").classList.add("is-active")
	</script>





  `,
		}),
};
