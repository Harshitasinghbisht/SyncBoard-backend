import { createSlice } from "@reduxjs/toolkit";
import { createCard,updateCard,deleteCard,moveCard,getAllCard } from "../Thunks/cardThunks.js";

const initialState = {
   cardsByList: {},
  currentCard: null,
  loading: false,
  error: null,
  success: false,
  actionType: null
};

const cardSlice=createSlice({
    name:"card",
    initialState,
    reducers:{
         clearError:(state)=>{
        state.error=null
       },
        cardMovedRealtime: (state, action) => {
  const {
    card,
    sourceListId,
    destinationListId,
    newPosition,
    cards,
  } = action.payload;

  // same-list reorder
  if (sourceListId === destinationListId) {
    state.cardsByList[sourceListId] = cards;
    return;
  }

  // remove from source list
  state.cardsByList[sourceListId] =
    state.cardsByList[sourceListId]?.filter(
      (c) => c._id !== card._id
    ) || [];

  // create destination if missing
  if (!state.cardsByList[destinationListId]) {
    state.cardsByList[destinationListId] = [];
  }

  // remove duplicate from destination
  state.cardsByList[destinationListId] =
    state.cardsByList[destinationListId].filter(
      (c) => c._id !== card._id
    );

  // insert at correct dropped position
  state.cardsByList[destinationListId].splice(newPosition, 0, card);
},
cardCreatedRealtime:(state,action)=>{
 const newCard = action.payload;
    const listId = newCard.listId;

    if (!state.cardsByList[listId]) {
        state.cardsByList[listId] = [];
    }

    const exists = state.cardsByList[listId].some(
        card => card._id === newCard._id
    );

    if (!exists) {
        state.cardsByList[listId].push(newCard);
    }
    state.cardsByList[listId].sort((a,b)=>a.order-b.order)        
},
cardUpdatedRealTime:(state,action)=>{
   const updatedCard=action.payload;
            const listId = updatedCard.listId.toString(); 
  if (!listId || !updatedCard._id) return;
             if (state.cardsByList[listId]) {
               state.cardsByList[listId] = state.cardsByList[listId].map((card) =>
                 card._id?.toString() === updatedCard._id?.toString() ? updatedCard : card
               );
             }
},
cardDeleteRealTime:(state,action)=>{
    const { cardId, listId } = action.payload;

  const safeListId = listId?.toString();
  const safeCardId = cardId?.toString();

  if (!safeListId || !safeCardId) return;

  if (state.cardsByList[safeListId]) {
    state.cardsByList[safeListId] = state.cardsByList[safeListId].filter(
      (card) => card._id?.toString() !== safeCardId
    );
  }
}
    },
    extraReducers:(builder)=>{
        builder
        //create card 
        .addCase(createCard.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
        .addCase(createCard.fulfilled, (state, action) => {
            state.loading = false;
        
            const newCard = action.payload.card;
            const listId = newCard.listId;
        
            if (!state.cardsByList[listId]) {
                state.cardsByList[listId] = [];
            }
         const alreadyExists = state.cardsByList[listId].some(
               (card) => card._id === newCard._id
             );
           
             if (!alreadyExists) {
               state.cardsByList[listId].push(newCard);
             }
            state.success = true;
            state.actionType = "card created";
})
        .addCase(createCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })
        //get all card
        .addCase(getAllCard.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
       .addCase(getAllCard.fulfilled, (state, action) => {
            state.loading = false;
            state.cardsByList[action.meta.arg] = action.payload.cards;
            state.success = true;
            state.actionType = "fetching all created";
})
        .addCase(getAllCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })
// update cards

        .addCase(updateCard.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
        .addCase(updateCard.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedCard=action.payload.card;
            const listId = updatedCard.listId; 

             if (state.cardsByList[listId]) {
               state.cardsByList[listId] = state.cardsByList[listId].map((card) =>
                 card._id === updatedCard._id ? updatedCard : card
               );
             }
            state.success=true;
            state.actionType="Card updated"
        })
        .addCase(updateCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })

        //delete card
        .addCase(deleteCard.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
        .addCase(deleteCard.fulfilled,(state,action)=>{
            state.loading=false;
            const { cardId, listId } = action.payload;

            if (state.cardsByList[listId]) {
              state.cardsByList[listId] = state.cardsByList[listId].filter(
                (card) => card._id !== cardId
              );
  }
            state.success=true;
            state.actionType="Card deleted"
        })
        .addCase(deleteCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })

        //move  card

        .addCase(moveCard.pending,(state)=>{
            state.loading=true;
            state.success=false;
        })
        .addCase(moveCard.fulfilled, (state, action) => {
               state.loading = false;
               state.success = true;
             
               const {
    sourceListId,
    destinationListId,
    cards,
    sourceCards,
    destinationCards,
    message
  } = action.payload;

  // same list reorder
  if (message === "Card reordered successfully") {
    state.cardsByList[sourceListId] = cards;
  }

  // move card to another list
  if (message === "Card moved successfully") {
    state.cardsByList[sourceListId] = sourceCards;
    state.cardsByList[destinationListId] = destinationCards;
  }

  state.actionType = "Card moved successfully";
})
        .addCase(moveCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })
         
    }
})
export const{clearError,cardMovedRealtime,cardCreatedRealtime,cardUpdatedRealTime,cardDeleteRealTime}=cardSlice.actions;
export default cardSlice.reducer;