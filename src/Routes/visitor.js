const Index = require("#Index");

const visitor = Index.express.Router();



visitor.get("/" , (req, res, next) => {


    res.send("1234")
})



module.exports = visitor;
