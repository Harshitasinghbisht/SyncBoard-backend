
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Thunks/authThunks.js";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const navigate=useNavigate();
   const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(logoutUser());
        navigate("/");
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