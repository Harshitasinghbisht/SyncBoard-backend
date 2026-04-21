import { useEffect, useState } from "react";
import CardForm from "../card/CardForm";
import TaskCard from "../card/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, updateList } from "../../Thunks/listThunks.js";
import { createCard, getAllCard } from "../../Thunks/cardThunks.js";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListContainer({ list, cards = [] }) {
  const [taskOpen, setTaskOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.list);

  const listId = list._id;

  const { setNodeRef } = useDroppable({
    id: listId,
    data: {
      type: "list",
    },
  });

  useEffect(() => {
    if (listId) {
      dispatch(getAllCard(listId));
    }
  }, [dispatch, listId]);

  const handleCreateTask = (title, description) => {
    dispatch(createCard({ listId, title, description }));
    setTaskOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteList(list._id));
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    dispatch(updateList({ listId: list._id, title: editTitle }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(list.title);
    setIsEditing(false);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

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

  return (
    <SortableContext
      items={cards.map((card) => card._id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="w-72 bg-[#1e293b] rounded-xl p-4 min-h-[200px]"
      >
        <h2 className="text-white font-semibold mb-3">{list.title}</h2>

        <div className="space-y-3 min-h-[80px]">
          {cards.length > 0 ? (
            cards.map((task, index) => (
              <TaskCard
                key={task._id}
                card={task}
                listId={list._id}
                index={index}
              />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-600 p-4 text-sm text-slate-400">
              Drop task here
            </div>
          )}
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
  );
}

export default ListContainer;