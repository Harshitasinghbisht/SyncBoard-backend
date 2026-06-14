import { createSlice } from "@reduxjs/toolkit";
import { createBoard ,deleteBoard,getAllBoard,getSingleBoard,getAllMember,addMember,removeMember,updateBoard } from "../Thunks/boardThunks.js";

const initialState = {
  boards: [],          // all boards
  currentBoard: null,  // selected board
  loading: false,
  error: null,
  createSuccess: false,
  members:[],
  deleteSuccess:false,
  addMemberSuccess:false,
  removeMemberSuccess:false
};

const boardSlice=createSlice({
    name:"board",
    initialState,
    reducers:{
        clearError:(state)=>{
        state.error=null
       },
       clearCreateSuccess:(state)=>{
        state.createSuccess=false;
       },
       clearDeleteSuccess:(state)=>{
        state.deleteSuccess=false;
       },
       clearAddmemberSuccess:(state)=>{
        state.addMemberSuccess=false;
       },
       clearremovememberSuccess:(state)=>{
        state.removeMemberSuccess=false;
       },
       addMemberRealTime: (state, action) => {
  const updatedBoard = action.payload;

  if (!updatedBoard?._id) return;

  state.currentBoard = updatedBoard;
  state.members = updatedBoard.members || [];

  const exists = state.boards.some(
    (board) => board._id?.toString() === updatedBoard._id?.toString()
  );

  if (exists) {
    state.boards = state.boards.map((board) =>
      board._id?.toString() === updatedBoard._id?.toString()
        ? updatedBoard
        : board
    );
  } else {
    state.boards.push(updatedBoard);
  }
},

removeMemberRealTime: (state, action) => {
  const updatedBoard = action.payload;

  if (!updatedBoard?._id) return;

  state.currentBoard = updatedBoard;
  state.members = updatedBoard.members || [];

  state.boards = state.boards.map((board) =>
    board._id?.toString() === updatedBoard._id?.toString()
      ? updatedBoard
      : board
  );
},
boardAddedRealTime:(state,action)=>{
  const board=action.payload
  const exist=state.boards.some((b)=>b._id.toString()===board._id.toString());

  if(!exist){
    state.boards.push(board);
  }
}
    },
    extraReducers:(builder)=>{
        builder
        //create Board
        .addCase(createBoard.pending,(state)=>{
           state.loading=true,
           state.createSuccess=false
        })
        .addCase(createBoard.fulfilled,(state,action)=>{
            state.loading=false,
            state.createSuccess=true,
             state.currentBoard=action.payload.board,
            state.boards.push(action.payload.board)
        })
        .addCase(createBoard.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })
         // update board
         .addCase(updateBoard.pending, (state) => {
             state.loading = true;
         })
         .addCase(updateBoard.fulfilled, (state, action) => {
    const updatedBoard = action.payload.board;
    state.loading=false;

    state.boards = state.boards.map((board) =>
        board._id === updatedBoard._id
            ? updatedBoard
            : board
    );

    if (
        state.currentBoard &&
        state.currentBoard._id === updatedBoard._id
    ) {
        state.currentBoard = updatedBoard;
    }
})
         .addCase(updateBoard.rejected, (state, action) => {
             state.loading = false;
             state.error = action.payload;
         })
        //delete board
        .addCase(deleteBoard.pending,(state)=>{
                state.loading=true,
                state.deleteSuccess=false
        })
        .addCase(deleteBoard.fulfilled,(state,action)=>{
                 state.loading=false,
                // remove from boards list
                 state.boards = state.boards.filter(
                 (board) => board._id !== action.payload);

                // reset currentBoard if deleted
                 if (state.currentBoard?._id === action.payload) {
                state.currentBoard = null;}
                state.deleteSuccess=true
        })
        .addCase(deleteBoard.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //getAll board

        .addCase(getAllBoard.pending,(state)=>{
                state.loading=true
        })
        .addCase(getAllBoard.fulfilled,(state,action)=>{
                state.loading=false,
                state.createSuccess=true,
                state.boards=action.payload.boards
        })
        .addCase(getAllBoard.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //get single board

        .addCase(getSingleBoard.pending,(state)=>{
                 state.loading=true
        })
        .addCase(getSingleBoard.fulfilled,(state,action)=>{
                state.loading=false,
                state.createSuccess=true,
                state.currentBoard=action.payload.board
        })
        .addCase(getSingleBoard.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //add member
        .addCase(addMember.pending,(state)=>{
                 state.loading=true,
                 state.addMemberSuccess=false
        })
        .addCase(addMember.fulfilled,(state,action)=>{
             state.loading=false;
             state.currentBoard = action.payload?.board || null;
             state.addMemberSuccess=true;

        })
        .addCase(addMember.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //remove member

        .addCase(removeMember.pending,(state)=>{
                state.loading=true,
                state.removeMemberSuccess=false
        })
       .addCase(removeMember.fulfilled, (state, action) => {
                 state.loading = false;
                 state.error = null;
                 state.removeMemberSuccess = true;
                 state.currentBoard = action.payload.board;
        })
        .addCase(removeMember.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //get all member
        .addCase(getAllMember.pending,(state)=>{
                state.loading=true;
        })
        .addCase(getAllMember.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.members = action.payload.data;
        })
        .addCase(getAllMember.rejected,(state,action)=>{
                 state.loading=false;
                 state.createSuccess=false;
                 state.error=action.payload;
        })
    }
})
//add delete board to the ui
//add the update success in slice and in backend add update controller and router
 export default boardSlice.reducer;
 export const{clearError,clearCreateSuccess,clearAddmemberSuccess,clearDeleteSuccess,clearremovememberSuccess,addMemberRealTime,removeMemberRealTime, boardAddedRealTime}=boardSlice.actions;