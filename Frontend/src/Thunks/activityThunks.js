import { createAsyncThunk } from "@reduxjs/toolkit"
import {activityCreateBoard} from "../services/activityService.js"

export const actCreateBoard=createAsyncThunk("history/actCreateBoard",
    async(boardId,thunkAPI)=>{
try {
    return await activityCreateBoard(boardId);
} catch (error) {
     return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Created board log failed")
}
    }
)