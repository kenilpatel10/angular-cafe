const mongoose= require("mongoose")

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully")
}).catch(()=>{
    console.log("db not connected")
})