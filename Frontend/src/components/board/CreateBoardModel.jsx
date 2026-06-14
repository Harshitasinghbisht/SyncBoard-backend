import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard, updateBoard } from "../../Thunks/boardThunks";

function CreateBoardModel({
  isOpen,
  isClose,
  mode = "create",
  board = null,
}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (mode === "edit" && board) {
      setTitle(board.title);
    }

    if (mode === "create") {
      setTitle("");
    }
  }, [isOpen, mode, board]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    try {
      if (mode === "create") {
        await dispatch(createBoard({ title: trimmedTitle }));
      }

      if (mode === "edit") {
        console.log("Updating board:", board._id, trimmedTitle);

        await dispatch(
          updateBoard({
            boardId: board._id,
            title: trimmedTitle,
          })
        );
      }

      setTitle("");
      isClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-2xl bg-[#18181b] p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {mode === "create"
              ? "Create New Board"
              : "Edit Board"}
          </h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Board Title
            </label>

            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter board title..."
              className="rounded-lg border border-gray-600 bg-[#1f2937] px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={isClose}
              className="rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              {mode === "create"
                ? "Create Board"
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateBoardModel;