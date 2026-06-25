import express from "express";
import { forgetPassword, getMe, logout, resetPassword, userLogin, userRegister } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router=express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/me",isLoggedIn,getMe);
router.get("/logout",isLoggedIn,logout);
router.post("/forgotpassword",forgetPassword);
router.post("/resetpassword/:token",resetPassword)

export default router;  