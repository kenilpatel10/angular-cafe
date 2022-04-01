const express = require("express");
const user= require("./routes/userRoute")
const category= require("./routes/categoryRoute")
const product= require("./routes/productRoute")
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

const port = 4000;

require("./db/connection")

app.use(express.json())

app.use("/api/c1",user)
app.use("/api/c1",category)
app.use("/api/c1",product)
app.use("/api/c1",table)
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`)
})

module.exports = app;