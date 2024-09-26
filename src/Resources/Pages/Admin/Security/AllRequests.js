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

      content: await Framework.render/* html */ `
 
	<h1>Last Requests</h1>

    <div id="ip-list-container">
    <div class="loading-inline active"></div>
        </div>

        <!-- REACT COMPONENT START -->



				<script type="text/babel">

 
					const { Fragment, useState } = React


						const IpList = () => {

							  const reqKeys = ${async () => {


                                return await JSON.stringify(await Index.memoryCache.keys(),
                                );
                              }}



                     

                              const rendered = reqKeys.map((key) =>{

                                if(/^req:/.test(key)) {var temp = key.split(":");return <Fragment> <p> IP: {temp[2]} | PATH: {temp[3]} | DATE:{Date(temp[1] * 1)}</p> </Fragment>}
                                else return ""
                              }

                              );

 
                return (<Fragment>

                        {rendered}
                        

                </Fragment>)
 									
							
							}

					// Render the component to the DOM
					ReactDOM.render(<IpList />,
							
					  document.getElementById("ip-list-container")
					);
 

</script>
				<!-- REACT COMPONENT END -->


				<style>
				
        #ip-list-container{
          min-height: 200px;
        }
        #ip-list-container .loading-inline{
          height: 100%;
        }
				h1{text-decoration:underline}
				</style>


		<script>

		document.querySelectorAll(".nav-menu__item").forEach( (node, index) => { node.classList.remove("is-active")})
document.querySelector(".navbar-security").classList.add("is-active")

	</script>
	



  `,
    }),
};
