import mongoose from "mongoose";

const listSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
board:{
    type:mongoose.Schema.Types.ObjectId,
       ref:"Board",
       required:true
},
order:{
    type:Number,
    default:0
}
},{timestamps:true})

listSchema.index({ board: 1 });  // this will add index not store as document
// It’s metadata for querying
// 1 is used as the asending order and -1 for the descending order 

const List=mongoose.model("List",listSchema);
 export default List;