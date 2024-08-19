const Components = require("#Components")
const Index = require("#Index")


const admin = Index.express.Router()

admin.get("/", (req,res) => {res.redirect("/")})




const LoginPage =Components.BoilerPlate(
    head=
    `<link rel="stylesheet" href="/assets/globals.css">
    <title>Login</title>`,
    
    body=`
    ${Components.Header(description="haederr")}
    ${Components.LoginPage}
    ${Components.Footer(description="aaaa")}`)


admin.get("/login", (req,res) => {res.send(LoginPage)})












module.exports = admin