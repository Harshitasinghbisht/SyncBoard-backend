import { useState , useRef, useEffect} from "react";

function ListForm({isopen,isclose,onCreateList}){
    if (!isopen) return null;
const[title,setTitle]=useState("");
const reference=useRef(null);
useEffect(()=>{
  if(isopen && reference.current){
    reference.current.focus();
  }
})
const handleSubmit=(e)=>{
    e.preventDefault();
    if(!title.trim()) return;
        onCreateList(title);
         setTitle("")
        isclose();
} 
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-[#18181b] p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Create New List</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">List Title</label>
          <input
            ref={reference}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter List title..."
            className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div> 

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={isclose}
            className="rounded-lg px-4 py-2 text-gray-300 transition hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Create List
          </button>
        </div>
      </div>
    </div>
    )
}

export default ListForm;