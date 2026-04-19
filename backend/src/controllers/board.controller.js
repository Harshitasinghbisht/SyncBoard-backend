import Board from "../models/Board.model.js";
import User from "../models/User.model.js";

const createBoard=async(req,res)=>{
       const {title}=req.body;
       
    if(!title || !title.trim()){
        return res.status(400).json({
            success:false,
            message:" title is requied"
        })
    }
        const {id:userId} =req.user; //dont use _id because in middleware we use id in the user object
        
    try {
        const board= await Board.create({
        title:title.trim(),
        owner:userId
        })
       
        res.status(200).json({
            success:true,
            message:"board creation successful",
            board
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"board creation failed",
            error:error.message
        })
    }
};
const getAllBoard=async(req,res)=>{
    try {
        const {id:userId} =req.user;
        const boards=await Board.find({
          $or:[
            {owner:userId},
            {members:userId}
        ]
    }).populate("owner", "name email");

        res.status(200).json({
            status:true,
            message:"all board found", 
            boards

        })
    } catch (error) {
         res.status(500).json({
            status:false,
            message:"error fetching boards",
            error:error.message
        })
    }
};
const getSingleBoard=async(req,res)=>{
    try {
        
        const board=await Board.findById(req.board._id)
        .populate("owner", "name email")
        .populate("members", "name email");
        if(!board){
            return res.status(400).json({
                status:false,
                message:"board not found",
            })
        }
        res.status(200).json({
            success:true,
            message:"board fetching successful",
            board
        })
    } catch (error) {
       res.status(500).json({
            success:false,
            message:"error fetching boards",
            error:error.message
        })  
    }
};
const deleteBoard=async(req,res)=>{
        try {
        const board=await Board.findByIdAndDelete(req.board._id)
        if(!board){
            return res.status(404).json({
                success:false,
                message:"board not found",
            })
        }
        res.status(200).json({
            success:true,
            message:"Board deleted successfully",
        })
    } catch (error) {
       res.status(500).json({
            success:false,
            message:"error deleting boards",
            error:error.message
        })  
    }
};
const addMember=async(req,res)=>{
const {email}=req.body;
const board=req.board;

if(!email){
    return res.status(400).json({
        success:false,
        message:"required  email"
    })
}
try {
    console.log("Incoming email:", email);
    console.log("Board from middleware:", board?._id);
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Email not found"
        })
    }
     const memberId = user._id;
     if(board.owner.toString()===memberId.toString()){
          return res.status(400).json({
            success:false,
            message:"Owner cannot be added as a member"
        })
    }
   
    const alreadyMember = board.members.some(
  member => member.toString() === memberId.toString());
    
    if(alreadyMember){
           return res.status(400).json({
            success:false,
            message:"Member already exist"
        })
    }
     board.members.push(memberId);
     await board.save();

      const updatedBoard = await Board.findById(board._id)
      .populate("owner", "name email")
      .populate("members", "name email");
      console.log(updatedBoard)

res.status(200).json({
    success:true,
    message:"Member added successfully",
    board:updatedBoard
})
} catch (error) {
    console.log("Add member controller error:", error);
    res.status(500).json({
    success:false,
    message:"member not added",
    error:error.message
})
}
};
const removeMember=async(req,res)=>{
const {memberId}=req.params;
const board=req.board;
try {
    if(board.owner.toString()===memberId){
          return res.status(400).json({
            success:false,
            message:"cannot remove owner"
        })
    }
   
     const memberExists = board.members.some(
  member => member.toString() === memberId
);
    if(!memberExists){
           return res.status(400).json({
            success:false,
            message:"member not found"
        })
    }
      board.members = board.members.filter(
      (member) => member.toString() !== memberId.toString()
    );
    await board.save();
const updatedBoard = await Board.findById(board._id)
      .populate("owner", "name email")
      .populate("members", "name email");
    
    console.log("updatedBoard members:", updatedBoard.members);
    res.status(200).json({
        success:true,
        message:"Member removed successfully",
        board:updatedBoard
    })
    
} catch (error) {
     res.status(500).json({
        success:false,
        message:"deletion failed",
        error:error.message
    })
}
};
const getAllMember=async(req,res)=>{

const {boardId}=req.params; 
try {
    
    const board=await Board.findOne({_id:boardId})
    .populate("owner", "name email")
      .populate("members", "name email");
    if(!board){
        return res.status(400).json({
            success:false,
            message:"board not found or access denied"
        })
    }
    res.status(200).json({
            success:true,
            message:"found all members",
            data: [
  { role: "owner", user: board.owner },
  ...board.members.map(m => ({
    role: "member",
    user: member
  }))
]
        })
} catch (error) {
    res.status(500).json({
            success:false,
            message:"unable to featch all members",
            error:error.message
        })
}
};

export {createBoard,getAllBoard,getSingleBoard,deleteBoard,addMember,removeMember,getAllMember}
