const mongoose= require("mongoose")

mongoose.connect("mongodb+srv://kenil10:kenil10@cluster0.anq6a.mongodb.net/myDb?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully")
}).catch(()=>{
    console.log("db not connected")
})