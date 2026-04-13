
function ListCard({title}){
  
    return(
         <div className="cursor-pointer rounded-2xl border border-gray-700 bg-[#334155] p-5 text-white shadow transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg">
      <div className="flex h-full flex-col justify-between">
        <div>  
          <h3 className="text-lg font-semibold">List</h3>
          <p className="mt-2 text-sm text-gray-400">
            {title} 
          </p> 
        </div> 
        
        <div className="mt-6 flex items-center justify-between">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
            Active
          </span>
          <span className="text-sm text-gray-500">Open</span>
        </div>
      </div>
    </div> 
    )
}

export default ListCard;