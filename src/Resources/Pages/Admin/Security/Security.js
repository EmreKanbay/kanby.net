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
    				<!-- REACT COMPONENT START -->
					
 
				<details>
				<summary>Requests for last 48 hours</summary>
					<div id="ip-list-container">
					<div class="loading-inline active"></div>
						</div>
				</details>


				<script type="text/babel">

 
					const { Fragment, Suspense, useState, useEffect } = React

					const Loading = () => {
						
						return <div className="loading-inline active"></div>}


						const IpList = () => {

							  const [list, setList] = useState(<Loading />);

								useEffect(()=> {
									const responses =  ${async () => {
                    return await JSON.stringify(
                      await Index.client.keys("request_ips:*"),
                    );
                  }}


										new Promise(async (resolve, reject) => {

										
											const IpList = await responses.map(response => {
												
												const temp = response.split(":")

												
  											
												const response_ip = temp[1]
												const response_date = (new Date(temp[2] * 1)).toString()
												const response_path = temp[3]

												return (
												<p>
												<span>Ip: {response_ip}</span> |
												<span>Date: {response_date}</span>|
												<span>Path: {response_path}</span>
												
												</p>
	
												
												)
												})

											resolve(IpList)

											}).then(e => setList(e))
 									
									},[])

							  return list

							}

					// Render the component to the DOM
					ReactDOM.render(<IpList />,
							
					  document.getElementById("ip-list-container")
					);
 

</script>
				<!-- REACT COMPONENT END -->


				<style>
				
				h1{text-decoration:underline}
				</style>

	<script>
	document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
	document.querySelector(".navbar-security").classList.add("is-active")
	</script>





  `,
    });
  },
};
