import ListContainer from "../components/ListContainer";

function Board() {
  return (
    <main className="min-h-screen bg-[#0f172a] px-5 py-5 text-white">
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-xl font-semibold tracking-wide">Board</h1>

        <div className="mt-4">
          <h2 className="text-2xl font-bold">Board Title</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your lists and track your tasks.
          </p>
        </div>
      </div>

      <section className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          <ListContainer />
          <ListContainer />
          <ListContainer />
          <button className="flex w-72 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 bg-slate-800/60 px-4 py-5 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-slate-800 hover:text-white">
             <span className="text-lg leading-none">+</span>
             <span>Create new list</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Board;