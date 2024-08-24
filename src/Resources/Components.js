const  ErrorBox = require("./Components/ErrorBox");
const  Header = require("./Components/Header");
const  Footer  = require("./Components/Footer");

const SuccessBox = require("./Components/SuccessBox");



module.exports = {
	"visitor": {
		Header,
		Footer,
	   ErrorBox,
	   SuccessBox,
	},
	"admin":{
		
	}
  
};