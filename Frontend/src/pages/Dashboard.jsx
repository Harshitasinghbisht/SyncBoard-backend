import BoardCard from "../components/board/BoardCard";
import { useState ,useEffect} from "react";
import CreateBoardModel from "../components/board/CreateBoardModel";
import { useNavigate } from "react-router-dom";
import { getAllBoard } from "../Thunks/boardThunks";
import { useSelector ,useDispatch} from "react-redux";

function Dashboard() {
  const {loading ,error,boards}=useSelector((state)=>{ return state.board});
  const dispatch=useDispatch();

  const[modelOpen,setModelOpen]=useState(false);
  const[createboards,setBoard]=useState([]);
  const navigate=useNavigate();
  const user=useSelector((state)=>{state.auth.user})
  if(!user){
    console.log("user did not exist")
  }

  useEffect(()=>{
    dispatch(getAllBoard)
  },[dispatch])

const handleCreateBoard=(title)=>{
  const newBoard={
    id:Date.now(),
    title:title,
     taskCount: 0, 
    updatedAt: "just now",
    status: "Active",
  }

  setBoard((pre)=>[...pre , newBoard]);
  setModelOpen(false);
}
  return (
    <main 
    className="m-5 rounded-2xl border border-gray-800 bg-[#18181b] px-6 py-5 text-white">
      <div className="border-b border-gray-700 pb-3">
        <h1 className="text-sm font-medium tracking-[0.2em] text-white-400 uppercase">SyncBoard Workspace</h1>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Hi, ${user.name}</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your boards and track your work here.
          </p>
        </div> 
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium text-gray-200">Your Boards</h3>
         {loading && <p className="text-sm text-gray-400">Loading boards...</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

  <button 
  onClick={()=>setModelOpen(true)}
  className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 bg-[#232326] text-gray-300 transition hover:border-blue-500 hover:text-white">
    + Create New Board
  </button>
  <CreateBoardModel
  isOpen={modelOpen} 
  isClose={() => setModelOpen(false)} 
  onCreateBoard={handleCreateBoard}
  />
</div>
      </div>
      
   <div className="grid grid-cols-3 gap-4 mt-6">
        {createboards.map((board) => (
          <BoardCard key={board.id}
    title={board.title}
    taskCount={board.taskCount}
    updatedAt={board.updatedAt}
    status={board.status} 
    onClick={()=>navigate("/Board")}
    />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;