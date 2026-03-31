import Board from "../models/Board.model.js";

const createBoard=async(req,res)=>{
       const {title}=req.body;
    if(!title){
        return res.status(400).json({
            success:false,
            message:" title is requied"
        })
    }
        const {id:userId} =req.user; //dont use _id because in middleware we use id in the user object
        console.log("user :",userId)
        if(!userId){
            return res.status(400).json({
            success:false,
            message:"user not found"
        }) 
        }
    try {
        const board= await Board.create({
        title,
        owner:userId
        })
       
        res.status(201).json({
            success:true,
            message:"board creation successful",
            board
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"board creation failed",
            error
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

        if(!boards){
          return  res.status(400).json({
            status:false,
            message:"No board found"
          })
        }
        res.status(201).json({
            status:true,
            message:"all board found", 
            boards

        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"error fetching boards",
            error
        })
    }
};
const getSingleBoard=async(req,res)=>{
    try {
        const {boardId}=req.params;//this is comiong from url
        const {id:userId}=req.user;
        const board=await Board.findOne({
            _id:boardId,
            $or:[
                {owner:userId
        },{ members:userId}]})
        .populate("owner", "name email")
        .populate("members", "name email");
        if(!board){
            return res.status(400).json({
                status:false,
                message:"board not found",
            })
        }
        res.status(201).json({
            status:true,
            message:"board fetching successful",
            board
        })
    } catch (error) {
       res.status(500).json({
            success:false,
            message:"error fetching boards",
            error
        })  
    }
};
const deleteBoard=async(req,res)=>{
        try {
        const {boardId}=req.params;
        const {id:userId} = req.user;
        
        const board=await Board.findOneAndDelete({
            _id:boardId,
            owner:userId
        })
        if(!board){
            return res.status(400).json({
                status:false,
                message:"board not found",
            })
        }
        res.status(201).json({
            status:true,
            message:"Delete board successful",
            board
        })
    } catch (error) {
       res.status(500).json({
            success:false,
            message:"error deleting boards",
            error
        })  
    }
};
const addMember=async(req,res)=>{
const {boardId}=req.params;
const {memberId}=req.body;
const {id:userId}=req.user;

if(!memberId){
    return res.status(400).json({
        status:false,
        message:"required all fields"
    })
}
try {
    const board=await Board.findById(boardId);
   
    if(!board){
        return res.status(400).json({
            success:false,
            message:"Board not found or access denied"
        })
    }
     if(board.owner.toString()===memberId){
          return res.status(400).json({
            status:false,
            message:"cannot add owner in member array"
        })
    }
    
    if(board.owner.toString()!==userId){
    return res.status(400).json({
            success:false,
            message:"unauthorized"
        })
    }
    const matched = board.members.some(
  member => member.toString() === memberId
);
    
    if(matched){
           return res.status(400).json({
            success:false,
            message:"member already exist"
        })
    }
     const updatedBoard = await Board.findByIdAndUpdate(
  boardId,
  {
    $addToSet: { members: memberId }  
  },
  {returnDocument: "after" }
);

await updatedBoard.save();
res.status(201).json({
    success:true,
    message:"member added successfully",
    board:updatedBoard
})
} catch (error) {
    res.status(500).json({
    success:false,
    message:"member not added",
    error:error.message
})
}
};
const removeMember=async(req,res)=>{
const {boardId}=req.params;
const {memberId}=req.params;
const {id:userId}=req.user;
try {
    const board=await  Board.findOne({
        _id:boardId
    })
   
    if(!board){
        return res.status(400).json({
            status:false,
            message:"board not found"
        })
    }
   
    if(board.owner.toString()===memberId){
          return res.status(400).json({
            status:false,
            message:"cannot remove owner"
        })
    }

    if(board.owner.toString()!==userId){
          return res.status(400).json({
            status:false,
            message:"unauthorized"
        })
    }
   
     const matched = board.members.some(
  member => member.toString() === memberId
);
    if(!matched){
           return res.status(400).json({
            success:false,
            message:"member not found"
        })
    }
    const member=await Board.findByIdAndUpdate(boardId,{
        $pull:{members:memberId}
    });
    if(!member){
          return res.status(400).json({
            success:false,
            message:"deletion failed"
        })
    }
    res.status(200).json({
        success:true,
        message:"member removed successfully"
    })
    
} catch (error) {
     res.status(400).json({
        success:false,
        message:"deletion failed"
    })
}
};
const getAllMember=async(req,res)=>{

const {boardId}=req.params;
const {id:userId}=req.user;

const board=await Board.findOne({
_id:boardId,
$or:[
    {owner:userId},
    {members:userId}
]})
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
        owner:board.owner,
        members:board.members
    })
};

export {createBoard,getAllBoard,getSingleBoard,deleteBoard,addMember,removeMember,getAllMember}
