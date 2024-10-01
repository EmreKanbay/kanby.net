const Layouts = require("#Layouts");
const Framework = require("#Framework");

module.exports = {
  html: async (data) =>
    await Layouts.VisitorLayout({
		customData: data.customData,


      head: await Framework.render`
 
	<title>Login</title>
	<meta name="robots" content="noindex,nofollow">

`,
      content: await Framework.render`
<div class="ge0yN5-container">
	<form class="ge0yN5-form">
		<h1>Admin Panel Login</h1>

		<p>Root Username</p>
		<input
			type="text"
			class="ge0yN5-username-input" />
		<br />
		<p>Root Password</p>
		<input
			class="ge0yN5-password-input"
			type="password" />
		<br />
		<input
			type="submit"
			value="Login" />

		<div class="ge0yN5-login-error"></div>

		<div class="ge0yN5-loading loading-inline"></div>
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

if (window.navigator.onLine) {

const formData = new FormData();
		formData.append("login_name", document.querySelector(".ge0yN5-username-input").value);
		formData.append("login_password", document.querySelector(".ge0yN5-password-input").value);
		try {
			document.querySelector(".ge0yN5-loading").classList.add("active");
			document.querySelector(".ge0yN5-login-error").innerHTML = "";

			const res = await fetch("/admin/login/", {
				body: formData,
				method: "POST",
				credentials: 'same-origin'
			});

			if (res.redirected) {
				window.location.replace(res.url);
			}

				else if (!res.ok) {
					document.querySelector(".ge0yN5-loading").classList.remove("active");
					document.querySelector(".ge0yN5-login-error").innerHTML =await res.text();

			}
		} catch (error) {
			document.querySelector(".ge0yN5-loading").classList.remove("active");
			document.querySelector(".ge0yN5-login-error").innerHTML = "Unknown Error";
		}}

		
else{document.querySelector(".ge0yN5-login-error").innerHTML = "No Internet Connection";}
		
	});

</script>

`,
    }),
};
