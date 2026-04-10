import  {createBoardService,deleteBoardService,getAllBoardService,getSingleBoardService,addMemberService,removeMemberService,getAllMemberService} from "../services/boardService.js"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBoard=createAsyncThunk("board/createBoard",
    async(boardData,thunkAPI)=>{
        try {
            return await createBoardService(boardData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Created board failed")
        }
    }
)

export const getAllBoard=createAsyncThunk("board/getAllBoard",
    async(thunkAPI)=>{
        try {
            return await getAllBoardService();
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed feaching to all boards")
        }
    }
)

export const getSingleBoard=createAsyncThunk("board/getSingleBoard",
    async(boardId,thunkAPI)=>{
        try {
            return await getSingleBoardService(boardId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed featching single board")
        }
    }
)

export const deleteBoard=createAsyncThunk("board/deleteBoard",
    async(boardId,thunkAPI)=>{
        try {
            return await deleteBoardService(boardId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Board deletion failed")
        }
    }
)

export const addMember=createAsyncThunk("board/addMember",
    async(boardId,userData)=>{
        try {
            return await addMemberService(boardId,userData)
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to add member")
        }
    }
)
export const removeMember=createAsyncThunk("board/removeMember",
    async(boardId,memberId)=>{
        try {
            return await addMemberService(boardId,memberId)
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to remove member")
        }
    }
)

export const getAllMember=createAsyncThunk("board/getAllMember",
    async(boardId)=>{
        try {
            return await getAllBoardService(boardId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to featch member")
        }
    }
)
