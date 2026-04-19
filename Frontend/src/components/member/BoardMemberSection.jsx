import { useSelector } from "react-redux";
import { useState } from "react";
import MemberForm from "./MemberForm";
import MemberList from "./MemberList";
import MemberCard from "./MemberCard";

function BoardMemberSection({ boardId }) {
  const { currentBoard } = useSelector((state) => state.board);
  const { user } = useSelector((state) => state.auth);
  const [openForm, setOpenForm] = useState(false);

  const ownerId = currentBoard?.owner?._id;
  const userId = user?.id || user?._id;

  const isOwner =
    !!ownerId && !!userId && String(ownerId) === String(userId);

  if (!currentBoard || !user) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-400">
        Loading members...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Board Members</h2>
          <p className="mt-1 text-sm text-slate-400">
            Owner + team access
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => setOpenForm((prev) => !prev)}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {openForm ? "Close" : "Add Member"}
          </button>
        )}
      </div>

      {openForm && (
        <div className="mb-4 rounded-xl border border-slate-700 bg-slate-950/60 p-3">
          <MemberForm onClose={() => setOpenForm(false)} boardId={boardId} />
        </div>
      )}

      <div className="space-y-2">
        {currentBoard?.owner && (
          <MemberCard
            name={currentBoard.owner.name}
            email={currentBoard.owner.email}
            role="owner"
            isOwner={isOwner}
          />
        )}

        <MemberList members={currentBoard?.members || []} isOwner={isOwner} />
      </div>
    </div>
  );
}

export default BoardMemberSection;