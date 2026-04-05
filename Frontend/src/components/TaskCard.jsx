function TaskCard({title,description}){
    return(
      <div className="cursor-pointer rounded-2xl border border-slate-700 bg-gradient-to-r from-pink-500/70 to-purple-500/70 p-2 shadow-md transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg m-3">
      
      <h3 className="text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
          Task
        </span>

        <span className="text-xs text-slate-500">
          Active
        </span>
      </div>

    </div>
    ) 
}

export default TaskCard;