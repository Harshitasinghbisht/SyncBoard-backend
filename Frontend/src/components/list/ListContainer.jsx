import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";
import { useState } from "react";
import CardForm from "../card/CardForm";
import TaskCard from "../card/TaskCard";
import { useDispatch , useSelector } from "react-redux";
import { deleteList, updateList } from "../../Thunks/listThunks.js";

function ListContainer({title,cards=[],list}) {
  const navigate=useNavigate();
  const[taskOpen,setTaskOpen]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const[tasks,setTask]=useState([]);
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>state.list)
  
  
  const handleCreateTask=(title,description)=>{
    const newTask={
      id:Date.now(),
      title:title,
      description:description 
    }

    setTask((pre)=>[...pre,newTask])
    setTaskOpen(false);
    
  }

  const handleDelete=(list)=>{
      dispatch(deleteList(list));
  }
  const handleCancel = () => {
  setIsEditing(false);
  setEditTitle(list.title);
};
const handleSave = () => {
  if (!editTitle.trim()) return;

  dispatch(updateList({ listId: list._id, title: editTitle }));
  setIsEditing(false);
};
  
  if(loading){
    return<h1>Loading...</h1>
   }
   if(error){
    return<h1>Error : {error}</h1>
   }

 if(!isEditing){
   return (
    <div className="w-72 bg-[#1e293b] rounded-xl p-4">
    <div  
    onClick={()=>navigate("/List")}>
      <h2 className="text-white font-semibold mb-3">{list.title}</h2>
        <div className="space-y-3">
          {cards.map((card)=>(
            <ListCard
           key={card.id}
           title={card.title} 
            />
          ))} 
      </div>
    </div>
    <button 
    onClick={()=>setTaskOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/60 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white">
             <span className="text-lg leading-none">+</span>
             <span>Add Task</span>
          </button>
          <CardForm
          isTaskOpen={taskOpen}
          isTaskClose={()=>{setTaskOpen(false)}}
          onCreatedTask={handleCreateTask}
          />
          {tasks.map((task)=>(
            <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            />
          ))}
  <div className="mt-3 flex gap-2">
  <button 
 onClick={() => setIsEditing(true)}
  className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#9fbfec] hover:bg-slate-700 hover:text-white">
    Update
  </button> 
  <button 
  onClick={() => handleDelete(list._id)}
  className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200">
    Delete
  </button>
</div>
  </div>
  );
 }
 return(
  <div className="w-72 bg-[#1e293b] rounded-xl p-4">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-3"
        />
   {console.log("here",list._id)}
   
          <button
          className="rounded-lg bg-green-800 hover:bg-green-600  px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#9fbfec]  hover:text-white mr-2"
          onClick={handleSave}
          >Save</button>
          <button
          className="rounded-lg border bg-gray-700 hover:bg-gray-600 px-4 py-2 text-sm font-medium text-slate-200 transition  hover:text-white"
          onClick={()=>handleCancel()}
          >Cancel</button>
      </div>
 )
} 

export default ListContainer