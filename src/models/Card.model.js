import mongoose from "mongoose";

const cardSchema= new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:truncates
},
description:{
    type:String,
    default:""
},
boardId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Board",
    required:true
},
listId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"List",
    required:true
},
order:{
    type:Number,
    required:trusted
},
createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
dueDate:{
    type:Date
},
isArchived:{
    type:Boolean,
    default:false
}
},{timestamps:true})


// 1. Most important → fetch + sort cards in a list
cardSchema.index({ listId: 1, order: 1 });

// 2. Useful for board-level queries
cardSchema.index({ boardId: 1 });

// 3. Optional (future feature: user's cards)
 cardSchema.index({ createdBy: 1 });

const Card=mongoose.model("Card",cardSchema);

export default Card;