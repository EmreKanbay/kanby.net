const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

module.exports = message => html`
	<div id="qMQEbc-container">
		<div>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"
				></path>
			</svg>
		</div>
		<div>${message}</div>
	</div>

	<style>
		#qMQEbc-container {
			display:grid; /*default is grid*/
			margin-top:1rem;
 			--error-color: rgb(247, 60, 60);
			width: 100%;

			box-sizing: border-box;
			border: var(--error-color) 2px solid;
			background-color: rgb(229, 115, 115);
			border-radius: 0.4rem;

			grid-template-columns: 3rem auto;
			grid-template-rows: auto;
		}
		#qMQEbc-container > div:nth-child(1) {
			padding: 0.3rem;
			background-color: var(--error-color);
			color: white;
			display: flex;
			justify-content: center;
			flex-grow: 1;
		}
		#qMQEbc-container > div:nth-child(1) svg {
			width: 70%;
		}

		#qMQEbc-container > div:nth-child(2) {
			align-self: center;
			padding: 0.8rem 1rem;
			color: white;
		}
	</style>
`;
