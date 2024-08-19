let ejs = require('ejs');
 
 module.exports = (description) => { return ejs.render(`



<div>

<h1>Footer</h1>

<p><%= description %></p>

</div>

`, {description})}
