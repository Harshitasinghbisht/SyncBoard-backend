import BoardCard from "../components/BoardCard";

function Dashboard() {
  return (
    <main className="m-5 rounded-2xl border border-gray-800 bg-[#18181b] px-6 py-5 text-white">
      <div className="border-b border-gray-700 pb-3">
        <h1 className="text-xl font-semibold tracking-wide">SyncBoard Workspace</h1>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Hi, User</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your boards and track your work here.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-medium text-gray-200">Your Boards</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <BoardCard />
  <BoardCard />
  <BoardCard />

  <button className="flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-600 bg-[#232326] text-gray-300 transition hover:border-blue-500 hover:text-white">
    + Create New Board
  </button>
</div>
      </div>
    </main>
  );
}

export default Dashboard;