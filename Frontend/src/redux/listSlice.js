import { createSlice } from "@reduxjs/toolkit";
import { createList,updateList,deleteList,getAllList,reorderList } from "../Thunks/listThunks.js";

const initialState={
    lists:[],
    loading:false,
    error:null,
    createListSuccess:false,
    deleteListSuccess:false,
    updateListSuccess:false,
    reorderListSuccess:false,
    getAllLitSuccess:false
}

const listSlice=createSlice({
name:"list",
initialState,
reducers:{
    clearError:(state)=>{
        state.error=null
       },
       clearCreatelistSuccess:(state)=>{
        state.createListSuccess=false;
       },
       clearDeleteListSuccess:(state)=>{
        state.deleteListSuccess=false;
       },
       clearUpdateListSuccess:(state)=>{
        state.updateListSuccess=false;
       },
       clearReorderListSuccess:(state)=>{
        state.reorderListSuccess=false
       },
       clearGetAllListSuccess:(state)=>{
        state.getAllLitSuccess=false
       },
       createListRealTime:(state,action)=>{
        const newList=action.payload;
        const exist=state.lists.some(
            (list)=>list._id===newList._id    
        );
        if(!exist){
        state.lists.push(newList);}
       },
       updateListRealTime:(state,action)=>{
        const updatedList=action.payload;
         
     state.lists = state.lists.map((list) =>list._id?.toString() === updatedList._id?.toString() ? updatedList : list);
       },
       deleteListRealTime:(state,action)=>{
        const deletelist=action.payload;
        state.lists=state.lists.filter((list)=>list._id?.toString()!==deletelist._id?.toString())
       }
},
 extraReducers:(builder)=>{
        builder

        //create List
        .addCase(createList.pending,(state)=>{
            state.loading=true;
            state.createListSuccess=false;
        })
        .addCase(createList.fulfilled,(state,action)=>{
            state.loading=false;
            const newList = action.payload.list;

  if (!newList?._id) return;

  const exists = state.lists.some(
    (list) => list._id?.toString() === newList._id?.toString()
  );

  if (!exists) {
    state.lists.push(newList);
  }
            state.createListSuccess=true;
        })
        .addCase(createList.rejected,(state,action)=>{
            state.loading=false;
            state.createListSuccess=false;
            state.error=action.payload;
        })

        //update list

        .addCase(updateList.pending,(state)=>{
            state.loading=true;
            state.updateListSuccess=false;
        })
        .addCase(updateList.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedList = action.payload.list;
            state.lists = state.lists.map((list) =>list._id === updatedList._id ? updatedList : list);
            state.updateListSuccess=true;
        })
        .addCase(updateList.rejected,(state,action)=>{
            state.loading=false;
            state.updateListSuccess=false;
            state.error=action.payload;
        })

        //delete list

        .addCase(deleteList.pending,(state)=>{
            state.loading=true;
            state.deleteListSuccess=false;
        })
        .addCase(deleteList.fulfilled,(state,action)=>{
            state.loading=false;
         state.lists = state.lists.filter(
         (list) => list._id !== action.payload.listId);
            state.deleteListSuccess=true;
        })
        .addCase(deleteList.rejected,(state,action)=>{
            state.loading=false;
            state.deleteListSuccess=false;
            state.error=action.payload;
        })

        //get all list
        .addCase(getAllList.pending,(state)=>{
            state.loading=true;
            state.getAllLitSuccess=false;
        })
        .addCase(getAllList.fulfilled,(state,action)=>{
            state.loading=false,
            state.lists=action.payload.lists;
            state.getAllLitSuccess=true;
        })
        .addCase(getAllList.rejected,(state,action)=>{
            state.loading=false;
            state.getAllLitSuccess=false;
            state.error=action.payload;
        })

        //reorder list
        .addCase(reorderList.pending,(state)=>{
            state.loading=true;
            state.reorderListSuccess=false;
        })
        .addCase(reorderList.fulfilled,(state,action)=>{
            state.loading=false,
            state.lists=action.payload.list.order;
            state.reorderListSuccess=true;
        })
        .addCase(reorderList.rejected,(state,action)=>{
            state.loading=false;
            state.reorderListSuccess=false;
            state.error=action.payload;
        })

       }
})

export const{clearCreatelistSuccess,clearDeleteListSuccess,clearGetAllListSuccess,clearReorderListSuccess,clearUpdateListSuccess,createListRealTime,updateListRealTime,deleteListRealTime}=listSlice.actions;
export default listSlice.reducer;