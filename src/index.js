const express = require('express')
require('dotenv').config()
const path = require('path');


const root = express()


root.use("/assets",express.static(path.join(__dirname, 'Assets')))


root.get("/", (req, res) => {res.send( "Hello World")})


root.listen(3000, ()=> {console.log("Server Connected")})
 
