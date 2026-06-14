import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardCard({ board, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="relative cursor-pointer rounded-2xl border border-gray-700 bg-[#23262d] p-5 text-white shadow transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
      onClick={() => navigate(`/board/${board._id}`)}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">
          {board?.title}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          className="rounded p-1 hover:bg-gray-700"
        >
          ⋮
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-4 top-12 z-10 w-32 rounded-lg border border-gray-700 bg-[#18181b] shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
              onEdit(board);
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);

              const confirmed = window.confirm(
                "Are you sure you want to delete this board?"
              );

              if (confirmed) {
                onDelete(board._id);
              }
            }}
            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-700"
          >
            Delete
          </button>
        </div>
      )}

      <p className="mt-2 text-sm text-gray-400">
        Updated - {new Date(board.updatedAt).toLocaleString()}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Open
        </span>
      </div>
    </div>
  );
}

export default BoardCard;