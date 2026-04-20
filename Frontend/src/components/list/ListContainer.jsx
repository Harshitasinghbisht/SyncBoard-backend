import { useEffect, useState } from "react";
import CardForm from "../card/CardForm";
import TaskCard from "../card/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, updateList } from "../../Thunks/listThunks.js";
import { createCard, getAllCard } from "../../Thunks/cardThunks.js";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

function ListContainer({ list }) {
  const [taskOpen, setTaskOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const [orderedCards, setOrderedCards] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.list);
  const { cardsByList } = useSelector((state) => state.card);

  const listId = list._id;
  const listCards = cardsByList[listId] || [];

  // fetch cards
  useEffect(() => {
    if (listId) {
      dispatch(getAllCard(listId));
    }
  }, [dispatch, listId]);

  // sync redux → local state
  useEffect(() => {
    setOrderedCards(listCards);
  }, [listCards]);

  // create task
  const handleCreateTask = (title, description) => {
    dispatch(createCard({ listId, title, description }));
    setTaskOpen(false);
  };

  // delete list
  const handleDelete = () => {
    dispatch(deleteList(list._id));
  };

  // edit list
  const handleSave = () => {
    if (!editTitle.trim()) return;
    dispatch(updateList({ listId: list._id, title: editTitle }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(list.title);
    setIsEditing(false);
  };

  // drag end (reorder logic)
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    if (active.id === over.id) return;

    setOrderedCards((items) => {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      if (oldIndex === -1 || newIndex === -1) return items;

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  // edit mode
  if (isEditing) {
    return (
      <div className="w-72 bg-[#1e293b] rounded-xl p-4">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white mb-3"
        />

        <button
          className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white mr-2"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    );
  }

  // normal view
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={orderedCards.map((card) => card._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="w-72 bg-[#1e293b] rounded-xl p-4">
          <h2 className="text-white font-semibold mb-3">{list.title}</h2>

          <div className="space-y-3">
            {orderedCards.map((task, index) => (
              <TaskCard key={task._id} card={task} index={index} />
            ))}
          </div>

          <button
            onClick={() => setTaskOpen(true)}
            className="flex w-full justify-center border-2 border-dashed border-slate-600 px-4 py-3 mt-4 text-sm text-slate-300"
          >
            + Add Task
          </button>

          <CardForm
            isTaskOpen={taskOpen}
            isTaskClose={() => setTaskOpen(false)}
            onCreatedTask={handleCreateTask}
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="border px-3 py-1 text-sm text-white"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="border px-3 py-1 text-sm text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ListContainer;