const mongoose = require("mongoose");

const tableSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true
    }
})



module.exports= mongoose.model("Table", tableSchema)