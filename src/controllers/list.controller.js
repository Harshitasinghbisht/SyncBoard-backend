import mongoose from "mongoose";
import Board from "../models/Board.model.js";
import List from "../models/List.model.js";

const createList=async(req,res)=>{
 const {boardId}=req.params;
 const {title}=req.body;
 const {id:userId}=req.user;
 if(!title){
    return res.status(400).json({
        status:false,
        message:"All fields are required"
    })
 }
 try {
    const board=await Board.findById(boardId);
    if(!board){
        return res.status(400).json({
            status:false,
            message:"board not found from controller",
        })}
//count the document list inside the board document  

const count=await List.countDocuments({
    board:boardId
})
//we are using count for the order the list
if(count === null || count === undefined){
    return res.status(400).json({
        status:false,
        message:"unable to count all list"
    })
}
//check for the permission
const isOwner=board.owner.toString()===userId;
const isMember=board.members.some(member=>member.toString()===userId);
if(!isOwner && !isMember){
   return res.status(400).json({
        status:false,
        message:"not authorized"
    }) 
}
const lastList = await List.findOne({ board: boardId })
  .sort({ order: -1 });

const newOrder = lastList ? lastList.order + 100 : 0;
const list=await List.create({
    title,
    board:boardId,
    order:newOrder
})

if(!list){
    return res.status(400).json({
    status:false,
    message:"unable to create list"
    })
}
    res.status(200).json({
        status:true,
        message:"list creation successful",
        list,
        count
    })    

 } catch (error) {
    res.status(500).json({
        status:false,
        message:"list creation failed",
        error:error.message
    })
 }
};
const updateList=async(req,res)=>{

const {listId}=req.params;
const {title}=req.body;
const {id:userId}=req.user;

if(!title){
    return res.status(400).json({
        status:false,
        message:"All fields are required"
    })
}
try {
     const list=await List.findById(listId);
    if(!list){
        res.status(400).json({
            status:false,
            message:"list not found"
        })
    }
    const board=await Board.findOne({
        _id:list.board,
         $or: [
    { owner: userId },
    { members: { $in: [userId] } }
  ]
    })
   if(!board){
   return res.status(400).json({
        status:false,
        message:"not authorized"
    }) 
}
    
   const updateList=await List.findByIdAndUpdate(listId,
     { $set: { title }  },
     {returnDocument: "after" }
   )
   if(!updateList){
    return res.status(400).json({
        status:false,
        message:"updation list failed"
    })
   }
  res.status(200).json({
    status:true,
    message:"list update successful",
    list
  })
} catch (error) {
     res.status(500).json({
    status:false,
    message:"list update failed ",
    error:error.message
  })
}
};
const deleteList=async(req,res)=>{
const {listId}=req.params;
const {id:userId}=req.user;
try {
    //finding list
const list=await List.findById(listId);
    if(!list){
        res.status(400).json({
            status:false,
            message:"list deletion failed"
        })
    }
    //check permission for board
    const board=await Board.findById(list.board);

    const isOwner=board.owner.toString()===userId;
    const isMember=board.members.some(member=>member.toString()===userId);
    if(!isOwner && !isMember){
         res.status(400).json({
            status:false,
            message:"not authorized"
        })
    }

    await List.findByIdAndDelete(listId)
    res.status(200).json({
        status:true,
        message:"list delete successful"
    })
    
} catch (error) {
     res.status(500).json({
        status:false,
        message:"list delete failed server error",
        error:ErrorEvent.message
    })
}
};
const getAllList=async(req,res)=>{
const {boardId}=req.params;
const {id:userId}=req.user;
try {
     const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({
        status: false,
        message: "Board not found",
      });
    }
     const isOwner=board.owner.toString()===userId;
    const isMember=board.members.some(member=>member.toString()===userId);
    if(!isOwner && isMember){
        return res.status(400).json({
            status:false,
            message:"not authorized"
        })
    }
    const lists=await List.find({
        board:boardId
    })
    if(!lists){
        return res.status(400).json({
            status:false,
            message:"unable to featch all list"
        })
    }
   
    res.status(200).json({
        status:true,
        message:"featched list successfully",
        lists
    })
} catch (error) {
     res.status(500).json({
        status:false,
        message:"featched list failed",
        error:error.message
    })
}
};
const reOrderList=async(req,res)=>{

    const{listId,preListId,nextListId}=req.body;
    if(!listId || !preListId || !nextListId){
        return res.status(400).json({
            status:false,
            message:"All fields are required"
        })
    }
    try {
        const session=await mongoose.startSession();
        session.startTransaction();
        let newOrder;
        if(preListId && nextListId){
            const preList=await List.findById(preListId).session(session);
            const nextList=await List.findById(nextListId).session(session);

            newOrder=(preList.order+nextList.order)/2;
        }

        else if (!preListId && nextListId) {
            const nextList=await List.findById(nextListId).session(session);
            newOrder=nextList.order-100;
        } else {
            const preList=await List.findById(preListId).session(session);
            newOrder=preList.order+100;
        }

        const updateList=await List.findByIdAndUpdate(listId,
            {order:newOrder},
            { returnDocument: "after"}
        ).session(session);
        if(!updateList){
            return res.status(400).json({
                status:false,
                message:"reordering list failed"
            })
        }
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            status:true,
            message:"list reorder successful"
        })
    } catch (error) {
         res.status(500).json({
            status:false,
            message:"list reorder failed server error",
            error:error.message
        })
    }
};
//do testing with members
export {createList,updateList,deleteList,getAllList,reOrderList}