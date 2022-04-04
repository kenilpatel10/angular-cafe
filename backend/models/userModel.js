const mongoose = require("mongoose")
const bcrypt=require("bcryptjs")
const validator = require("validator");
const userSchema =new mongoose.Schema({


name:{
    type: String,
    required: [true, "please enter your name"],
},
email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email.."],
  },
  password: {
    type: String,
    required: [true, "please enter your name"],
    minlength: [8, "Password should have more than 8 characters"],
    select:false,
  },
  status:{
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },

})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  //jwt token
  userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  //compare password
  userSchema.methods.comparePassword= async function(enteredPassword){
      return await bcrypt.compare(enteredPassword,this.password)
  
  }
  
module.exports= mongoose.model("User", userSchema)