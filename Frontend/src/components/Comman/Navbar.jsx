import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Thunks/authThunks.js";
import {Link, useNavigate} from "react-router-dom"
import LogoutBtn from "./LogoutBtn.jsx";
import Theme from "./Theme.jsx";
function Navbar() {
 const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate=useNavigate();
console.log(isAuthenticated);
  const navItem=[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Signin",
      slug:"/signin",
      active:!isAuthenticated
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!isAuthenticated
    },
    {
      name:"Dashboard",
      slug:"/dashboard",
      active:isAuthenticated
    },
    {
      name:"Board-Details",
      slug:"/board",
      active:isAuthenticated
    }

  ]
  return (
    <header className="sticky top-0 z-50 px-3 py-2">
      <div className="mx-auto flex h-16 items-center justify-between rounded-2xl border border-gray-800 bg-[#1f2937] px-5 text-white shadow-md">
        
        <div className="flex items-center gap-3">
          <svg
            width="36"
            height="40"
            viewBox="0 0 36 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 15V31H5C5.52527 31 6.04541 31.1035 6.53076 31.3045C7.01599 31.5055 7.45703 31.8001 7.82837 32.1716C8.19983 32.543 8.49451 32.984 8.69556 33.4693C8.89648 33.9546 9 34.4747 9 35V40H21L36 25V9H31C30.4747 9 29.9546 8.89655 29.4692 8.69553C28.984 8.49451 28.543 8.19986 28.1716 7.82843C27.8002 7.457 27.5055 7.01602 27.3044 6.53073C27.1035 6.04544 27 5.5253 27 5V0H15L0 15ZM17 30H10V19L19 10H26V21L17 30Z"
              fill="#0004E8"
            />
          </svg>

          <h1 className="text-lg font-semibold tracking-wide">SyncBoard</h1>
        </div>

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-3">
{navItem.map((item)=>item.active && (
  <li 
  key={item.name}>
    <button
    className="rounded-lg border border-gray-500 px-4 py-2 text-sm font-medium transition hover:bg-gray-900"
    onClick={()=>navigate(item.slug)}
    >{item.name}</button>
  </li>
))}
{isAuthenticated  && (<li>
    <LogoutBtn/>
    </li>)}
    <li><Theme/></li>
</ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;