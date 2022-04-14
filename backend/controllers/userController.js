const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const User = require("../models/userModel");
const bcrypt= require("bcryptjs")
const generateToken = require("../utils/jwtToken");

exports.registerUser =catchAsyncError(async(req,res,next)=>{
   
 
     const { name, email, password}= req.body;
     const userExist= await User.findOne({email});
 if(userExist){
    res.status(400).json({
        message:"User Already Exists"
    })
   
 }
     const user =await User.create({
         name,
         email,
         password,
     })
     if (user) {
        res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          password:user.password,
          role:user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({
            message:"Invalid Data"
        })
        
      }
    });
   

 
    exports.loginUser = catchAsyncError(async(req,res,next)=>{

        const {email,password} = req.body;
            if(!email || !password){
                return res.status(400).json({
                    message:"Please enter email and password"
                })
            }
        const user =await User.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({
                message:"Invalid Email or Password"
            })
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return res.status(401).json({
                message:"Invalid Email or Password"
            })
        }
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            password:user.password,
            role:user.role,
            status:user.status,
            token: generateToken(user._id),
          });
    })
 
 exports.logout= catchAsyncError(async(req,res,next)=>{
 
 res.cookie("token", null, {
     expires: new Date(Date.now()),
     httpOnly: true,
 })
     res.status(200).json({
         success:true,
         message:"logout"
     })
 
 })
 // get single user detials (admin)
 exports.getOneUserDetails = catchAsyncError(async(req,res,next)=>{
 
     // const user =await  User.findById(req.user.id);
     const user = await User.findOne({_id: req.params.id})
   
     res.status(200).json({
         success: true,
         user,
     })
 })
 // get all user detials (admin)
 exports.getAllUserDetails = catchAsyncError(async(req,res,next)=>{
 
     const user = await User.find()
   setTimeout(() => {
    res.status(200).json({
        success: true,
        user,
        
    })  
   }, 1000);
 
  
 })
 exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
 
     const user =await  User.findById(req.user.id);
    
   
     res.status(200).json({
         success: true,
         user,
     })
 })
 //update password...
 
 
 exports.updatePassword = catchAsyncError(async(req,res,next)=>{
 
     const user = await  User.findById(req.user.id).select("+password");
 
     const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
 
     if(!isPasswordMatched){
         return next(new ErrorHandler("old password is incorrect", 400));
     }
    
   if(req.body.newPassword !== req.body.confirmPassword){
       return next(new ErrorHandler("password does not match", 400))
   }
 
   user.password= req.body.newPassword;
 
   await user.save();
 
     sendToken(user, 200, res)
 })


 //update userprofile
 exports.updateProfile = catchAsyncError(async(req,res,next)=>{
 
     const newUser ={
         name: req.body.name,
         email: req.body.email,
  
         
     }
 
         if (req.body.avatar !== "/Profile.png") {
             const user = await User.findById(req.user.id);
         
             const imageId = user.avatar.public_id;
         
             await cloudinary.v2.uploader.destroy(imageId);
         
             const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
               folder: "avatars",
               width: 150,
               crop: "scale",
             });
         
             newUser.avatar = {
               public_id: myCloud.public_id,
               url: myCloud.secure_url,
             };
           }
     const user = await User.findByIdAndUpdate(req.user.id, newUser, {
         new:true,
         runvalidators:true,
         useFindAndModify:false,
     })
     res.status(200).json({
             success:true,
     })
 })
 //update user role
 exports.updateUser = catchAsyncError(async(req,res,next)=>{
 
     const newUser ={
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         role: req.body.role,
         status: req.body.status
         
     }
     const user = await User.findByIdAndUpdate(req.params.id, newUser, {
         new:true,
         runvalidators:true,
         useFindAndModify:false,
     })
     res.status(200).json({
             success:true,
     })
 })
 
 
 exports.deleteUser = catchAsyncError(async(req,res,next)=>{
 
    const user = await User.findById(req.params.id)
 
    if(!user){
        return next(new ErrorHandler(`user doen not exist with id: ${req.params.id}`))
   
     }
     await user.remove();
     res.status(200).json({
             success:true,
     })
 })
 