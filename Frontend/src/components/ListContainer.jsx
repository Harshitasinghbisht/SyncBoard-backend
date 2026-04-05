import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";


function ListContainer({title,cards=[]}) {
  const navigate=useNavigate();
  return (
    <div 
    onClick={()=>navigate("/List")}
    className="w-72 bg-[#1e293b] rounded-xl p-4">
      <h2 className="text-white font-semibold mb-3">{title}</h2>
        <div className="space-y-3">
          {cards.map((card)=>(
            <ListCard
           key={card.id}
           title={card.title}
            />
          ))}
      </div>
    </div>
  );
} 

export default ListContainer