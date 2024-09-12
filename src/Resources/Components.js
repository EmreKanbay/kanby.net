const ErrorBox = require("./Components/ErrorBox");
const Header = require("./Components/Header");
const Footer = require("./Components/Footer");

const SuccessBox = require("./Components/SuccessBox");
const AdminBlogs = require("./Components/AdminBlogs");

module.exports = {
	visitor: {
		Header,
		Footer,
		ErrorBox,
		SuccessBox,
	},
	admin: {
		AdminBlogs,
	},
};
