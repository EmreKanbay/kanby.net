const Resources = require("#Resources")
const Index = require("#Index")
const sha256 = require("js-sha256")


 const admin = Index.express.Router()

admin.get("/", (req,res) => {res.redirect("/")})

console.log(Resources)


admin.get("/login", (req,res) => {


    
    
    res.send(Resources.LoginPage())


})



admin.post("/login", Index.upload.none() ,async (req, res) => {

    
var record;
console.log(record)

// res.redirect("/")

try{
    record = await Index.pool.query(`SELECT login_name, password_hash FROM "users" WHERE login_name='${req.body["login_name"]}'`)
}catch{

    res.statusCode = 500
    res.statusMessage = "Server Error"
    res.send()
}

try {
    
if(record.rows.length == 0){
    res.statusCode = 404
    res.statusMessage = "User Not Found"
    res.send()
}else if(record.rows.length == 1){

    if(record.rows[0]["password_hash"] == sha256(req.body["login_password"])){
        res.statusCode = 200
        res.statusMessage = "Password Is Accurate"
        res.send()
    }else{
        res.statusCode = 401
        res.statusMessage = "Password Is Inaccurate"
        res.send()
    }
}else{
    res.statusCode = 500
    res.statusMessage = "Server Error"
    res.send()
}
} catch (error) {
    res.statusCode = 500
    res.statusMessage = "Server Error"
    res.send()
}

 


})




admin.get("/:id", (req, res) => {

    console.log(req.params.id)
res.send(UserPage)
})









module.exports = admin