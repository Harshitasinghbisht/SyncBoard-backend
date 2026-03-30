import List from "../models/List.model.js"
import Card from "../models/Card.model.js";

const createCard=async(req,res)=>{
    const {listId}=req.params;
    const {title,description}=req.body;
    const {id:userId}=req.user;
    try {
      if(!title){
        return res.status(400).json({
            status:false,
            message:"title required"
        })
      }  

      const list=await List.findById(listId);
      if(!list){
         return res.status(400).json({
            status:false,
            message:"list not found"
        })
      }
      const boardId=list.board;

      const isOwner=list.owner.toString()===userId;
      const isMember=list.members.some(member=>member.toString()===userId);
      if(!isOwner  && !isMember){
         return res.status(400).json({
            status:false,
            message:"unauthorized"
        })
      }
     const lastCard=await Card.findById(listId).sort({order:-1});
     
     const newOrder = lastCard ? lastCard.order + 100 : 0;

     const card=await Card.create({
        title,
        description,
        boardId,
        listId,
        order:newOrder,
        createdBy:userId
     })
     if(!card){
        return res.status(400).json({
            status:false,
            message:"unable to create card"
        })
     }
     res.status(200).json({
        status:false,
        message:"Card creation successful"
     })
    } catch (error) {
        res.status(500).json({
        status:false,
        message:"Card creation failed"
     }) 
    }
}