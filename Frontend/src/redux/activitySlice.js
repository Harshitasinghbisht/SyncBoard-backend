import { createSlice } from "@reduxjs/toolkit";
import { fetchBoardActivities } from "../Thunks/activityThunks";


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
    },
 addActivity: (state, action) => {
      state.activity.unshift(action.payload);
       console.log("PAYLOAD:", action.payload);
    }},
     
    extraReducers:(builder)=>{
        builder

        //cretate board log
        .addCase(fetchBoardActivities.pending,(state)=>{
                    state.loading=true;
                    state.success=false;
                })
                .addCase(fetchBoardActivities.fulfilled, (state, action) => {
                     
                    state.loading = false;
                    state.error = null;
                     state.activity = action.payload.activities || action.payload;
                    state.success = true;

        })
                .addCase(fetchBoardActivities.rejected,(state,action)=>{
                    state.loading=false;
                    state.success=false;
                    state.error=action.payload;
                })
    }
})

export const { clearError , addActivity } = activitySlice.actions;
export default activitySlice.reducer;