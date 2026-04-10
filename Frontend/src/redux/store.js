import {configureStore} from "@reduxjs/toolkit";
import authReducers from './authSlice.js'
import boardReducers from './boardSlice.js'

const store=configureStore({
    reducer:{
        auth:authReducers,
        board:boardReducers
    }
})

export default store;