import Board from "../models/Board.model.js";
import { hasPermission } from "../utils/Permission.js";

const authorizeBoardAction =(action)=>{
    return async (req,res,next)=>{
        try {
            const {boardId}=req.paramas || req.body.boardId;
            const {id:userId}=req.user;

            if(!boardId){
                return res.status(400).json({
                    status:false,
                    message:"BoardId is required"
                })
            }
            const board=await Board.findById(boardId);
            if(!board){
                return res.status(400).json({
                    status:false,
                    message:"Board not found"
                })
            }

            const allowed=hasPermission(board,userId,action);
            if(!allowed){
                return res.status(400).json({
                    status:false,
                    message:"unautorized"
                })
            }
            res.board=board;
            next()
        } catch (error) {
            res.status(500).json({
                status:false,
                message:"Autorization falied",
                error:error.message
            })
        }
    }
}

export default authorizeBoardAction;