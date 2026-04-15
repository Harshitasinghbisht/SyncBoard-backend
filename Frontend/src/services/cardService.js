import api from "./api.js"

const createCardService=async(listId,cardData)=>{
    const responce=await api.post(`/cards/${listId}/cards`,cardData);
    return responce.data;
}

const getAllCardService=async(listId)=>{
    const res=await api.get(`/cards/${listId}`);
    return res.data;
}

const updateCardService=async(cardId,cardData)=>{
    const res=await api.patch(`/cards/${cardId}`,cardData);
    return res.data;
}

const deleteCardService=async(cardId)=>{
    const res=await api.delete(`/cards/${cardId}`);
    return res.data;
}

const moveCardService=async (cardId)=>{
      const res=await api.patch(`/cards/${cardId}/move`);
      return res.data;
}

export {createCardService,getAllCardService,updateCardService,deleteCardService,moveCardService};