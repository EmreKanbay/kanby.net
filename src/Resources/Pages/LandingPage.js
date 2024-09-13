const Layouts = require("#Layouts");

const construct = async (x, ...values) => {
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



const text = {

Turkish: {

	key1:"merhaba"

},

English: {

	key1:"hello"


}



}


module.exports = {
	html: async (data,script = this) =>
		await Layouts.VisitorLayout({
			head: await construct`
 
			<title>Kanby</title>
			`,

			content: await construct`

  
				<h2 style="text-align:center"><a href="/Turkish/blogs">Blogs</a><h2>
				<h2 style="text-align:center" ><a>Contents</a><h2>
				<h2 style="text-align:center" ><a>News</a><h2>



 			
			 

      `,
		})
};
