import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Thunks/authThunks.js";

function LogoutBtn(){
   const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(logoutUser());
    }
    return(
<button 
type="button"
className="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium transition hover:bg-gray-900"
        onClick={handleLogout}>
            Logout
          </button>
    )
}
export default LogoutBtn;