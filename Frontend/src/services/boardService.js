import api from "./api.js"

const createBoardService=async(boardData)=>{
    const responce=await api.post("/boards",boardData);
    return responce.data;
}

const getAllBoardService=async()=>{
    const responce=await api.get("/boards");
    return responce.data;
}

const getSingleBoardService=async(boardId)=>{
    const responce=await api.get(`/boards/${boardId}`);
    return responce.data;
}

const deleteBoardService=async(boardId)=>{
    await api.delete(`/boards/${boardId}`);
    return boardId;
}

//members services

const addMemberService=async(boardId,data)=>{
    console.log(data.email);
    const res=await api.post(`/boards/${boardId}/members`,data);
    return res.data;
}
const removeMemberService=async(boardId,memberId)=>{
    const res=await api.delete(`/boards/${boardId}/members/${memberId}`)
    return res.data;
}

const getAllMemberService=async(boardId)=>{
    const res=await api.get(`/boards/${boardId}/members`)
    return res.data;
}

export {createBoardService,deleteBoardService,getAllBoardService,getSingleBoardService,addMemberService,removeMemberService,getAllMemberService}