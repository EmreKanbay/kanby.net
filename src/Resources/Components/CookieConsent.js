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
  html: (data) => Framework.render`

  <div id="cookie-consent-cont">
  <p>${translation[data.language].key1}</p>
  <button>${translation[data.language].key2}</button>
  <button>${translation[data.language].key3}...</button>
  </div>
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
        grid-template-columns: 3fr 1fr 1fr ;

    }
	</style>
`};
