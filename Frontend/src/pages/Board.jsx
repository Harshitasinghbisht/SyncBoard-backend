import { useEffect, useState } from "react";
import ListContainer from "../components/list/ListContainer";
import ListForm from "../components/list/ListForm";
import { useDispatch , useSelector } from "react-redux";
import { getSingleBoard } from "../Thunks/boardThunks.js";
import { useParams } from "react-router-dom";
import {createList,getAllList} from "../Thunks/listThunks.js";
import BoardMemberSection from "../components/member/BoardMemberSection.jsx";
import { arrayMove } from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";

function Board() {
  const { loading, currentBoard, error } = useSelector((state) => state.board);
  const { lists } = useSelector((state) => state.list);
  const { cardsByList: reduxCardsByList } = useSelector((state) => state.card);

  const dispatch = useDispatch();
  const { boardId } = useParams();

  const [openList, setopenList] = useState(false);
  const [sourceListId, setSourceListId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
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
    setopenList(false);
  };

  const handleDragStart = (e) => {
    const { active } = e;
    if (!active) return;

    setActiveCard(active.id);
    setSourceListId(active.data.current?.listId);
  };

  const handleDrageOver = (e) => {
    const { active, over } = e;
    if (!over) return;

    const sourceListId = active.data.current?.listId;
    const activeId = active.id;
    const overId = over.id;

    let destinationListId;

    if (over.data.current?.type === "card") {
      destinationListId = over.data.current.listId;
    } else if (over.data.current?.type === "list") {
      destinationListId = over.id;
    }

    if (!sourceListId || !destinationListId) return;
    if (sourceListId === destinationListId) return;

    setCardsByList((prev) => {
      const sourceCard = [...(prev[sourceListId] || [])];
      const destCard = [...(prev[destinationListId] || [])];

      const activeIndex = sourceCard.findIndex((card) => card._id === activeId);
      if (activeIndex === -1) return prev;

      const movedCard = sourceCard[activeIndex];

      sourceCard.splice(activeIndex, 1);

      let overIndex = destCard.findIndex((card) => card._id === overId);
      if (overIndex === -1) {
        overIndex = destCard.length;
      }

      destCard.splice(overIndex, 0, movedCard);

      return {
        ...prev,
        [sourceListId]: sourceCard,
        [destinationListId]: destCard,
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveCard(null);
      setSourceListId(null);
      return;
    }

    const sourceId = sourceListId;
    let destinationListId;

    if (over.data.current?.type === "card") {
      destinationListId = over.data.current.listId;
    } else if (over.data.current?.type === "list") {
      destinationListId = over.id;
    }

    if (!sourceId || !destinationListId) {
      setActiveCard(null);
      setSourceListId(null);
      return;
    }

    if (sourceId === destinationListId) {
      setCardsByList((prev) => {
        const currentItems = prev[sourceId] || [];

        const oldIndex = currentItems.findIndex((item) => item._id === active.id);
        const newIndex = currentItems.findIndex((item) => item._id === over.id);

        if (oldIndex === -1 || newIndex === -1) return prev;

        return {
          ...prev,
          [sourceId]: arrayMove(currentItems, oldIndex, newIndex),
        };
      });
    }

    setActiveCard(null);
    setSourceListId(null);
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
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDrageOver}
    >
      <main className="min-h-screen bg-[#0f172a] px-5 py-5 text-white">
        <div className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-xl font-semibold tracking-wide">Board</h1>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{currentBoard?.title}</h2>
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
              onClick={() => setopenList(true)}
              className="flex w-72 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/60 px-4 py-5 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white"
            >
              <span className="text-lg leading-none">+</span>
              <span>Create new list</span>
            </button>

            <ListForm
              isopen={openList}
              isclose={() => {
                setopenList(false);
              }}
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