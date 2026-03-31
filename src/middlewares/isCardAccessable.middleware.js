import Card from "../models/Card.model.js";
import List from "../models/List.model.js";
import Board from "../models/Board.model.js";
const cardAccessable=async(req,res,next)=>{
  const {cardId}=req.params;
    const {id:userId}=req.user;
    try {
        //find list 
        const card=await Card.findById(cardId)
        if(!card){
           return res.status(400).json({
                status:false,
                message:"Card not found in middleware"
            })
        }

       const board = await Board.findOne({
      _id: card.boardId,
      $or: [
        { owner: userId },
        { members: { $in: [userId] } }
      ]
    });
         if(!board){
           return res.status(400).json({
                status:false,
                message:"unauthorized"
            })
        }
         const list=await List.findById(card.listId)
        req.card=card;
        req.board=board;
        req.list=list;
        next();
    } catch (error) {
       res.status(400).json({
                status:false,
                message:"access denied server error"
            }) 
    }
}

export default cardAccessable;