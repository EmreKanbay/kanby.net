let ejs = require('ejs');
 


 module.exports = (description)=> { return ejs.render(
    `<div class="header-container">

    <h1>HEADER</h1>
    
    <button onclick="ale()"> test </button>
    
    <p><%= description %></p>
    
</div>

 
`, {description})}