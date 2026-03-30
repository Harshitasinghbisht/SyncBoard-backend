import User from "../models/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userRegister=async(req,res)=>{
//get data
//validate
//check if user already exist
//create user in database
//create a verification token   
//save token in database
//send token as email to user
//send a succes status to user
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }
   
try {
     const existingUser= await User.findOne({email});
 if(existingUser){
    return res.status(400).json({
        message:"user already exist"
    })
 }
 const user= await User.create({
        name,
        email,
        password
    })
    console.log(user)

    if(!user){
        return res.status(400).json({
            message:"user not register"
        })
    }

    const token=crypto.randomBytes(32).toString("hex");
    user.verificationToken=token;
    await user.save();

    //sending email to verify the token
    const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST, 
  port: process.env.MAILTRAP_PORT,
  secure:false,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

const mailOption={
   from: process.env.MAILTRAP_SENDEREMAIL,
    to:user.email,
    subject: "VERIFY YOUR EMAIL",
    text: `click on the below link for verification ${process.env.BASE_URL}/api/v1/user/verify/${token}`   
}

   await transport.sendMail(mailOption);

 res.status(201).json({
  message:"User register succesfully",
  success:true
 })
} catch (error) {
    res.status(400).json({
  message:"User not register ",
  error,  
  success:false
 })
}
  

};
const userVerify=async(req,res)=>{
  //implement the try ctach bolck for the code later

//get token from url
//validate
//find user on the basis on the token
//if not
//verify user true 
//  remove the token
//save the user details
//return responce

const {token}=req.params;
if(!token){
  return res.status(400).json({
    message:"Invalid token"
  })
}

  const user=await User.findOne({verificationToken:token})
  
if(!user){
  return res.status(400).json({
    message:"invalid token"
  })
}
user.isVerfied=true;
user.verificationToken=undefined;
await user.save();

res.status(201).json({
  message:"User verify succesfully",
  success:true
 })
}
  const userLogin=async(req,res)=>{
  const{email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({
      message:"all field required"
    })
  }
  try {
  const user= await User.findOne({email});
  if(!user){
      return res.status(400).json({
      message:"invalid email,password"
    })
  }
    const isMatched=await bcrypt.compare(password,user.password)
    if(!isMatched){
      return res.status(400).json({
      message:"invalid email,password"
    })
    }
    //isverified  validation check

  if(!user.isVerfied){
    return res.status(400).json({
      message:"Please verify your email first"
    })
    }
    // this token must be saved  due to this token the user is stayed login
    //if its expire the user have to login again
    //so we can save the token in the cokkies
    //we can not directly use cokkies so we need to install the package cookie-parser
  const token= jwt.sign({id:user._id },
      process.env.JWT_SECRET,
      {expiresIn:"24h"}
    )
    const cookieOption={
    httpOnly:true,
    secure:false,
    maxAge:24*60*60*1000  
    };
    res.cookie("token",token,cookieOption);

    res.status(200).json({
      success:true,
      message:"User login succesfully",
      token,
      user:{
        id:user._id,
        name:user.name,
        role:user.role
      }
    })

  }  catch (error) { 
    console.log(error.message)
    return res.status(500).json({
      message:"Login failed"
    })
  }
  }
const getMe=async(req,res)=>{
const user=await User.findById(req.user.id).select('-password')
try {
  if(!user){
     return res.status(400).json({
      message:"user not found",
      success:false
    })
  }
  res.status(200).json({
      success:true, 
      user
    })
} catch (error) {
  return res.status(500).json({
      message:"user not found",
      success:false
    })
}
}
const logout=async(req,res)=>{
  try {
    //we can also use some other alternative method to delete the token from cookies
    //res.cookies("token","",{ expire:new.Date(0)})
    //here Date(0) means 1970 date recent date is 2026 so it delete the token automatically by browser
    res.clearCookie("token",{
       httpOnly: true,
      secure: true,       // use false in localhost if not using HTTPS
      sameSite: "strict"
    })
    return res.status(200).json({
      message: "Logout successful",
      success: true
    });
  } catch (error) {
     return res.status(500).json({
      message:"logout failed",
      success:false
    })
  }
}
const forgetPassword=async(req,res)=>{
     const {email}=req.body;
  try {
    //get email
    //find user based on email
    //set reset token and reset expire  example date.now()+10*60*1000  =10 min
    //send email design url
    const user= await User.findOne({email})
    if(!user){
      return res.status(400).json({
        message:"User not found"
      })
    }

    const token=crypto.randomBytes(32).toString("hex");
    user.passwordResetToken=token;
    user.passwordResetExpire=Date.now()+10*60*1000;
    await user.save();

    //sending email for reset password
    const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST, 
  port: process.env.MAILTRAP_PORT,
  secure:false,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

const mailOption={
   from: process.env.MAILTRAP_SENDEREMAIL,
    to:user.email,
    subject: "RESET YOUR PASSWORD",
    text: `click on the below link for reset password ${process.env.BASE_URL}/api/v1/user/resetpassword/${token}`   
}

   await transport.sendMail(mailOption);

  res.status(201).json({
  success:true
 })

  } catch (error) {
     res.status(400).json({
     success:false,
     message:"Something went wrong. Please try again later."
 })
  }
}
const resetPassword=async(req,res)=>{
 
  try {
    //collect token from params
    //password from res.body
    //find user on basis on reset token and reset expires
    //set password
    //empty resettoken and reset expiry
    //save user
     const {token}=req.params;  //tis by user side coming from user url
     const {password}=req.body; // this is from the user side but coming from the form
   const user=await User.findOne({
    passwordResetToken:token,
    passwordResetExpire:{$gt:Date.now()}
   })
   console.log("token",token,"password",password)
   console.log("User",user)
   if(!user){
    return res.status(400).json({
     success:false,
     message:"User not found"
 })
   }
   user.password=password;
   console.log(password)
   user.passwordResetToken=undefined;
   user.passwordResetExpire=undefined;
   await user.save();
  
     res.status(201).json({
     success:true,
     message:"password reset successfully"
 })


  } catch (error) {
    res.status(400).json({
     success:false,
     message:"password reset failed"
 })
  }
}

export {userRegister,userVerify,userLogin,logout,forgetPassword,resetPassword,getMe}