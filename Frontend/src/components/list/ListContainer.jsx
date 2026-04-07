import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";
import { useState } from "react";
import CardForm from "../card/CardForm";
import TaskCard from "../card/TaskCard";

function ListContainer({title,cards=[]}) {
  const navigate=useNavigate();
  const[taskOpen,setTaskOpen]=useState(false);
  const[tasks,setTask]=useState([]);

  const handleCreateTask=(title,description)=>{
    const newTask={
      id:Date.now(),
      title:title,
      description:description
    }

    setTask((pre)=>[...pre,newTask])
    setTaskOpen(false);
    
  }
  return (
    <div className="w-72 bg-[#1e293b] rounded-xl p-4">
    <div  
    onClick={()=>navigate("/List")}>
      <h2 className="text-white font-semibold mb-3">{title}</h2>
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
    </div>
  );
} 

export default ListContainer