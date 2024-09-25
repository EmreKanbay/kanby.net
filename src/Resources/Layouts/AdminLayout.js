require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = async (data) =>
  await Framework.render`
    <!doctype html>
            <html lang="en">
                <head>
                    <title>Admin</title>
                	<meta name="robots" content="noindex,nofollow">
                    <link rel="stylesheet" href="${cdn}/assets/globals.css" />
		            <link rel="icon" href="${cdn}/assets/logo.svg">
                    ${data.head}


                              <!-- REACT CDN START -->
		    <script defer crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
            <script defer crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
            <script defer type="text/javascript" src="https://unpkg.com/babel-standalone@6/babel.js"></script>
			                <!-- REACT CDN END -->
                </head>

    
                <body>
               

                        <div class="l-sidebar">
                            <a href="/" class="logo">
                                 <img   style="height:90%" src="${cdn}/assets/logo.svg"/>
                             </a>
                            <div class="l-sidebar__content">
                                <nav class="nav-menu js-menu">
                                    <ul class="u-list">

                                        <li  class="nav-menu__item navbar-dashboard "
                                             >
                                             <div class="nav-menu__item__inner">

                           
                                                <a  href="/admin/${data.user_id}/dashboard/" class="nav-menu__item__inner_main"> 
                                                
                                                        <img
                                                        style="filter:invert(1)"
                                                        src="${cdn}/assets/dashboard-icon.svg"
                                                        class="sidebar-menu-icons" />
                                                    <div class="nav-menu-item__title"><span>Dashboard</span></div>
                                                 </a>
                                                <a href="/admin/${data.user_id}/dashboard/analytics" class="nav-menu__item__inner-submenu">
                                                        <div>Analytics</div>
                                                 </a>  
                                            </div>


      
                                        </li>



                                            <li class="nav-menu__item  navbar-blogs  "
                                             >
                                            <div class="nav-menu__item__inner">
                                                <a href="/admin/${data.user_id}/blogs/" class="nav-menu__item__inner_main"> 
                                                
                                                        <img
                                                         src="${cdn}/assets/blogs-icon.svg"
                                                        class="sidebar-menu-icons" />
                                                    <div class="nav-menu-item__title"><span>Blog</span></div>
                                                </a>
                                                <a href="/admin/${data.user_id}/blogs/add/" class="nav-menu__item__inner-submenu">
                                                         <div>Add New</div>
                                                </a>  
                                            </div>
                                        </li>


                                        <li  class="nav-menu__item navbar-projects "
                                             >
                                            <div class="nav-menu__item__inner">
                                                <a href="/admin/${data.user_id}/projects/"  class="nav-menu__item__inner_main"> 
                                                
                                                        <img
                                                         src="${cdn}/assets/pen.svg"
                                                        class="sidebar-menu-icons" />
                                                    <div class="nav-menu-item__title"><span>Projects</span></div>
                                                </a>
                                                <a href="/admin/${data.user_id}/projects/add/" class="nav-menu__item__inner-submenu">
                                                        <div>Add</div>
                                                 </a>  
                                            </div>
                                        </li>



                                                        <li class="nav-menu__item  navbar-media  "
                                             >
                                            <div class="nav-menu__item__inner">
                                                <a  href="/admin/${data.user_id}/media/" class="nav-menu__item__inner_main"> 
                                                
                                                        <img
                                                         src="${cdn}/assets/image-icon.svg"
                                                        class="sidebar-menu-icons" />
                                                    <div class="nav-menu-item__title"><span>Media</span></div>
                                                </a>
                                                <a  href="/admin/${data.user_id}/media/add/" class="nav-menu__item__inner-submenu">
                                                         <div>Add New</div>
                                                </a>  
                                            </div>
                                        </li>



                                    <li  class="nav-menu__item navbar-security "
                                             >
                                             <div class="nav-menu__item__inner">

                           
                                                <a  href="/admin/${data.user_id}/security/" class="nav-menu__item__inner_main"> 
                                                
                                                        <img
                                                        src="${cdn}/assets/shield.svg"
                                                        class="sidebar-menu-icons" />
                                                    <div class="nav-menu-item__title"><span>Security</span></div>
                                                 </a>
                                                <a href="/admin/${data.user_id}/dashboard/all_requests" class="nav-menu__item__inner-submenu">
                                                        <div>All Requests</div>
                                                 </a>  
                                                        <a href="/admin/${data.user_id}/dashboard/login_attempts" class="nav-menu__item__inner-submenu">
                                                        <div>Login Attempts</div>
                                                 </a>  
                                                        <a href="/admin/${data.user_id}/dashboard/ip_blacklist" class="nav-menu__item__inner-submenu">
                                                        <div>IP Blacklist</div>
                                                 </a>  
                                            </div>


      
                                        </li>




                                    <li  class="nav-menu__item navbar-settings "
                                    >
                                    <div class="nav-menu__item__inner">

                  
                                       <a  href="/admin/${data.user_id}/settings/" class="nav-menu__item__inner_main"> 
                                       
                                               <img
                                               src="${cdn}/assets/settings.svg"
                                               class="sidebar-menu-icons" />
                                           <div class="nav-menu-item__title"><span>Settings</span></div>
                                        </a>
                                       <a href="/admin/${data.user_id}/dashboard/analytics" class="nav-menu__item__inner-submenu">
                                               <div>Analytics</div>
                                        </a>  
                                   </div>



                               </li>

    

                                    </ul>
                                </nav>
                            </div>
                        </div>
    
                        <main class="l-main">
                                <div class="loading-block"></div>
                                <div id="qMQEbc-container">
		<div>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"></path>
			</svg>
		</div>
		<div id="qMQEbc-message"></div>
	</div>

	<style>
    #qMQEbc-container.active{
display: grid; 
    }
		#qMQEbc-container {
        display:none;
 			margin-top: 1rem;
			--error-color: rgb(247, 60, 60);
			width: 70vw;
            position:relative;
            left:50%;
            transform: translatex(-50%);
			box-sizing: border-box;
			border: var(--error-color) 2px solid;
			background-color: rgb(229, 115, 115);
			border-radius: 0.4rem;

			grid-template-columns: 3rem auto;
			grid-template-rows: auto;
		}
		#qMQEbc-container > div:nth-child(1) {
			padding: 0.3rem;
			background-color: var(--error-color);
			color: white;
			display: flex;
			justify-content: center;
			flex-grow: 1;
		}
		#qMQEbc-container > div:nth-child(1) svg {
			width: 70%;
		}

		#qMQEbc-container > div:nth-child(2) {
			align-self: center;
			padding: 0.8rem 1rem;
			color: white;
		}
	</style>

                            <div class="content-wrapper">
                    
    
     
                                <div class="page-content">

                                ${data.content}
                                </div>
                            </div>
                        </main>
             
            
            <style>
    
     #alert-bar{
     width:100%;
     height: 2rem;
     background-color:Red;
     }
    
    body {
        margin: 0;
        padding: 0;
        font-family: "Open Sans";
        font-size: 14px;
        font-weight: 400;
        overflow-x: hidden;
     }
 
    .sidebar-menu-icons {
         place-self: center;
         margin: 0 1rem;
    
        height: 2rem;
    }
    .sidebar-menu-icons + div {
        display: flex;
        justify-self: left;
        align-items: center;
    }
    
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 20px;
    }
    h3 {
        font-size: 18px;
    }
    .u-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    
    
    .l-sidebar {
    height:100%;
        width: 20vw;
        position: fixed;
        z-index: 10;
        left: 0;
        border-right: 2px solid black;
        top: 0;
        bottom: 0;
        background: hsl(37, 100%, 70%);
    
    }
    .l-sidebar .logo {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: hsl(37, 100%, 20%);;
    }
    
    .l-sidebar__content {
        position: relative;
    }
    
    .nav-menu > ul {
        display: flex;
        flex-direction: column;
    }
    
    .nav-menu > ul:nth-child(1){
        margin-top: 1rem;
    }
    .nav-menu > ul .nav-menu__item__inner {
         box-sizing: border-box;
        margin-bottom: .5rem ;
        margin-right: .2rem ;
         margin-left: .2rem ;
        display: flex;
        flex-direction: column;
        background-color:hsl(37, 100%, 45%) ;
        border-radius: 1rem;
 
 
        min-height: 50px;
        place-items:left;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      
    }

   

.nav-menu__item__inner_main{
text-decoration:none;
        background-color:hsl(37, 100%, 45%) ;
 
display:flex;
height:4rem;

}
     

    
    .nav-menu__item__inner_main:hover   {
        filter: brightness(90%)
     }
 

 .nav-menu__item.is-active .nav-menu__item__inner-submenu {
    display:flex;
     }
    

    .nav-menu__item__inner > .nav-menu__item__inner-submenu{
    display: none;
    flex-direction: column;
 
    color:white;
     width: 100%
    
    }

     
        
    .nav-menu__item__inner-submenu > div:last-child{
     border-bottom: none;
    
    }

    .nav-menu__item__inner-submenu > div{
    padding: .8rem;
    border-bottom: 1px solid white;
      background:hsl(37, 100%, 35%) ;

    
    }


    .nav-menu__item__inner-submenu > div:hover{

        filter:brightness(90%)
        }
    
    .nav-menu > ul .nav-menu__item.is-active .nav-menu__item__inner {
         border: 3px solid white;

     }
    
 
    
    
    

    
    
     .nav-menu > ul .nav-menu__item svg {
        flex: 0 0 70px;
        font-size: 16px;
        font-weight: normal;
        text-align: center;
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
    }
    .nav-menu > ul .nav-menu__item .nav-menu-item__expand {
        position: relative;
        left: 100px;
        padding-right: 20px;
        color: #fff;
        margin-left: auto;
        -webkit-transition: left 1s ease-in-out;
        -moz-transition: left 1s ease-in-out;
        -ms-transition: left 1s ease-in-out;
        -o-transition: left 1s ease-in-out;
        transition: left 1s ease-in-out;
    }
    .sidebar-is-expanded .nav-menu > ul .nav-menu__item .nav-menu-item__expand {
        left: 0px;
    }
    .nav-menu > ul .nav-menu__item .nav-menu-item__title {
        padding-right: 10px;
        color: #fff;
    
    }
    .nav-menu > ul .nav-menu__item .nav-menu-item__title span {
        font-weight: 400;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .nav-menu > ul .nav-menu__item .nav-menu__submenu {
        background-color: #051835;
        padding: 15px;
        font-size: 12px;
        display: none;
    }
    .nav-menu > ul .nav-menu__item .nav-menu__submenu li {
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid;
        border-color: #072048;
        color: #5f9cfd;
    }
    .nav-menu > ul .nav-menu__item .nav-menu__submenu li:last-child {
        margin: 0;
        padding: 0;
        border: 0;
    }
    main.l-main {
        width: 80vw;
        height: 100%;
        padding: 0 0 0 20vw;
    
    }
    main.l-main .content-wrapper {
        position: relative;
        padding: 25px;
        height: 100%;
        overflow: auto;
    }
     
     
    main.l-main .page-title {
        font-weight: 400;
        margin-top: 1rem;
        border: 2px solid black;
         margin-bottom: 25px;
        text-align:center
    }
    .sidebar-is-expanded main.l-main {
        padding-left: 220px;
    }
    
            </style>


                </body>
            </html>
    `;
