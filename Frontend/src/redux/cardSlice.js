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
        
            state.cardsByList[listId].push(newCard);
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
             
               const updatedDestinationCards = action.payload.cards;
               const { sourceListId, destinationListId } = action.meta.arg.moveData;
               const movedCardId = action.meta.arg.cardId;
             
               const sourceCards = state.cardsByList[sourceListId] || [];
             
               state.cardsByList[sourceListId] = sourceCards.filter(
                 (card) => card._id !== movedCardId
               );
             
               state.cardsByList[destinationListId] = updatedDestinationCards;
             
               state.actionType = "Card moved";
})
        .addCase(moveCard.rejected,(state,action)=>{
            state.loading=false;
            state.success=false;
            state.error=action.payload;
        })
         
    }
})
export const{clearError}=cardSlice.actions;
export default cardSlice.reducer;