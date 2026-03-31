import Board from "../models/Board.model.js";

const boardMemberOrOwner=async(req,res,next)=>{
try {
    const {boardId}=req.params;
    const {id:userId}=req.user;
    const board=await Board.findOne({
        _id:boardId,
        $or:[
            {owner:userId},
            {members:userId}
        ]
    })
    console.log("here",board)
    if(!board){
        return res.status(404).json({
            status:false,
            message:"board not found"
        })
    }
    req.board=board;
    next();
} catch (error) {
    res.status(500).json({
        status:false,
        message:"isBoardOwnerOrMember middleware failed",
        error:error.message
    })
}
}

export default boardMemberOrOwner;