import {createSlice } from "@reduxjs/toolkit"
import { loginUser,registerUser,logoutUser,getCurrentUser } from "../Thunks/authThunks.js"

const initialState={
    user:null,
    loading:false,
    error:null,
    success:false,
    isAuthenticated:false
}

 const authSlice=createSlice ({
    name:'auth',
    initialState,
    reducers:{
       clearError:(state)=>{
        state.error=null
       },
       clearSuccess:(state)=>{
        state.success=false
       }
    },
    extraReducers:(builder)=>{
        builder
        //register
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.success=true;
            state.isAuthenticated=false;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.isAuthenticated=false;
            state.success=false;
        })

        //login

        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user=action.payload.user;
            state.loading=false;
            state.success=true;
            state.isAuthenticated=true;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.success=false;
            state.isAuthenticated=false;
        })

        //get current user
        .addCase(getCurrentUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false
        })
        .addCase(getCurrentUser.fulfilled,(state,action)=>{
            state.user=action.payload.user;
            state.loading=false;
            state.success=true;
            state.isAuthenticated=true
        })
        .addCase(getCurrentUser.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false
            state.success=false;
            state.user=null;
            state.isAuthenticated=false;
        })
 //get logout
        .addCase(logoutUser.pending,(state)=>{
            state.loading=true;
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            state.user=null;
            state.loading=false;
            state.success=true;
            state.isAuthenticated=false;
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
    }
})

export default authSlice.reducer;
export const{clearError,clearSuccess}=authSlice.actions;