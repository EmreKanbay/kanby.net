require("dotenv").config();

const cdn = process.env.CDN_DOMAIN;

const Framework = require("#Framework");

module.exports = {
	html: data => Framework.render`
	    
    <!-- Enter Text Below  -->
<span id="marquee-text">${data.text}</span>
<!--  Enter Text Above   -->


<!-- Do Not Play With Following HTML  -->
<div id="marquee-cont">
    <span id="marquee-cont-part-one"></span>
    <span id="marquee-cont-part-two"></span>
</div>
<!--  Do Not Play With Preceeding HTML   -->

<style>
    body{
  margin:0;
  overflow: hidden;
}

#marquee-cont-part-one{
    width: 100%;
    min-width: max-content;
    display: inline-flex;
    font-size: 1rem;

    justify-content: space-around;

    position: relative;
    transform: translateX(0);
           animation-duration: ${data.time}s;
box-sizing: border-box;

    animation-name:first;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
}

@keyframes first {
  from {transform: translateX(0);}
  to {transform: translateX(-100%);}
}
#marquee-cont-part-two{
    width: 100%;
    transform: translateX(0);
    font-size: 1rem;

box-sizing: border-box;
    min-width: max-content;

    display: inline-flex;
    justify-content: space-around;

    position: relative;
           animation-duration: ${data.time}s;
    animation-name:second;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
}

@keyframes second {
    from {transform: translateX(0);}
    to {transform: translateX(-100%);}
}

#marquee-cont{
  margin-top:.5rem;
  width:100%;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0;

  
}



.marquee{
 
   width:max-content;
  height:30px;
 white-space: pre; 
 display:flex;
 margin: 0 1rem;
 align-items:center;
}

</style>
<script>

window.addEventListener('resize', function(event) {
  document.querySelector("#marquee-text").style.display ="initial"

    document.querySelector("#marquee-cont-part-one").innerHTML = ""
     document.querySelector("#marquee-cont-part-two").innerHTML = ""

    var textWidth = document.querySelector("#marquee-text").offsetWidth;
  var contWidth = document.querySelector("#marquee-cont").offsetWidth;

  const marquee_count = Number((contWidth-(contWidth%textWidth))/textWidth)
  const marquee_text = document.querySelector("#marquee-text").innerHTML
  document.querySelector("#marquee-text").style.display ="none"
   
 
  for(let i = 0; i < marquee_count; i++) {
    var element = document.createElement("span")
    element.classList.add("marquee")
    element.innerHTML = marquee_text

    var element2 = document.createElement("span")
    element2.classList.add("marquee")
    element2.innerHTML = marquee_text
     document.querySelector("#marquee-cont-part-one").append(element)
     document.querySelector("#marquee-cont-part-two").append(element2)
  }
}, true);
  var textWidth = document.querySelector("#marquee-text").offsetWidth;
  var contWidth = document.querySelector("#marquee-cont").offsetWidth;

  const marquee_count = Number((contWidth-(contWidth%textWidth))/textWidth)
  const marquee_text = document.querySelector("#marquee-text").innerHTML
  document.querySelector("#marquee-text").style.display ="none"
    
 
  for(let i = 0; i < marquee_count; i++) {
    var element = document.createElement("span")
    element.classList.add("marquee")
    element.innerHTML = marquee_text

    var element2 = document.createElement("span")
    element2.classList.add("marquee")
    element2.innerHTML = marquee_text
     document.querySelector("#marquee-cont-part-one").append(element)
     document.querySelector("#marquee-cont-part-two").append(element2)
  }
</script>
`,
	js: data => Framework.render``,
};
