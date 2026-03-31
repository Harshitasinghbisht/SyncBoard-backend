import List from "../models/List.model.js";
import Board from "../models/Board.model.js";

const listAccessable=async (req,res,next)=>{
    const {listId}=req.params;
    const {id:userId}=req.user;
    try {
        //find list 
        const list=await List.findById(listId)
        if(!list){
           return res.status(400).json({
                status:false,
                message:"list not found in middleware"
            })
        }

        const board=await Board.findOne({
            _id:list.board,
            $or:[
                {owner:userId},
                {members:{$in:[userId]}}
            ]
        })
         if(!board){
           return res.status(400).json({
                status:false,
                message:"access denied"
            })
        }
        req.list=list;
        req.board=board;
        next();
    } catch (error) {
       res.status(400).json({
                status:false,
                message:"access denied server error"
            }) 
    }
}

export default listAccessable;