const Components = require("../Components/Components");


const html = async (x, ...values) => {
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


module.exports = async (head, content) => html`
<!doctype html>
		<html lang="en">
			<head>
				<title>Admin Panel</title>
				${await head}
			</head>

			<body>
           
					<div class="l-sidebar">
						<div class="logo">
							<div class="logo__txt">CMS</div>
						</div>
						<div class="l-sidebar__content">
							<nav class="nav-menu js-menu">
								<ul class="u-list">
										<li
  										class="nav-menu__item  homePage"
 										>
										<div class="nav-menu__item__inner">
											<img
												style="filter:invert(1)"
												src="https://cdn.icon-icons.com/icons2/3522/PNG/512/dashboard_icon_221153.png"
												class="sidebar-menu-icons" />
											<div class="nav-menu-item__title"><span>Dashboard</span>
											  
                        
											</div>
										</div>
									</li>
									<li
  										class="nav-menu__item  homePage"
 										>
										<div class="nav-menu__item__inner">
											<img
												style="filter:invert(1)"
												src="https://cdn-icons-png.flaticon.com/512/4922/4922073.png"
												class="sidebar-menu-icons" />
											<div class="nav-menu-item__title"><span>Blog</span>
											  
                        
											</div>
										</div>
									</li>

									<li
 
 										class="nav-menu__item  is-active"
 										title="Flights">
										<div class="nav-menu__item__inner">
											<img
												style="filter:invert(1)"
												src="https://www.iconpacks.net/icons/1/free-video-icon-818-thumb.png"
												class="sidebar-menu-icons" />
											<div class="nav-menu-item__title"><span>Projects</span></div>
										</div>
									</li>

									<li
 
 										class="nav-menu__item"
 										title="Gifts">
										<div class="nav-menu__item__inner">
											<img
												style="filter:invert(1)"
												src="https://cdn.iconscout.com/icon/free/png-256/free-news-icon-download-in-svg-png-gif-file-formats--events-newspaper-press-media-article-business-and-marketing-pack-icons-1410317.png"
												class="sidebar-menu-icons" />
											<div class="nav-menu-item__title"><span>Help</span></div>
										</div>
									</li>
								</ul>
							</nav>
						</div>
					</div>

					<main class="l-main">
						<div class="content-wrapper content-wrapper--with-bg">
							<div
								style="position:fixed"
								class="MGqm9l-loading loading-block"></div>

							<h1 class="page-title">Page Title</h1>

							<div class="page-content">
							${await content}
							</div>
						</div>
					</main>
 		
        
        <style>

 

body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
 }

 .logo__txt{
    color:white;
    font-size:2rem;
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
    width: 20vw;
    position: absolute;
    z-index: 10;
    left: 0;
    border-right: 2px solid black;
    top: 0;
    bottom: 0;
    background: hsl(37, 100%, 70%);

}
.l-sidebar .logo {
    width: 100%;
    height: 70px;
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
    display: grid;
    background-color:hsl(37, 100%, 45%) ;
    border-radius: 1rem;
    grid-template-columns: min-content auto;
    grid-template-areas: "a b";
    min-height: 50px;
    place-items:left;
    position: relative;
    cursor: pointer;
  
}


.nav-menu > ul .nav-menu__item.is-active .nav-menu__item__inner {
     border: 3px solid white;
     pointer-events: none;
}





 


.nav-menu > ul .nav-menu__item:not(.is-active):hover .nav-menu__item__inner {
    background-color: #241571;
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
    margin-top: 0;
    margin-bottom: 25px;
}
.sidebar-is-expanded main.l-main {
    padding-left: 220px;
}

        </style>
        
            </body>
		</html>
`;
