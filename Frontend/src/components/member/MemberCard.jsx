import { useDispatch, useSelector } from "react-redux";
import { removeMember } from "../../Thunks/boardThunks";

function MemberCard({ name, email, role, isOwner ,memberId }) {
  const dispatch=useDispatch();
  const {currentBoard}=useSelector((state)=>state.board)
  const boardId=currentBoard._id;
  
  const handleRemove = () => {
    dispatch(removeMember({boardId,memberId}))
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3">
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">{name}</h3>
        <p className="truncate text-xs text-slate-400">{email}</p>
      </div>

      <div className="ml-4 flex items-center gap-3">
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            role === "owner"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {role}
        </span>

        {isOwner && role !== "owner" && (
          <button
            onClick={handleRemove}
            className="rounded-md bg-red-500/80 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default MemberCard;