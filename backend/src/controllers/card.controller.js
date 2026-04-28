import List from "../models/List.model.js"
import Card from "../models/Card.model.js";
import mongoose from "mongoose";
import { getIO } from "../utils/socket.js";

const createCard=async(req,res)=>{
    const list=req.list;
    const board=req.board;
    const {title,description}=req.body;
    const {id:userId}=req.user;
    try {
       const trimTitle = title?.trim();
    const trimDescription = description?.trim() || "";

    if (!trimTitle) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }
     const lastCard=await Card.findOne({listId:list._id}).sort({order:-1});
     
     const newOrder = lastCard ? lastCard.order + 100 : 0;

     const card=await Card.create({
         title: trimTitle,
        description: trimDescription,
        boardId:board._id,
        listId:list._id,
        order:newOrder,
        createdBy:userId
     })
     res.status(201).json({
        success:true,
        message:"Card creation successfully",
        card
     })
    } catch (error) {
        res.status(500).json({
        success:false,
        message:"Card creation failed",
        error:error.message
     }) 
    }
}
const getAllCard=async(req,res)=>{
    const list=req.list;

    try {
     const cards=await Card.find({
        listId:list._id
     }).sort({order:+1})

     res.status(200).json({
                success:true,
                message:" featching cards successfully",
                cards
            }) 

    } catch (error) {
         res.success(500).json({
                status:false,
                message:" featching cards failed ",
                error:error.message
            }) 
    }
}
const updateCard=async(req,res)=>{
    const {title,description}=req.body;
    const card=req.card;

  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();

    if(title === undefined && description === undefined){
      return res.status(400).json({
        success:false,
        message:"Atleast one field is required"
      })
    }
     if (title !== undefined) {
    if (!trimmedTitle) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty"
      });
    }
    card.title = trimmedTitle;
  }

  if (description !== undefined) {
    card.description = trimmedDescription || "";
  }

    try {
      
        await card.save();

        res.status(200).json({
                success:true,
                message:"card updation successful",
                card
            })
    } catch (error) {
         return res.status(500).json({
                success:false,
                message:"card updation failed sever failed",
                error:error.message
            })
    }
}
const deleteCard=async(req,res)=>{
    const card=req.card;
    try {
        await card.deleteOne();
        res.status(200).json({
            success:true,
            message:"card deleted successfully"
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"card deleted failed server failed",
            error:error.message
        })
    }
}
const moveCard = async (req, res) => {
  const { sourceListId, destinationListId, newPosition } = req.body;
  const card = req.card;
  const board = req.board;

  const session = await mongoose.startSession();

  try {
    if (!sourceListId || !destinationListId || newPosition === undefined) {
      return res.status(400).json({
        success: false,
        message: "Source list id, destination list id and new position are required"
      });
    }

    if (Number.isNaN(Number(newPosition)) || Number(newPosition) < 0) {
      return res.status(400).json({
        success: false,
        message: "New position must be a valid non-negative number"
      });
    }

    const parsedPosition = Number(newPosition);

    if (card.listId.toString() !== sourceListId.toString()) {
      return res.status(400).json({
        success: false,
        message: "Card does not belong to the provided source list"
      });
    }

    await session.startTransaction();

    const sourceList = await List.findById(sourceListId).session(session);
    const destinationList = await List.findById(destinationListId).session(session);

    if (!sourceList || !destinationList) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      return res.status(404).json({
        success: false,
        message: "Source or destination list not found"
      });
    }

    if (
      sourceList.board.toString() !== board._id.toString() ||
      destinationList.board.toString() !== board._id.toString()
    ) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      return res.status(400).json({
        success: false,
        message: "Lists do not belong to the same board"
      });
    }

    if (sourceListId.toString() === destinationListId.toString()) {
      let cards = await Card.find({ listId: sourceListId })
        .sort({ order: 1 })
        .session(session);

      cards = cards.filter((item) => item._id.toString() !== card._id.toString());

      if (parsedPosition > cards.length) {
        if (session.inTransaction()) {
          await session.abortTransaction();
        }
        return res.status(400).json({
          success: false,
          message: "Invalid new position"
        });
      }

      cards.splice(parsedPosition, 0, card);

      for (let i = 0; i < cards.length; i++) {
        cards[i].order = (i + 1) * 100;
        await cards[i].save({ session });
      }

      await session.commitTransaction();
      getIO().to(board._id.toString()).emit("cardMoved", {
        boardId: board._id.toString(),
        card,
        sourceListId,
        destinationListId,
        newPosition,
        cards
      });
      return res.status(200).json({
        success: true,
        message: "Card reordered successfully",
        sourceListId,
        cards
      });
    } else {
      let sourceCards = await Card.find({ listId: sourceListId })
        .sort({ order: 1 })
        .session(session);

      sourceCards = sourceCards.filter(
        (item) => item._id.toString() !== card._id.toString()
      );

      for (let i = 0; i < sourceCards.length; i++) {
        sourceCards[i].order = (i + 1) * 100;
        await sourceCards[i].save({ session });
      }

      let destinationCards = await Card.find({ listId: destinationListId })
        .sort({ order: 1 })
        .session(session);

      if (parsedPosition > destinationCards.length) {
        if (session.inTransaction()) {
          await session.abortTransaction();
        }
        return res.status(400).json({
          success: false,
          message: "Invalid new position"
        });
      }

      card.listId = destinationListId;
      destinationCards.splice(parsedPosition, 0, card);

      for (let i = 0; i < destinationCards.length; i++) {
        destinationCards[i].order = (i + 1) * 100;
        await destinationCards[i].save({ session });
      }

      await session.commitTransaction();

     const io=getIO();

     io.to(board._id.toString()).emit("cardMoved",{
      boardId:board._id,
      card,
      sourceListId,
      destinationListId,
      newPosition
     })

     console.log(" ewmmited cardMoved")

      return res.status(200).json({
        success: true,
        message: "Card moved successfully",
        sourceListId,
        destinationListId,
        sourceCards,
        destinationCards
      });
    }
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return res.status(500).json({
      success: false,
      message: "Card move failed",
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

export {createCard,getAllCard,updateCard,deleteCard,moveCard}