const Components = require("../Components");
const Layouts = require("../Layouts");

const html = (x, ...values) => {
	var rendered = "";
	for (let u = 0; u < x.length; u++) {
		rendered = rendered.concat(x[u]);
		if (u < x.length - 1) rendered = rendered.concat(values[u]);
	}
	return rendered;
};

// ${(()=> String(Components.visitor.ErrorBox("")))()}

module.exports = () =>
	Layouts.VisitorLayout(
		(head = html`
			<link
				rel="stylesheet"
				href="/assets/globals.css"
			/>
			<title>Login</title>
		`),
		(content = html`
			<div class="ge0yN5-container">
				<form class="ge0yN5-form">
					<h1>Admin Panel Login</h1>

					<p>Root Username</p>
					<input
						type="text"
						class="ge0yN5-username-input"
					/>
					<br />
					<p>Root Password</p>
					<input
						class="ge0yN5-password-input"
						type="password"
					/>
					<br />
					<input
						type="submit"
						value="Login"
					/>

					<div class="ge0yN5-login-error"></div>

					<div class="ge0yN5-loading loading"></div>
				</form>
			</div>

			<style>
				.ge0yN5-container {
					width: 100%;
					display: flex;
					justify-content: center;
				}

				.ge0yN5-warning-text {
					font-size: 1rem;
					color: crimson;
					text-align: center;
				}
				.ge0yN5-form {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: max-content;
					padding: 1rem;
					font-family: "Roboto" sans-serif;
				}

				.ge0yN5-form h1 {
					font-family: "Roboto", sans-serif;
				}

				.ge0yN5-form > p {
					margin-bottom: 0;
					font-family: "Roboto", sans-serif;
				}

				.ge0yN5-container [type="text"],
				.ge0yN5-container [type="password"] {
					padding: 1rem;

					border-radius: 0.5rem;
					border: 1px solid rgb(33, 33, 33, 0.7);
				}

				.ge0yN5-container [type="submit"] {
					cursor: pointer;
					padding: 0.7rem 1.5rem;
					border: none;
					background-color: black;
					color: white;
					border-radius: 0.5rem;
					width: 100%;
				}
			</style>

			<script>
				document.querySelector(".ge0yN5-form").addEventListener("submit", async e => {
					e.preventDefault();

					const formData = new FormData();
					formData.append("login_name", document.querySelector(".ge0yN5-username-input").value);
					formData.append("login_password", document.querySelector(".ge0yN5-password-input").value);
					try {
						document.querySelector(".ge0yN5-loading").classList.add("active");
						document.querySelector(".ge0yN5-login-error").innerHTML = "";

						const res = await fetch("/admin/login", {
							body: formData,
							method: "POST",
						});

						if (res.redirected) {
							window.location.replace(res.url);
						}

						if (res.status == 404) {
							try {
								fetch("/get-component/visitor/ErrorBox", {
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({ message: "User Not Found" }),
									method: "POST",
								})
									.then(e => e.text())
									.then(e => {
										document.querySelector(".ge0yN5-loading").classList.remove("active");
										document.querySelector(".ge0yN5-login-error").innerHTML = e;
									});
							} catch {}
						} else if (res.status == 401) {
							try {
								fetch("/get-component/visitor/ErrorBox", {
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({ message: "Password Is Inaccurate" }),
									method: "POST",
								})
									.then(e => e.text())
									.then(e => {
										document.querySelector(".ge0yN5-loading").classList.remove("active");
										document.querySelector(".ge0yN5-login-error").innerHTML = e;
									});
							} catch {}
						} else if (res.status == 500) {
							try {
								fetch("/get-component/visitor/ErrorBox", {
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({ message: "Internal Server Error" }),
									method: "POST",
								})
									.then(e => e.text())
									.then(e => {
										document.querySelector(".ge0yN5-loading").classList.remove("active");
										document.querySelector(".ge0yN5-login-error").innerHTML = e;
									});
							} catch {}
						} else if (!res.ok) {
							try {
								fetch("/get-component/visitor/ErrorBox", {
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({ message: "Unknown Error" }),
									method: "POST",
								})
									.then(e => e.text())
									.then(e => {
										document.querySelector(".ge0yN5-loading").classList.remove("active");
										document.querySelector(".ge0yN5-login-error").innerHTML = e;
									});
							} catch {}
						}

					} catch (error) {
						document.querySelector(".ge0yN5-loading").classList.remove("active");
						document.querySelector(".ge0yN5-login-error").innerHTML = \` <h1>Network Error</h1>\`;
					}
				});
			</script>
		`),
	);
