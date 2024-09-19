const Layouts = require("#Layouts");
const Index = require("#Index");
const he = require("he");

const Framework = require("#Framework");


const translation = {
	Turkish: {
		key1: "İletişim / Sosyal Medya",
	},
	English: {
		key1: "Contact / Social Media",
	},
};

module.exports = {
	html: async data =>
		await Layouts.VisitorLayout({
			language: data.language,
			head: await Framework.render`
 
			<title>Kanby | ${translation[data.language].key1}</title>
			`,

			content: await Framework.render`

<div class="container-d457">
  
  <p class="title-d457">${translation[data.language].key1}<p>
  
  
  <div class="content-d457">
    
    <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.freepik.com/512/3536/3536445.png" />
      <p>+90 555 555 55 55<p>
      

    </div>
    
     
    <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png" />
      <p>example@user.com<p>
      

    </div>
    
       <div class="element-d457">
      
      <img class="image-d457" src="https://cdn-icons-png.freepik.com/512/12942/12942327.png" />
      <p>@TestUser<p>
      

    </div> 
   
    
           <div class="element-d457">
      
      <img class="image-d457" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" />
      <p>@Example user<p>
      

    </div> 
  
    
               <div class="element-d457">
      
      <img  class="image-d457" src="https://static-00.iconduck.com/assets.00/github-icon-512x489-i96zunkj.png" />
      <p>@Example user<p>
      

    </div> 
    
    
                   <div class="element-d457">
      
      <img  class="image-d457" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.png" />
      <p>@Example user<p>
      

    </div> 
    
    
    
    
    
    
  </div>
  
  
  
</div>


<style>
.container-d457{
  
  width:100%;
  height: max-content;
  display:flex;
  flex-direction:column;
  align-items:center;
  background:hsl(0,0%,40%, 0.4);
  padding:0 0 2rem 0;

}

.title-d457{
  font-size:2rem;
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
}


</style>
			 

      `,
		}),
};
