const ErrorBox = require("./Components/ErrorBox");
const Header = require("./Components/Header");
const Footer = require("./Components/Footer");

const SuccessBox = require("./Components/SuccessBox");
const Marquee = require("./Components/Marquee");
const CookieConsent = require("./Components/CookieConsent");

module.exports = {
  visitor: {
    Header,
    Footer,
    ErrorBox,
    SuccessBox,
    Marquee,
    CookieConsent
  },
  admin: {},
};
