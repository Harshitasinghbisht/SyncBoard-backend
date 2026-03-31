import List from "../models/List.model.js"
import Card from "../models/Card.model.js";
import mongoose from "mongoose";

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
            message:"list not found "
        })
      }
      const board=req.board;

      const isOwner=board.owner.toString()===userId;
      const isMember=board.members.some(member=>member.toString()===userId);
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
        boardId:board,
        listId,
        order:newOrder,
        createdBy:userId
     })
     console.log(card)
     if(!card){
        return res.status(400).json({
            status:false,
            message:"unable to create card"
        })
     }
     res.status(200).json({
        status:true,
        message:"Card creation successful"
     })
    } catch (error) {
        res.status(500).json({
        status:false,
        message:"Card creation failed",
        error:error.message
     }) 
    }
}
const getAllCard=async(req,res)=>{
    const {listId}=req.params;
    const {id:userId}=req.user;

    try {
        const list=await List.findById(listId).populate("board");
        if(!list){
            return res.status(400).json({
                status:false,
                message:"list not found"
            })
        }

        const isOwner=list.board.owner.toString()===userId;
       const isMember=list.board.members.some(member=>member.toString()===userId)

       if(!isOwner && !isMember){
          return res.status(400).json({
                status:false,
                message:"unauthorized"
            })
       }
     const cards=await Card.find({
        listId
     }).sort({order:+1})
     if(!cards){
       return res.status(400).json({
                status:false,
                message:"unable to featch cards"
            }) 
     }
     res.status(200).json({
                status:true,
                message:" featching cards successful",
                cards
            }) 

    } catch (error) {
         res.status(500).json({
                status:false,
                message:" featching cards failed ",
                error:error.message
            }) 
    }
}
const updateCard=async(req,res)=>{
    const {cardId}=req.params;
    const {id:userId}=req.user;
    const {title,description}=req.body;

    if(!title || !description){
      return res.status(400).json({
        status:false,
        message:"All fields are required"
      })
    }
    try {
        const card=await Card.findById(cardId).populate("boardId");
        if(!card){
            return res.status(400).json({
                status:false,
                message:"Card not found"
            })
        }
        const isOwner=card.boardId.owner.toString()===userId;
        const isMember=card.boardId.members.some(member=>member.toString()==userId)
        if(!isOwner && !isMember){
             return res.status(400).json({
                status:false,
                message:"Unauthorized"
            })
        }
        const updateCard=await Card.findByIdAndUpdate(
            cardId,
            {$set:  {title,
                description,
                updatedAt:new Date()
            }},
            {new:true}
        )
        if(!updateCard){
            return res.status(400).json({
                status:false,
                message:"card updation failed"
            })
        }
        res.status(200).json({
                status:true,
                message:"card updation successful",
                updateCard
            })
    } catch (error) {
         return res.status(500).json({
                status:false,
                message:"card updation failed sever failed",
                error:error.message
            })
    }
}
const deleteCard=async(req,res)=>{
    const {cardId}=req.params;
    const {id:userId}=req.user;
    try {
        const card=await Card.findById(cardId).populate("boardId");
        if(!card){
            return res.status(400).json({
                status:false,
            message:"card not found"            })
        }   
             const isOwner=card.boardId.owner.toString()===userId;
        const isMember=card.boardId.members.some(member=>member.toString()==userId)
        if(!isOwner && !isMember){
             return res.status(400).json({
                status:false,
                message:"Unauthorized"
            })
        }
        await Card.findByIdAndDelete(cardId);
        res.status(200).json({
            status:true,
            message:"card deleted successful"
        })
    } catch (error) {
         res.status(500).json({
            status:false,
            message:"card deleted failed server failed",
            error:error.message
        })
    }
}
const moveCard=async(req,res)=>{
    const {cardId,sourceListId,destinationListId,newPosition}=req.body;
    const {id:userId}=req.user;
    
    try {
       
        if(!cardId || !sourceListId || !destinationListId || !newPosition==undefined){
            return res.status(400).json({
                status:false,
                message:"all fields are required"
            })
        }
        
         const session=await mongoose.startSession();
        session.startTransaction();

        let card=await Card.findById(cardId).populate("boardId").session(session);
        if(!card){
            return res.status(400).json({
                status:false,
                message:"card not found"
            })
        }

        const isOwner=card.boardId.owner.toString()===userId;
        const isMember=card.boardId.members.some(member=>member.toString()===userId);
        console.log(isMember);
        console.log(isOwner)
        if(!isOwner && !isMember){
            return res.status(400).json({
                status:false,
                message:"unauthorized "
            })
        }
        let updateCard = []; 
// if user move the card within the same list
        if(sourceListId===destinationListId){
        let cards=await  Card.find({listId:sourceListId}).sort({order: +1}).session(session);
        
        //remove card
        cards=cards.filter(card=>card._id.toString()!==cardId);

        //insert in new position
        cards.splice(newPosition,0,card)

        //resign order
        for(let i=0; i<cards.length;i++){
            cards[i].order=(i+1)*100;
            await cards[i].save({session});
        }
        updateCard=cards;
        }
        else{
            let sourceCards=await Card.find({listId:destinationListId}).sort({order:1}).session(session);
            
            sourceCards=sourceCards.filter(sourceCard=>sourceCard._id.toString()!==cardId);
            for(let i=0; i<sourceCards.length;i++){
            sourceCards[i].order=(i+1)*100;
            await sourceCards[i].save({session});
        }
         //destination list
        let destinationCard=await Card.find({listId:destinationListId})
        .sort({ order: 1 })
        .session(session);
 
        //update card before inserting
        card.listId=destinationListId;
        destinationCard.splice(newPosition,0,card);


      for (let i = 0; i < destinationCard.length; i++) {
        destinationCard[i].order = (i + 1) * 100;
        await destinationCard[i].save({ session });
      }
      updateCard=destinationCard
        }
  await session.commitTransaction();
    session.endSession();

    res.status(200).json({
        status:true,
        message:"moving card successful",
        updateCard
    })
       
    } catch (error) {
         res.status(500).json({
        status:false,
        message:"moving card failed server problem",
        error:error.message
        
    })
    }
}

export {createCard,getAllCard,updateCard,deleteCard,moveCard}