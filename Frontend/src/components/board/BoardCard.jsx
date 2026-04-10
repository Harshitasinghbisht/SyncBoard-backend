
import { useNavigate } from "react-router-dom";


function BoardCard({ board}) {
const navigate=useNavigate();
  return ( 
   <div 
   onClick={()=>navigate(`/board/${board._id}`)}> <div
    className="cursor-pointer rounded-2xl border border-gray-700 bg-[#23262d] p-5 text-white shadow transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{board?.title}</h3>
          <p className="mt-2 text-sm text-gray-400">
             Updated - {new Date(board.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">Open</span>
        </div>
      </div>
    </div></div>
  );
}

export default BoardCard;