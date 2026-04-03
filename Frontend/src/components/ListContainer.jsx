import ListCard from "./ListCard";

function ListContainer() {
  return (
    <div className="w-72 bg-[#1e293b] rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">Todo</h2>

      <div className="space-y-3">
        <ListCard />
        <ListCard />
        <ListCard/>
      </div>
    </div>
  );
}

export default ListContainer