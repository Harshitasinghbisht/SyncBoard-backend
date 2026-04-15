import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCardService,deleteCardService,updateCardService,getAllCardService,moveCardService } from "../services/cardService.js";
    
export const createCard=createAsyncThunk("card/createCard",
    async({ listId, title, description },thunkAPI)=>{
        try {
            return await createCardService(listId,
        { title, description }
)
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Created card failed")
        }
    }
)

export const getAllCard=createAsyncThunk("card/getAllCard",
    async(listId,thunkAPI)=>{
        try {
            return await getAllCardService(listId)
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Featching card failed")
        }
    }
)

 export const updateCard=createAsyncThunk("card/updateCard",
    async(cardData,thunkAPI)=>{
        try {
            return await updateCardService(cardData.cardId,{listId:cardData.listID,title:cardData.title,description:cardData.description})
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "updation card failed")
        }
    }
)

export const deleteCard=createAsyncThunk("card/deleteCard",
    async({cardId,listId},thunkAPI)=>{
        try {
            const res= await deleteCardService(cardId);
            return{
                ...res,
                cardId,
                listId
            }
        } catch (error) {
           return thunkAPI.rejectWithValue(
        error.response?.data?.message || "deletion card failed") 
        }
    }
)

export const moveCard=createAsyncThunk("card/moveCard",
    async(cardData,thunkAPI)=>{
        try {
            return await moveCardService(cardData.cardId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data?.message || "moving card failed")
        }
    }
)