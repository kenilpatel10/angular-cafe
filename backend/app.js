const express = require("express");
const user= require("./routes/userRoute")
const category= require("./routes/categoryRoute")
const product= require("./routes/productRoute")
const bill =require('./routes/billRoute')
const order =require('./routes/orderRoute')
const table= require("./routes/tableRoute")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv =require("dotenv")
const cors = require("cors");


const app = express();
app.use(express.json())
app.use(cors());
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

const port = process.env.PORT || 4000;
dotenv.config({path: "./config.env"})
require("./db/connection")
app.get("/",(req,res)=>{
res.json("Your Port Is connected")
})
app.use(express.json())
app.use("/api/c1",order)
app.use("/api/c1",bill)
app.use("/api/c1",user)
app.use("/api/c1",category)
app.use("/api/c1",product)
app.use("/api/c1",table)
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`)
})

module.exports = app;