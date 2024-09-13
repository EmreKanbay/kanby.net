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
		key1:"Bloglar",
		key2:"İçerikler",
		key3:"Haberler",
	},
	English: {
		key1:"Blogs",
		key2:"Contents",
		key3:"News",
	}
 	}


module.exports = {
	html: async (data) =>
		await Layouts.VisitorLayout({

			language: data.language,
			head: await construct`
 
			<title>Kanby</title>
			`,

			content: await construct`

  
 				<h2 style="text-align:center"><a href="./blogs">${text[data.language].key1}</a></h2>
				<h2 style="text-align:center" ><a>${text[data.language].key2}</a></h2>
				<h2 style="text-align:center" ><a>${text[data.language].key3}</a></h2>



 			
			 

      `,
		})
};
