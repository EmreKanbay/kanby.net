const Index = require("#Index");

const Pages = require("#Pages")
 
const visitor = Index.express.Router();




visitor.get("/" , async (req, res, next) => {

     res.redirect(new URL(`/Turkish`, req.protocol + "://" + req.get("host")));
 

     // res.send(await Pages.LandingPage.html({}))
})



visitor.get("/Turkish", async (req, res) => {


	res.send(await Pages.LandingPage.html())
})





module.exports = visitor;
