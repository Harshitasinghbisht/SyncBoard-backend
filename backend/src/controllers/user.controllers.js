import User from "../models/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userRegister=async(req,res)=>{

  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      success:false,
      message: "All fields are required"
    });
  }
   
try {
     const existingUser= await User.findOne({email});
 if(existingUser){
    return res.status(400).json({
      success:false,
        message:"user already exist"
    })
 }
 const user= await User.create({
        name,
        email,
        password
    })

    if(!user){
        return res.status(400).json({
            success:false,
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
    html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Verify your email</h2>
      <p>Click the button below to verify your account:</p>

      <a href="http://localhost:5173/verify/${token}" 
         style="display:inline-block; padding:10px 20px; background:#3b82f6; color:white; text-decoration:none; border-radius:6px;">
         Verify Email
      </a>

      <p style="margin-top:20px; font-size:12px; color:gray;">
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
  `   
}

   await transport.sendMail(mailOption);

 res.status(201).json({
  message:"User register succesfully",
  success:true
 })
} catch (error) {
    res.status(400).json({
      success:false,
  message:"User not register ",
  error:error.message
 })
}
  

};
const userVerify=async(req,res)=>{

const {token}=req.params;
if(!token){
  return res.status(400).json({
    success:false,
    message:"Invalid token"
  })
}

  const user=await User.findOne({verificationToken:token})
  
if(!user){
  return res.status(400).json({
    success:false,
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
      success:false,
      message:"all field required"
    })
  }
  try {
  const user= await User.findOne({email});
  if(!user){
      return res.status(400).json({
        success:false,
      message:"invalid email,password"
    })
  }
    const isMatched=await bcrypt.compare(password,user.password)
    if(!isMatched){
      return res.status(400).json({
        success:false,
      message:"invalid email,password"
    })
    }
    //isverified  validation check

  if(!user.isVerfied){
    return res.status(400).json({
      success:false,
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
    sameSite: "lax", 
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
      success:false,
      message:"Login failed",
      error:error.message
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
      secure: false,       // use false in localhost if not using HTTPS
      sameSite: "lax"
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
     if(!email){
      return res.status(400).json({
        status:false,
        message:"all fields are required"
      })
     }
  try {
    
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
    
     const {token}=req.params;  
     const {password}=req.body;
     if(!password){
      res.status(400).json({
        status:false,
        message:"All fields are required"
      })
     } 
   const user=await User.findOne({
    passwordResetToken:token,
    passwordResetExpire:{$gt:Date.now()}
   })
   
   if(!user){
    return res.status(400).json({
     success:false,
     message:"User not found"
 })
   }
   user.password=password;
  
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