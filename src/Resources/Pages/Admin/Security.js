const Layouts = require("#Layouts");

const Framework = require("#Framework");

module.exports = {
	html: async data =>
		await Layouts.AdminLayout({
			user_id: data.user_id,
			head: await Framework.render``,
			content: await Framework.render`

Security
    				<!-- REACT COMPONENT START -->
					
				<div id="customReactComponent"></div>

				<script type="text/babel">

 
						const { useState, Fragment } = React


					function Increment() {
					const [count, setCount] = useState(10);
					function handleClick() {
					  setCount(count + 1);
					}
					  return (
					  <Fragment>

						<div className={"ip-list-container"}>
test


						</div>
					  
					  <button onClick={handleClick}>YOUR IP = ${data.reqIp} - Click Count {count} </button>
					  <h1>test</h1>
					  </Fragment>)
					}
				  
					// Render the component to the DOM
					ReactDOM.render(
					  <Increment />,
					  document.getElementById("customReactComponent")
					);
 

</script>

<style>

.ip-list-container{
background:red;
}

</style>


				<!-- REACT COMPONENT END -->


	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-security").classList.add("is-active")
	</script>





  `,
		}),
};
