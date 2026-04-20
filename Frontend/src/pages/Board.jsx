import { useEffect, useState } from "react";
import ListContainer from "../components/list/ListContainer";
import ListForm from "../components/list/ListForm";
import { useDispatch , useSelector } from "react-redux";
import { getAllMember, getSingleBoard } from "../Thunks/boardThunks.js";
import { useParams } from "react-router-dom";
import {createList,getAllList} from "../Thunks/listThunks.js"
import BoardMemberSection from "../components/member/BoardMemberSection.jsx";


function Board() {
  const {loading , currentBoard,error}=useSelector((state)=>state.board);
   const dispatch=useDispatch();
   const {boardId}=useParams();
   
  useEffect(() => {
    if (boardId) {
      dispatch(getSingleBoard(boardId));
      dispatch(getAllList(boardId));
    }

  }, [dispatch, boardId]);
    const {lists}=useSelector((state)=>state.list);
   const[openList,setopenList]=useState(false);
   
   const handleCreateList=(title)=>{
    console.log(boardId)
    dispatch(createList({boardId,title}));
    setopenList(false);
   } 

    if(loading){
    return<h1>Loading...</h1>
   }
   if(error){
    return<h1>Error : {error}</h1>
   }
  return (
    <main 
    className="min-h-screen bg-[#0f172a] px-5 py-5 text-white">
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-xl font-semibold tracking-wide">Board</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{currentBoard?.title}</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your lists and track your tasks.
          </p>
        </div>
      </div>
     {/* Members Section */}
         <section className="mb-8">
        <BoardMemberSection boardId={boardId} />
      </section>
      <section className="pb-4">
        <div className="flex flex-wrap gap-4">
          <button 
          onClick={() => setopenList(true)}
          className="flex w-72 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/60 px-4 py-5 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white">
             <span className="text-lg leading-none">+</span>
             <span>Create new list</span>
          </button>
          <ListForm
          isopen={openList}
          isclose={()=>{setopenList(false)}}
          onCreateList={handleCreateList}
          />
           {lists.map((list)=>(
            <ListContainer key={list._id}
            title={list.title}
            card={list.cards}
            list={list}
            lists={lists}
            />
          ))}
        </div>
      </section> 
    </main>
  );
}
// make flow from the component to dispatchng thunks and throung thunk call service  and then to backend
export default Board;