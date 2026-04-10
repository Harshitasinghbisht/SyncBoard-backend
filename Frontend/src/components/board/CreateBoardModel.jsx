import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../../Thunks/boardThunks";

function CreateBoardModel({isOpen,isClose,onCreateBoard}){
    
     if (!isOpen) return null;
     const dispatch=useDispatch();
     const[title,setTitle]=useState("");
     const reference=useRef(null);
     useEffect(()=>{
      if(isOpen && reference.current){
        reference.current.focus();
      }
     })
     
     const handleFormSubmit=(e)=>{
      e.preventDefault();
      if(!title.trim())return;
      dispatch(createBoard({title}));
       isClose();
        setTitle("") 
     }
    return(
      <form onSubmit={handleFormSubmit}>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-[#18181b] p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Create New Board</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Board Title</label>
          <input
          ref={reference}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter board title..."
            className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={isClose}
            className="rounded-lg px-4 py-2 text-gray-300 transition hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Create Board
          </button>
        </div>
      </div>
    </div>
    </form>
    )
}
export default CreateBoardModel;