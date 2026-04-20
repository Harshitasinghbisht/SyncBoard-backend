import { useDispatch , useSelector } from "react-redux";
import { deleteCard, moveCard, updateCard } from "../../Thunks/cardThunks.js";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ card ,nextListId }) {
  const {loading ,error}=useSelector((state)=>state.card);
  const [isEditing ,setIsEditing]=useState(false);
  const [editTitle, setEditTitle]=useState(card.title);
  const [editDescription , setEditDescription]=useState(card.description);
  const dispatch=useDispatch();
  
  const handleUpdate=()=>{
    setIsEditing(true);
  };

  const handleDelete=()=>{
 dispatch(deleteCard({ cardId: card._id, listId: card.listId }));
}

const handleSave=()=>{
dispatch(updateCard({cardId: card._id, listId: card.listId,title:editTitle,description:editDescription}));
setIsEditing(false);
}

const handleCancle=()=>{
  setEditTitle(card.title);
  setEditDescription(card.description);
  setIsEditing(false);
}
//const handleMove=()=>{
  //const moveData={
    //sourceListId:card.listId,
    //destinationListId:nextListId,
    //newPosition:0
  //}
  //dispatch(moveCard({cardId:card._id,moveData}))
//}

//droppable logic
const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,}=useSortable({id:card._id})
 
   const style = {
  transform: transform ? CSS.Transform.toString(transform) : undefined,
  transition,
};
  if(loading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <h1>error {error}</h1>
  }
  if(!isEditing){
    return(
      <div 
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="rounded-xl bg-slate-800 p-3 shadow-sm border border-slate-700 hover:border-blue-500 hover:shadow-md cursor-pointer">
      <h3 className="text-sm font-semibold text-white">
        {card.title}
      </h3>

      {card.description && (
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          {card.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
          Task
        </span>

        <span className="text-[10px] text-slate-500">
          Active
        </span>
      </div>

      <button
      className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#9fbfec] hover:bg-slate-700 hover:text-white mr-2 mt-2"
      onClick={handleUpdate}
      >update</button>

      <button
      className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200 mr-2 mt-2"
      onClick={handleDelete}
      >delete</button>
      {/*<button
          className="rounded-lg border bg-gray-700 hover:bg-gray-600 px-4 py-2 text-sm font-medium text-slate-200 transition  hover:text-white"
          onClick={handleMove} disabled={!nextListId}
          > {nextListId ? "Move Next" : "Last List"}</button>*/}
    </div>
    )
  }
  return (  
     <div className="w-72 bg-[#1e293b] rounded-xl p-4">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-3"
        />
         <input
          type="text"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-3"
        />
   
          <button
          className="rounded-lg bg-green-800 hover:bg-green-600  px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#9fbfec]  hover:text-white mr-2"
          onClick={handleSave}
          >Save</button>
          <button
          className="rounded-lg border bg-gray-700 hover:bg-gray-600 px-4 py-2 text-sm font-medium text-slate-200 transition  hover:text-white"
          onClick={()=>handleCancle()}
          >Cancel</button>
      </div>
  );
}

export default TaskCard;