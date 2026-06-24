import { useEffect, useRef, useState } from "react";
import ListContainer from "../components/list/ListContainer";
import ListForm from "../components/list/ListForm";
import BoardMemberSection from "../components/member/BoardMemberSection.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getSingleBoard } from "../Thunks/boardThunks.js";
import { createList, getAllList } from "../Thunks/listThunks.js";
import { moveCard, updateCard } from "../Thunks/cardThunks.js";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { socket } from "../components/socket/socket.js";
import { cardMovedRealtime ,cardCreatedRealtime,cardUpdatedRealTime,cardDeleteRealTime} from "../redux/cardSlice.js";
import { createListRealTime ,updateListRealTime,deleteListRealTime} from "../redux/listSlice.js";
import { addMemberRealTime,removeMemberRealTime } from "../redux/boardSlice.js";
import Activity from "../components/board/Activity.jsx";
import{fetchBoardActivities} from "../Thunks/activityThunks.js"
import { addActivity } from "../redux/activitySlice.js";



function Board() {


const [showActivity, setShowActivity] = useState(false);

  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { loading, currentBoard, error } = useSelector((state) => state.board);
  const { lists = [] } = useSelector((state) => state.list);
   const { activity = [] } = useSelector(
  (state) => state.activity
);

  const { cardsByList: reduxCardsByList = {} } = useSelector(
    (state) => state.card
  );

  const [openList, setOpenList] = useState(false);
  const [cardsByList, setCardsByList] = useState({});


  const dragOriginListRef = useRef(null);
  const isDraggingRef = useRef(false);
  const draggingCardIdRef = useRef(null); // tracks WHICH card this client is dragging
  const lastOverRef = useRef(null);


  useEffect(() => {
    if (!boardId) return;

    dispatch(getSingleBoard(boardId));
    dispatch(getAllList(boardId));
  }, [dispatch, boardId]);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
  if (!currentBoard || !user) return;

  const userId = user._id || user.id;

  const isOwner = currentBoard.owner?._id?.toString() === userId?.toString();

  const isMember = currentBoard.members?.some(
    (member) => member._id?.toString() === userId?.toString()
  );

  if (!isOwner && !isMember) {
    navigate("/dashboard");
  }
   if (user?._id) {
    socket.emit("joinUser", user._id);
  }
}, [currentBoard, user, navigate]);

  useEffect(() => {
    if (isDraggingRef.current) return;

    setCardsByList(reduxCardsByList || {});
  }, [reduxCardsByList]);

 // socket useEffect for cards

 //for join and leave board
  useEffect(() => {
    if (!boardId) return;

    socket.emit("joinBoard", boardId);

    return () => {
      socket.emit("leaveBoard", boardId);
    };
  }, [boardId]);

  //for moving cards

  useEffect(() => {
    if (!boardId) return;

    const handleCardMoved = (data) => {
      // Only ignore this event if it's about the exact card THIS client
      // is currently dragging. Never block updates about other cards,
      // even while a local drag is in progress.
      if (isDraggingRef.current && data.cardId === draggingCardIdRef.current) {
        return;
      }

     
      dispatch(cardMovedRealtime(data));
    };

    socket.off("cardMoved");
    socket.on("cardMoved", handleCardMoved);

    return () => {
      socket.off("cardMoved", handleCardMoved);
    };
  }, [boardId, dispatch]);

  //for create card 

  useEffect(() => {
  const handleCardCreated = (card) => {
    dispatch(cardCreatedRealtime(card));
  };

  socket.on("cardCreated", handleCardCreated);

  return () => {
    socket.off("cardCreated", handleCardCreated);
  };
}, [dispatch]);

 
 // for update card
 useEffect(() => {
  const handleUpdateCard = (card) => {
    dispatch(cardUpdatedRealTime(card));
  };

  socket.on("updateCard", handleUpdateCard);

  return () => {
    socket.off("updateCard", handleUpdateCard);
  };
}, [dispatch]);

  // for delete card

useEffect(() => {
  const handleDeleteCard = (card) => {
    dispatch(cardDeleteRealTime(card));
  };

  socket.on("deleteCard", handleDeleteCard);

  return () => {
    socket.off("deleteCard", handleDeleteCard);
  };
}, [dispatch]);
 const handleCreateList = (title) => {
    dispatch(createList({ boardId, title }));
    setOpenList(false);
  };

  //useEffect for list

  //cerate list

  useEffect(()=>{
    const handleCreateList=(list)=>{
      dispatch(createListRealTime(list));
    };
    socket.on("createList",handleCreateList);
      return ()=>socket.off("createList",handleCreateList);
  },[dispatch])

  //update List

  useEffect(()=>{
    const handleUpdateList=(list)=>{
   dispatch(updateListRealTime(list));
    }

    socket.on("updateList",handleUpdateList);
    return()=>socket.off("updateList",handleUpdateList)
  },[dispatch])

  //deleteList

  useEffect(()=>{
    const handleDeleteList=(list)=>{
      dispatch(deleteListRealTime(list));
    }

    socket.on("deleteList",handleDeleteList);
    return()=>socket.off("deleteList",handleDeleteList);
  },[dispatch])

  //useEffect for members

 useEffect(() => {
  const handleMemberAdded = (updatedBoard) => {
    dispatch(addMemberRealTime(updatedBoard));
  };

  const handleMemberRemoved = (updatedBoard) => {
    dispatch(removeMemberRealTime(updatedBoard));
  };

  socket.on("addMember", handleMemberAdded);
  socket.on("removeMember", handleMemberRemoved);

  return () => {
    socket.off("addMember", handleMemberAdded);
    socket.off("removeMember", handleMemberRemoved);
  };
}, [dispatch]);

  const handleDragStart = ({ active }) => {
    if (!active) return;
    if (active.data.current?.type !== "card") return;

    isDraggingRef.current = true;
    draggingCardIdRef.current = active.id;
    dragOriginListRef.current = active.data.current?.listId || null;
    lastOverRef.current = null;
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    if (active.data.current?.type !== "card") return;

    const cardId = active.id;
    const overId = over.id;

    if (cardId === overId) return; // no-op self-hover, skip

    const overKey = `${cardId}-${overId}`;

    if (lastOverRef.current === overKey) return;

    lastOverRef.current = overKey;

    setCardsByList((prev) => {
      let currentListId = null;
      let destinationListId = null;

      for (const listId in prev) {
        const found = (prev[listId] || []).some(
          (card) => card._id === cardId
        );

        if (found) {
          currentListId = listId;
          break;
        }
      }

      if (over.data.current?.type === "card") {
        destinationListId = over.data.current.listId;
      } else if (over.data.current?.type === "list") {
        destinationListId = over.id;
      }

      if (!currentListId || !destinationListId) return prev;

      const currentCards = [...(prev[currentListId] || [])];
      const destinationCards = [...(prev[destinationListId] || [])];

      const activeIndex = currentCards.findIndex(
        (card) => card._id === cardId
      );

      if (activeIndex === -1) return prev;

      const movedCard = currentCards[activeIndex];

      if (currentListId === destinationListId) {
        const overIndex = currentCards.findIndex(
          (card) => card._id === overId
        );

        if (overIndex === -1 || overIndex === activeIndex) return prev;

        return {
          ...prev,
          [currentListId]: arrayMove(currentCards, activeIndex, overIndex),
        };
      }

      currentCards.splice(activeIndex, 1);

      const cleanedDestinationCards = destinationCards.filter(
        (card) => card._id !== cardId
      );

      let overIndex = cleanedDestinationCards.findIndex(
        (card) => card._id === overId
      );

      if (overIndex === -1) {
        overIndex = cleanedDestinationCards.length;
      }

      cleanedDestinationCards.splice(overIndex, 0, {
        ...movedCard,
        listId: destinationListId,
      });

      const next = {
        ...prev,
        [currentListId]: currentCards,
        [destinationListId]: cleanedDestinationCards,
      };

      // Dev-only sanity check: warns in console if a card ends up
      // duplicated across lists - the root cause of runaway re-renders.
      if (process.env.NODE_ENV !== "production") {
        const allIds = Object.values(next).flat().map((c) => c._id);
        const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
        if (dupes.length) {
          console.warn("[Board] Duplicate card IDs detected after dragOver:", dupes);
        }
      }

      return next;
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const cardId = active?.id;
    const sourceListId =
      dragOriginListRef.current || active?.data.current?.listId;

    // Reset drag state immediately - no setTimeout needed, since the
    // socket handler now filters by specific card id instead of
    // blocking all incoming updates while any drag is in progress.
    isDraggingRef.current = false;
    draggingCardIdRef.current = null;
    dragOriginListRef.current = null;
    lastOverRef.current = null;

    if (!over || active?.data.current?.type !== "card") {
      return;
    }

    let destinationListId = null;

    if (over.data.current?.type === "card") {
      destinationListId = over.data.current.listId;
    } else if (over.data.current?.type === "list") {
      destinationListId = over.id;
    }

    if (!cardId || !sourceListId || !destinationListId) {
      return;
    }

    const destinationCards = cardsByList[destinationListId] || [];

    let newPosition = destinationCards.findIndex(
      (card) => card._id === cardId
    );

    if (newPosition === -1) {
      newPosition = destinationCards.findIndex(
        (card) => card._id === over.id
      );

      if (newPosition === -1) {
        newPosition = destinationCards.length;
      }
    }

    dispatch(
      moveCard({
        cardId,
        moveData: {
          sourceListId,
          destinationListId,
          newPosition,
        },
      })
    );
  };

  //socket for activity log
  const activities = useSelector(
  (state) => state.activity.activity
);



useEffect(() => {
  if (!boardId) return;
  dispatch(fetchBoardActivities(boardId));
}, [dispatch, boardId]);

useEffect(() => {
  const handleActivity = (act) => {
    
    dispatch(addActivity(act));
  };

  socket.on("activityCreated", handleActivity);

  return () => {
    socket.off("activityCreated", handleActivity);
  };
}, [dispatch]);
 

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
     onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-screen bg-[#0f172a] px-5 py-5 text-white">
        <div className="mb-6 border-b border-gray-700 pb-6">
  <h1 className="mb-4 text-xl font-semibold tracking-wide">
    Board
  </h1>

  <div className="flex items-start justify-between">
    <div>
      <h2 className="text-3xl font-bold">
        {currentBoard?.title}
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Manage your lists and track your tasks.
      </p>
    </div>

    <button
      onClick={() => setShowActivity(!showActivity)}
      className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium transition hover:border-slate-500 hover:bg-slate-700"
    >
      Activity
    </button>
  </div>
</div>

        <section className="mb-8">
          <BoardMemberSection boardId={boardId} />
        </section>

        <section className="pb-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setOpenList(true)}
              className="flex w-72 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/60 px-4 py-5 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white"
            >
              <span className="text-lg leading-none">+</span>
              <span>Create new list</span>
            </button>

            <ListForm
              isopen={openList}
              isclose={() => setOpenList(false)}
              onCreateList={handleCreateList}
            />

            {lists.map((list) => (
              <ListContainer
                key={list._id}
                list={list}
                cards={cardsByList[list._id] || []}
              />
            ))}
          </div>
          {showActivity && (
  <div className="fixed right-0 top-0 z-50 h-screen w-96 border-l border-zinc-800 bg-[#18181b] shadow-2xl">
    <button
      onClick={() => setShowActivity(false)}
      className="absolute right-4 top-4 z-10 rounded-md p-2 text-gray-400 transition hover:bg-zinc-800 hover:text-white"
    >
      ✕
    </button>

    <div 
    className="h-full overflow-y-auto pt-14">
      <Activity activity={activities} />
    </div>
  </div>
)}
        </section>
      </main>
    </DndContext>
  );
}

export default Board;