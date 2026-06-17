import { Clock } from "lucide-react";


function Activity({ activity = [] }){
  console.log("Redux activity state:", activity);
    return(
       <div className="h-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-3 border-b border-zinc-800 pb-3">
        <Clock size={18} />
        <h2 className="text-lg font-semibold text-white">
          Activity Log
        </h2>
      </div>

      {activity.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-700 py-8 text-center text-sm text-zinc-500">
          No activity found.
        </p>
      ) : (
        <div className="space-y-2 overflow-y-auto">
          {activity.map((act) => (
            <div
              key={act._id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <p className="text-sm leading-relaxed text-zinc-100">
                <span className="font-semibold text-violet-400">
                  {act.user?.name}
                </span>{" "}
                {act.action}
              </p>

              <p className="mt-2 text-xs font-medium tracking-wide text-zinc-500">
                {new Date(act.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    )
}

export default Activity