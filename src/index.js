const express = require('express')
var cors = require('cors')
const multer = require("multer")
const pg = require("pg")
require('dotenv').config()
const path = require('path');



//Initalize libraries
const { Pool } = pg
const upload = multer()


//configure libraries
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DB
 })



//Global variables
module.exports = {
    
    __rootDir:__dirname,
    pool,
    upload,
    express

}



// import middlewares
const root = express()
const admin = require("./Routes/admin")


 





root.use(cors())

root.use("/assets",express.static(path.join(__dirname, 'Assets')))
root.use("/admin", admin)

root.get("/", (req, res) => {res.send( "dadas")})


root.listen(3000, ()=> {console.log("Server Connected")})
 
