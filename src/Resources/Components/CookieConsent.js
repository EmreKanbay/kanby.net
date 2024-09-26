const Framework = require("#Framework");


const translation = {
    Turkish: {
      key1: "Bu site çerez kullanmaktadır",
      key2: "Kabul et",
      key3: "Daha fazla",

    },
    English: {
      key1: "This site uses cookies",
      key2: "Accept",
      key3: "More",

    },
  };


module.exports = {
  html: (data) => Framework.render/*html*/`

  <div id="cookie-consent-cont">
  <p>${translation[data.customData.language].key1}</p>
  <button id="grant-cookies">${translation[data.customData.language].key2}</button>
 
  <script>
  document.querySelector("#grant-cookies").addEventListener("click", async () => {


    const res = await fetch("/grant_cookie", {
      method: "POST",
      })

      if(res.ok){
        document.querySelector("#cookie-consent-cont").remove()
      }
  })
  
  
  </script>


	<style>

    #cookie-consent-cont{
    z-index:5;
    padding-left:1rem;
    border-top:2px solid hsl(90, 0%, 50%);
        position: fixed;
        width: 100%;
        bottom: 0;
        background:white;
        height: 3rem;
        display: grid;
        grid-template-rows: 3rem;
        grid-template-columns: 3fr 1fr  ;

    }
	</style>
  </div>

 
`};
