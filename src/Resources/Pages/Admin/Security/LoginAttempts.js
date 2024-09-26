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
 
	<h1>Login Attempts</h1>

    <div id="ip-list-container">
    <div class="loading-inline active"></div>
        </div>

        <!-- REACT COMPONENT START -->



				<script type="text/babel">

 
					const { Fragment, useState } = React


						const IpList = () => {



              const loginAttemptKeys = ${async () => {

                return JSON.stringify(await Index.client.keys("login_attempt:*"))
              }}

              
							  const reqKeys = ${async () => {
                                const allKeys =  await Index.client.keys("req_login:*")
                                var obj = [];
                                for(let u of allKeys){
                                  var t = {}
                                  t[u.split(":")[1]] = await Index.client.get(u)
                                  obj.push(t)
                                }
                                return JSON.stringify(obj)
                              }}


                              const rendered = reqKeys.map((key) =>{

                              var ip = ""
                              var count = ""

                              for(let o in key){
                                ip = o
                                count = key[o]
                                          }


                              return <Fragment> <p>count: {count} | IP: {ip} </p> </Fragment>
                             
                            
                              }

                              );

                              const rendered2 = loginAttemptKeys.map((key) => {

                                const temp = key.split(":")
                                console.log(temp)

                                if(temp[3] == "2"){
                                  return <Fragment> <p>DATE: {Date(temp[1] * 1)} | IP: {temp[2]} | <span style={{fontSize:"2rem",backgroundColor:"red",color:"white"}}>Suspicious attempt</span> </p> </Fragment>

                                }else if (temp[3] == "1"){
                                  return <Fragment> <p>DATE: {Date(temp[1] * 1)} | IP: {temp[2]} | <span style={{fontSize:"2rem",color:"green"}}>Approved</span></p> </Fragment>

                                }else if (temp[3] == "0"){
                                  return <Fragment> <p>DATE: {Date(temp[1] * 1)} | IP: {temp[2]} |  <span style={{fontSize:"2rem",color:"red"}}>Not Approved</span></p> </Fragment>

                                }

                              })

 
                return (<Fragment>

                    <h3>Request Counts</h3>
                        {rendered}
                    <h3>All Requests</h3>
                    {rendered2}
                        

                </Fragment>)
 									
							
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
    }),
};
