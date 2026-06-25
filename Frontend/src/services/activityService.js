import api from "./api.js";

export const activityCreateBoard=async(boardId)=>{
    const responce=await api.get(`/history/${boardId}/activity`);
   
   
    return responce.data;
} 