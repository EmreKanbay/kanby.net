const Index = require("#Index");

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
	html: (data) => construct`
		<div class="A5ueMP-cotnainer">
 

			<h1>Blogs</h1>

			<div class="A5ueMP-cotnainer-top">
				<select
					id="A5ueMP-cotnainer-top-select"
					onchange=""
					name="cars"
					id="cars">
					${async () => {
						return String(
							(await Index.pool.query(`SELECT * FROM "variables"`)).rows[0].value.map(t => {
								return `
						<option value="${t}">${t}</option>
					`;
							}),
						).replaceAll(",", "\n");
					}}
				</select>

				<input type="text" />

				<button
					onclick=""
					class="A5ueMP-cotnainer-top-add-button">
					add
				</button>
			</div>
			<div class="A5ueMP-cotnainer-bottom">
				<div></div>
			</div>
		</div>

		<style>
			.A5ueMP-cotnainer > h1 {
				grid-area: c;
				place-self: center;
				font-family: sans-serif;
				text-decoration: underline;
				margin-bottom: 0;
			}
			.A5ueMP-cotnainer {
				display: grid;
				grid-template-areas: "c" "a" "b";
				width: 100%;
				height: 100%;
				grid-template-columns: 100%;
				grid-template-rows: 0.5fr 1fr 7fr;
			}

			.A5ueMP-cotnainer-top {
				grid-area: a;
				display: grid;
				grid-template-columns: 1fr 4fr 1fr;
				grid-template-rows: auto;

				grid-template-areas: "a b c";
			}

			.A5ueMP-cotnainer-top button {
				cursor: pointer;
				place-self: center;
				border-radius: 0.4rem;
				padding: 1rem .4rem;
				width: 80%;
				background-color: forestgreen;
				border: none;
				color: white;
				font-size: 1.2rem;
				font-weight: 400;
				gap: 0.2rem;
				display: flex;
				justify-content: center;
				align-items: center;

				grid-area: c;
			}

			.A5ueMP-cotnainer-top button:hover {
				filter: brightness(1.5);
			}

			.A5ueMP-cotnainer-top button:active {
				filter: brightness(1.7);
			}

			.A5ueMP-cotnainer-top button::before {
				content: "";
				background-repeat:no-repeat;

				background-image: url("../Assets/plus.svg?${Date.now()}");
				width: 1rem;
				height: 1rem;
				background-size: contain;
			}
			#A5ueMP-cotnainer-top-select {
				padding: 1rem 0.4rem;
				place-self: center;
				width: max-content;
				border-radius: 0.4rem;

				grid-area: a;
			}
			.A5ueMP-cotnainer-top input {
				place-self: center;
				border-radius: 0.4rem;
				width: 80%;
				padding: 1rem;
				grid-area: b;
			}

			.A5ueMP-cotnainer-bottom {
				grid-area: b;
			}
		</style>
	`,
	js: (data) => construct`
document.querySelector("#A5ueMP-cotnainer-top-select").addEventListener("change", (e)=> {
	alert(e.target.value)

	})
`
};



