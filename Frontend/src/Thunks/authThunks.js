import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService,logoutService, getCurrentUserService,registerService} from "../services/authService";

export const registerUser=createAsyncThunk("auth/registerUser",
    async(userData,thunkAPI)=>{
        try {
            return await registerService(userData)
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed")
        }
    }
)

export const loginUser=createAsyncThunk("auth/loginUser",
    async(userData,thunkAPI)=>{
        try {
          return await loginService(userData)  
        } catch (error) {
           return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed")  
        }
    }
)

export const getCurrentUser=createAsyncThunk("auth/getCurrentUser",
    async(thunkAPI)=>{
      try {
        return await getCurrentUserService();
      } catch (error) {
         return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get user")
      }
    }
)

export const logoutUser=createAsyncThunk("auth/logoutUser",
    async()=>{
        try {
            return await logoutService()
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed")
        }
    }
)