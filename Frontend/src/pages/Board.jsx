import { useEffect, useState } from "react";
import ListContainer from "../components/list/ListContainer";
import ListForm from "../components/list/ListForm";
import { useDispatch, useSelector } from "react-redux";
import { getSingleBoard } from "../Thunks/boardThunks.js";
import { useParams } from "react-router-dom";
import { createList, getAllList } from "../Thunks/listThunks.js";
import BoardMemberSection from "../components/member/BoardMemberSection.jsx";
import { arrayMove } from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { moveCard } from "../Thunks/cardThunks.js";
import { useRef } from "react";

function Board() {
  const { loading, currentBoard, error } = useSelector((state) => state.board);
  const { lists } = useSelector((state) => state.list);
  const { cardsByList: reduxCardsByList } = useSelector((state) => state.card);

  const dispatch = useDispatch();
  const { boardId } = useParams();
  const dragOriginListRef = useRef(null);
  const isDraggingRef=useRef(false);

  const [openList, setOpenList] = useState(false);
  const [cardsByList, setCardsByList] = useState({});

  useEffect(() => {
    if (boardId) {
      dispatch(getSingleBoard(boardId));
      dispatch(getAllList(boardId));
    }
  }, [dispatch, boardId]);

  useEffect(() => {
    setCardsByList(reduxCardsByList || {});
  }, [reduxCardsByList]);

  const handleCreateList = (title) => {
    dispatch(createList({ boardId, title }));
    setOpenList(false);
  };

  const handleDragStart = ({ active }) => {
  if (!active) return;
  if (active.data.current?.type !== "card") return;
  isDraggingRef.current = true;
  dragOriginListRef.current = active.data.current?.listId || null;
};

  const handleDragOver = ({ active, over }) => {
  if (!over) return;
  if (active.data.current?.type !== "card") return;

  const cardId = active.id;

  setCardsByList((prev) => {
    let currentListId = null;
    let destinationListId = null;

    // find card's CURRENT visual list from latest local state
    for (const listId in prev) {
      if ((prev[listId] || []).some((card) => card._id === cardId)) {
        currentListId = listId;
        break;
      }
    }

    // find destination list
    if (over.data.current?.type === "card") {
      destinationListId = over.data.current.listId;
    } else if (over.data.current?.type === "list") {
      destinationListId = over.id;
    }

    if (!currentListId || !destinationListId) return prev;

    const currentCards = [...(prev[currentListId] || [])];
    const destinationCards = [...(prev[destinationListId] || [])];

    const activeIndex = currentCards.findIndex((card) => card._id === cardId);
    if (activeIndex === -1) return prev;

    const movedCard = currentCards[activeIndex];

    // same list reorder preview
    if (currentListId === destinationListId) {
      const overIndex = currentCards.findIndex((card) => card._id === over.id);

      if (overIndex === -1 || overIndex === activeIndex) return prev;

      return {
        ...prev,
        [currentListId]: arrayMove(currentCards, activeIndex, overIndex),
      };
    }

    // cross-list preview
    currentCards.splice(activeIndex, 1);

    const cleanedDestinationCards = destinationCards.filter(
      (card) => card._id !== cardId
    );

    let overIndex = cleanedDestinationCards.findIndex(
      (card) => card._id === over.id
    );

    if (overIndex === -1) {
      overIndex = cleanedDestinationCards.length;
    }

    cleanedDestinationCards.splice(overIndex, 0, {
      ...movedCard,
      listId: destinationListId,
    });

    return {
      ...prev,
      [currentListId]: currentCards,
      [destinationListId]: cleanedDestinationCards,
    };
  });
};

 const handleDragEnd = ({ active, over }) => {
  if (!over) {
    dragOriginListRef.current = null;
    return;
  }

  if (active.data.current?.type !== "card") {
    dragOriginListRef.current = null;
    return;
  }

  const cardId = active.id;

  // ORIGINAL source for backend
  const sourceListId = dragOriginListRef.current || active.data.current?.listId;

  let destinationListId = null;

  if (over.data.current?.type === "card") {
    destinationListId = over.data.current.listId;
  } else if (over.data.current?.type === "list") {
    destinationListId = over.id;
  }

  if (!cardId || !sourceListId || !destinationListId) {
    dragOriginListRef.current = null;
    return;
  }

  const destinationCards = cardsByList[destinationListId] || [];

  let newPosition = destinationCards.findIndex((card) => card._id === cardId);

  if (newPosition === -1) {
    newPosition = destinationCards.findIndex((card) => card._id === over.id);

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
  isDraggingRef.current=false;
  dragOriginListRef.current = null;
};

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error : {error}</h1>;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="min-h-screen bg-[#0f172a] px-5 py-5 text-white">
        <div className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-xl font-semibold tracking-wide">
            Board
          </h1>

          <div className="mt-4">
            <h2 className="text-2xl font-bold">
              {currentBoard?.title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your lists and track your tasks.
            </p>
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
        </section>
      </main>
    </DndContext>
  );
}

export default Board;
