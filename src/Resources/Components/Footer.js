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

	html: ()=> construct`
	<footer class="K0e6gd-container">
		<div class="K0e6gd-sub-container">
			<div class="K0e6gd-heading">
				<p>Social Media</p>
				<ul>
					<li>
						<img
							src="/assets/github.svg"
							alt="" />
						<a
							target="_blank"
							href="https://github.com/EmreKanbay">
							Github
						</a>
					</li>
					<li>
						<img
							src="/assets/twitter.svg"
							alt="" />
						<a
							target="_blank"
							href="https://x.com/_EmreKanbay_">
							Twitter / X
						</a>
					</li>
					<li>
						<img
							src="/assets/linkedin.svg"
							alt="" />
						<a
							target="_blank"
							href="https://www.linkedin.com/in/EmreKanbay/">
							LinkedIn
						</a>
					</li>
					<li>
						<img
							src="/assets/codepen.svg"
							alt="" />
						<a
							target="_blank"
							href="https://codepen.io/Emre-Kanbay">
							CodePen
						</a>
					</li>
					<li>
						<img
							src="/assets/tiktok.svg"
							alt="" />
						<a
							target="_blank"
							href="https://www.tiktok.com/@Emre_Kanbay">
							Tiktok
						</a>
					</li>
					<li>
						<img
							src="/assets/Instagram.svg"
							alt="" />
						<a
							target="_blank"
							href="https://www.instagram.com/_emrekanbay_">
							Instagram
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>About Us</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/company">
							Our Company
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/team">
							Meet the Team
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/careers">
							Careers
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/press">
							Press
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Services</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/consulting">
							Consulting
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/support">
							Support
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/training">
							Training
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/development">
							Development
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Products</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/product1">
							Product 1
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/product2">
							Product 2
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/product3">
							Product 3
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/product4">
							Product 4
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Support</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/faq">
							FAQ
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/contact">
							Contact Us
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/return-policy">
							Return Policy
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/shipping-info">
							Shipping Information
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Legal</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/terms">
							Terms of Service
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/privacy">
							Privacy Policy
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/cookies">
							Cookie Policy
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/disclaimer">
							Disclaimer
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Newsletter</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/subscribe">
							Subscribe
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/archive">
							Newsletter Archive
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/preferences">
							Preferences
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/unsubscribe">
							Unsubscribe
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Partners</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/partner1">
							Partner 1
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/partner2">
							Partner 2
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/partner3">
							Partner 3
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/partner4">
							Partner 4
						</a>
					</li>
				</ul>
			</div>

			<div class="K0e6gd-heading">
				<p>Resources</p>
				<ul>
					<li>
						<a
							target="_blank"
							href="/blog">
							Blog
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/guides">
							Guides
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/case-studies">
							Case Studies
						</a>
					</li>
					<li>
						<a
							target="_blank"
							href="/whitepapers">
							Whitepapers
						</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>

	<style>
		.K0e6gd-container {
			width: 100%;
			display: flex;
			height: min-content;
			justify-content: center;
			position: relative;
		}

		.K0e6gd-container::before {
			container-type: inline-size;

			content: "";
			position: absolute;
			width: 100%;
			z-index: -1;
			height: 100%;

			background-image: url("/assets/footer_background.svg");
			background-repeat: no-repeat;
			transform: rotate(180deg);
			filter: brightness(80%);

			background-size: cover;
			background-position: bottom;
		}

		.K0e6gd-sub-container {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			max-width: max-content;
		}

		.K0e6gd-heading {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: start;
			flex-grow: 1;
			margin: 2rem;
		}

		.K0e6gd-heading > p {
			font-family: "Roboto", sans-serif;
			margin: 0;
			font-size: 1.3rem;
			color: white;
			font-weight: 400;
			font-style: normal;
		}

		.K0e6gd-heading > ul > li > img {
			width: 1.5rem;
		}

		.K0e6gd-heading > ul > li::after {
			content: "";
			width: 1.3rem;
			height: 1.3rem;
			background-image: url("/assets/external-link.svg");
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			opacity: 0.7;
			filter: invert(1);
		}

		.K0e6gd-heading > ul > li > a {
			color: white;
		}
		.K0e6gd-heading > ul > li {
			display: flex;
			align-items: center;
			padding-left: 0;
			gap: 0.4rem;
			margin: 1rem 0;
			font-size: 1rem;
			font-family: "Roboto", sans-serif;
			font-weight: 400;
			font-style: normal;
		}
	</style>
`, js: () => construct``

}
