import { useState } from "react";

function CardForm({isTaskOpen,isTaskClose,onCreatedTask}){
 
  const[title,setTitle]=useState("");
  const[description,setDescription]=useState("");
  const handleSubmit=(e)=>{
     e.preventDefault();
    if(!title.trim() || !description.trim()) return;
        onCreatedTask(title,description);
   
        setTitle("")
        setDescription("")

         isTaskClose(); 
  }
  if (!isTaskOpen) return null;
    return(
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-[#18181b] p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Create New Task</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter List title..."
            className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
           <label className="text-sm font-medium text-gray-300">Task Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter List title..."
            className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
          type="button"
            onClick={isTaskClose}
            className="rounded-lg px-4 py-2 text-gray-300 transition hover:bg-gray-700"
          >
            Cancel
          </button> 

          <button
          type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Create Task
          </button>
        </div>
      </div>
    </div></form>
    ) 
}

export default CardForm;