import { createSlice } from "@reduxjs/toolkit";
import { createBoard ,deleteBoard,getAllBoard,getSingleBoard,getAllMember,addMember,removeMember } from "../Thunks/boardThunks.js";

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
                state.currentBoard=action.payload.currentBoard
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
             state.loading=false,
             state.currentBoard = action.payload.board,
             state.members = action.payload.board.members,
             state.addMemberSuccess=true

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
        .addCase(removeMember.fulfilled,(state,action)=>{
            state.loading=false,
            state.members= state.members.filter( (member) => member._id !== action.payload),
            state.removeMemberSuccess=true
        })
        .addCase(removeMember.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })

        //get all member
        .addCase(getAllMember.pending,(state)=>{
                state.loading=true
        })
        .addCase(getAllMember.fulfilled,(state,action)=>{
            state.loading=false,
            state.members=action.payload.data
        })
        .addCase(getAllMember.rejected,(state,action)=>{
                 state.loading=false,
                 state.createSuccess=false,
                 state.error=action.payload
        })
    }
})
//add the update success in slice and in backend add update controller and router
 export default boardSlice.reducer;
 export const{clearError,clearCreateSuccess,clearAddmemberSuccess,clearDeleteSuccess,clearremovememberSuccess}=boardSlice.actions;