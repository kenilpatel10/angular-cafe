// const sendToken =(user, statusCode,res)=>{
//     const token = user.getJWTToken();

//     //options for cookies...

//     const options={
//         expires: new Date(Date.now() + process.env.COOKIE_EXPIRE *24*60*60*1000),
//         httpOnly: true,
//     }

//     res.status(statusCode).cookie("token", token, options).json({
//         success:true,
//         user,
//         token,
//     });
// };

// module.exports =sendToken;

const jwt = require('jsonwebtoken')


// JWT Token Validation
const generateToken = (id)=> {
    return jwt.sign({id},"DGSGFHfdhdfhrtywr5646", {
        expiresIn:'300d'

    })
}

module.exports = generateToken;