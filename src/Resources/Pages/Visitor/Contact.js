const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

const Framework = require("#Framework");

const translation = {
	Turkish: {
    title:"iletişim - kanby.net",
    description:"kanby.net iletişim sayfası",
		key1: "İletişim / Sosyal Medya",
	},
	English: {
    title:"contact - kanby.net",
    description:"kanby.net contact page",
		key1: "Contact / Social Media",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
	    langCode:data.langCode,
			language: data.language,
			head: await Framework.render`
          <title>${he.encode(translation[data.language].title)}</title>
          <meta name="description" content="${he.encode(translation[data.language].description)}">
	        <meta name="robots" content="index,follow">
									
        	<link rel="alternate" hreflang="tr" href="https://kanby.net/Turkish/contact/" >
		<link rel="alternate" hreflang="en" href="https://kanby.net/English/contact/" >
		<link rel="alternate" href="https://kanby.net/English/contact/" hreflang="x-default" />
			`,

			content: await Framework.render
      `

      <div class="container-d457">
  
  <p class="title-d457">Contact Options / Social Presence<p>
  
  
  <div class="content-d457">
    
    <a target="_blank" href="https://wa.me/905333083423">
    
    <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.freepik.com/512/3536/3536445.png" />
      <p>+90 533 308 34 23<p>
      

    </div>
    </a>
     <a target="_blank" >
    <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" />
      <p>example@user.com<p>
      

    </div>
     </a>
      <a > <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.freepik.com/512/12942/12942327.png" />
      <p>Not Available yet, Soon...<p>
      

    </div></a> 

      <a target="_blank" href="https://www.instagram.com/_emrekanbay_"><div  class="element-d457">
      
      <img class="image-d457" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />
      <p>@_emrekanbay_<p>
     
    </div> </a>
  
    <a target="_blank" href="https://github.com/EmreKanbay">
      
               <div class="element-d457">
      
      <img  class="image-d457" src="https://static-00.iconduck.com/assets.00/github-icon-512x489-i96zunkj.png" />
      <p>@EmreKanbay<p>
      

    </div> 
    </a>

        <a target="_blank" href="https://x.com/_EmreKanbay_">
      
               <div class="element-d457">
      
      <img  class="image-d457" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.png" />
      <p>@_EmreKanbay_<p>
      

    </div> 
    </a>
    
      
      
    
  
    
    
    
    
    
  </div>
  
  
  
</div>

<style>

 

.container-d457{
  font-family: sans-serif;
  width:100%;
  height: max-content;
  display:flex;
  flex-direction:column;
  align-items:center;
  background:hsl(0,0%,40%, 0.4);
  padding:0 0 2rem 0;

}

@supports (-webkit-text-stroke: 1px black) {
  .title-d457 {
    -webkit-text-stroke: 1.5px black;
    -webkit-text-fill-color: white;
  }
}
.title-d457{
  color:white;
  margin-bottom: .5rem;
  font-size:3rem;
  font-width:400;
  
}

.content-d457{
  gap: 1rem;
  display:flex;  
  flex-wrap:wrap;
  justify-content:center;
  max-width: 80%;
}

.image-d457{
  
  height:100px
}

.element-d457{
   
   display:flex;
  align-items:center;
  gap:.5rem;
  background:white;
  border-radius:8rem 1rem 1rem 8rem;
  width: max-content;
  filter: drop-shadow(10px 10px 2px hsl(0, 0%, 10%, .4));
  transition: linear .2s filter;
 }

.element-d457:hover{
  filter: drop-shadow(0 0 0 hsl(0, 0%, 10%, .4));
  
  
}



</style>
      `,
		}),
};
