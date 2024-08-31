const ErrorBox = require("./ErrorBox");
const Header = require("./Header");
const Footer = require("./Footer");

const SuccessBox = require("./SuccessBox");
const AdminBlogs = require("./AdminBlogs");


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
