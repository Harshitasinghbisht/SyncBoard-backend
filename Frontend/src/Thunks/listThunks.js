import { createAsyncThunk } from "@reduxjs/toolkit";
import { createListService,updateListService,deleteListService,getAllListService,reOrderService } from "../services/listService.js";

export const createList=createAsyncThunk("list/createList",
    async({boardId,title},thunkAPI)=>{
        try {
            return await createListService(boardId,{title});
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Created list failed")
        }
    }
)

export const updateList=createAsyncThunk("list/updateList",
  async(listData,thunkAPI)=>{
    try {
        return await updateListService(listData.listId, {
        title: listData.title,
      });
    } catch (error) {
         return thunkAPI.rejectWithValue(
        error.response?.data?.message || "updated list failed")
    }   
  }
)

export const deleteList=createAsyncThunk("list/deleteList",
    async(listId,thunkAPI)=>{
        try {
            return await deleteListService(listId);
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "deleted list failed")
        }
    }
)

export const getAllList=createAsyncThunk("list/getAllList",
    async(boardId,thunkAPI)=>{
     try {
           return await getAllListService(boardId);
     } catch (error) {
         return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Featching all list failed")
     }
    }
)

export const reorderList=createAsyncThunk("list/reorderList",
    async(listId,thunkAPI)=>{
        try {
          return await reOrderService(listId);  
        } catch (error) {
             return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Reordering list failed")
        }
    }
)

