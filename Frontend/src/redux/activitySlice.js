import { createSlice } from "@reduxjs/toolkit";
import { actCreateBoard } from "../Thunks/activityThunks";


const initialState={
    activity:[],
    currentActivity:null,
    loading:false,
    error:null,
    success:false,
    actionType:null
}

const activitySlice=createSlice({
    name:"activity",
    initialState,
    reducers:{clearError:(state)=>{
     state.error=null
    }},
    extraReducers:(builder)=>{
        builder

        //cretate board log
        .addCase(actCreateBoard.pending,(state)=>{
                    state.loading=true;
                    state.success=false;
                })
                .addCase(actCreateBoard.fulfilled, (state, action) => {
                     console.log("PAYLOAD:", action.payload);
                    state.loading = false;
                    state.error = null;
                    state.activity = action.payload.activities;
                    state.success = true;

        })
                .addCase(actCreateBoard.rejected,(state,action)=>{
                    state.loading=false;
                    state.success=false;
                    state.error=action.payload;
                })
    }
})

export const { clearError } = activitySlice.actions;
export default activitySlice.reducer;