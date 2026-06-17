import {configureStore} from "@reduxjs/toolkit";
import authReducers from './authSlice.js';
import boardReducers from './boardSlice.js';
import listReducers from './listSlice.js';
import cardReducers from './cardSlice.js'
import activityReducers from './activitySlice.js'

const store=configureStore({
    reducer:{
        auth:authReducers,
        board:boardReducers,
        list:listReducers,
        card:cardReducers,
        activity:activityReducers
    }
})

export default store;