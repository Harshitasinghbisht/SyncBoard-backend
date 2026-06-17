import mongoose from "mongoose";

const historyLogSchema = new mongoose.Schema(
{
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    action:{
        type:String,
        required:true
    },

    entityType:{
        type:String,
        enum:["board","list","task","member"]
    },

    entityId:{
        type:mongoose.Schema.Types.ObjectId
    },

    details:{
        type:Object,
        default:{}
    }
},
{ timestamps:true }
);

const HistoryLog=mongoose.model("HistoryLog",historyLogSchema);
export default HistoryLog