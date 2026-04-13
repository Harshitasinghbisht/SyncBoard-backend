import api from "./api.js"

const createListService=async(boardId,listData)=>{
    const responce=await api.post(`/boards/${boardId}/lists`,listData);
    return responce.data;
}

const updateListService=async(listId,listData)=>{
    const res=await api.patch(`/lists/${listId}`,listData);
    return res.data;
}

const deleteListService=async(listId)=>{
    const res=await api.delete(`/lists/${listId}`);
    return res.data;
}

const getAllListService=async(boardId)=>{
    const res=await api.get(`/boards/${boardId}/lists`);
    return res.data;
}

const reOrderService=async(listId)=>{
    const res=await api.patch(`/lists/${listId}/reorder`);
    return res.data;
}

export {createListService,updateListService,deleteListService,getAllListService,reOrderService};