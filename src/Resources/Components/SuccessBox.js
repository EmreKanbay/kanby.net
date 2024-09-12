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

module.exports = {
	html: data => construct`
	<div id="qMQEbc-container">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:svg="http://www.w3.org/2000/svg"
				viewBox="0 0 21.9685 22.312275"
				version="1.1"
				id="svg5">
				<defs id="defs2" />
				<g
					id="layer1"
					transform="translate(-62.65991,-96.472904)">
					<path
						id="path111"
						style="fill:#ffffff;fill-opacity:1;stroke-width:0.264583"
						d="m 94.471417,76.378654 a 10.973509,11.166741 0 0 0 -8.531365,10.88667 10.973509,11.166741 0 0 0 10.973176,11.166834 10.973509,11.166741 0 0 0 10.973732,-11.16673 10.973509,11.166741 0 0 0 -10.973683,-11.166713 10.973509,11.166741 0 0 0 -2.44186,0.279939 z m 6.752213,5.013367 1.73149,0.999695 -6.331408,10.966809 -0.03894,-0.02247 -3.8e-4,6.24e-4 -5.815649,-3.357455 1.000075,-1.732114 4.122599,2.380352 z"
						transform="rotate(13.617148)" />
				</g>
			</svg>
		</div>
		<div>${message}</div>
	</div>

	<style>
		#qMQEbc-container {
			--success-color: rgb(67, 138, 20);
			width: 100%;

			box-sizing: border-box;
			border: var(--success-color) 2px solid;
			background-color: #ace6b2;
			border-radius: 0.4rem;

			grid-template-columns: 3rem auto;
			grid-template-rows: auto;
			display: grid;
		}
		#qMQEbc-container > div:nth-child(1) {
			padding: 0.3rem;
			background-color: var(--success-color);
			color: white;
			display: flex;
			justify-content: center;
			flex-grow: 1;
		}
		#qMQEbc-container > div:nth-child(1) svg {
			width: 65%;
		}

		#qMQEbc-container > div:nth-child(2) {
			align-self: center;
			padding: 0.8rem 1rem;
			color: #164b18;
		}
	</style>
`,
	js: data => construct``,
};
