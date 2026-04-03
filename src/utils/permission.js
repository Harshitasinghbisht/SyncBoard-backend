export const getBoardRole=(board , userId)=>{
    if(board.owner.toString()===userId.toString()){
        return "owner"
    }

    const isMember=board.members.some(member=>member.toString()===userId.toString())

    return isMember ? "member" : null;
}
 
export const boardPermission={
  viewBoard: ["owner", "member"],
  updateBoard: ["owner"],
  deleteBoard: ["owner"],
  inviteMember: ["owner"],
  removeMember: ["owner"],

  createList: ["owner", "member"],
  updateList: ["owner", "member"],
  deleteList: ["owner", "member"],

  createCard: ["owner", "member"],
  updateCard: ["owner", "member"],
  deleteCard: ["owner", "member"],
  moveCard: ["owner", "member"]
};

export const hasPermission=(board,userId,action)=>{
    const role=getBoardRole(board,userId)
    if(!role){
        return false
    }

    return boardPermission[action].includes(role);
}
