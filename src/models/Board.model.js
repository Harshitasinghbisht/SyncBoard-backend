import mongoose from "mongoose";
const boardSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true
},
owner:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
},
members:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
},{timestamps:true})

boardSchema.index({ owner: 1 });      // for faster queries by owner
boardSchema.index({ members: 1 });    // for queries where user is a member

//later can addbackground =stores the color or image of the background board
//isFav to add the favirout board

const Board=mongoose.model("Board",boardSchema);
export default Board;