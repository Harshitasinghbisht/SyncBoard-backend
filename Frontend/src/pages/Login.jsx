import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { loginUser } from "../Thunks/authThunks.js";
import {useNavigate} from "react-router-dom";

function Login(){
    const dispatch=useDispatch(); 
    const navigate=useNavigate();
    const {loading , error , isAuthenticated , user}=useSelector(
        (state)=>state.auth
    )
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setFormData((pre)=>({
            ...pre,
            [e.target.name]:  e.target.value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
     
  const result = await dispatch(loginUser(formData));
      console.log(result.meta.requestStatus);
         if (result.meta.requestStatus === "fulfilled") {
    navigate("/dashboard");
  } else {
    console.log("Login failed");
  }
    }
    
    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
       <form
  onSubmit={handleSubmit}
  className="w-full max-w-md space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg backdrop-blur"
>
  <h2 className="text-xl font-semibold text-white">Login</h2>

  {/* Email */}
  <div>
    <label className="mb-1 block text-sm text-slate-400">Email</label>
    <input
      type="text"
      placeholder="Enter email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#9fbfec] focus:ring-2 focus:ring-[#9fbfec]/20"
    />
  </div>

  {/* Password */}
  <div>
    <label className="mb-1 block text-sm text-slate-400">Password</label>
    <input
      type="password"
      placeholder="Enter password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#9fbfec] focus:ring-2 focus:ring-[#9fbfec]/20"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full rounded-lg bg-[#9fbfec] px-4 py-2.5 text-sm font-medium text-slate-900 transition-all duration-200 hover:bg-[#8db3e5] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

  {/* Error */}
  {error && (
    <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
      {error}
    </p>
  )}

  {/* Success */}
  {isAuthenticated && (
    <p className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-400">
      Welcome {user?.name}
    </p>
  )}
</form> </div>
    )
}
export default Login;