import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Thunks/authThunks.js";
import { useState } from "react";

function Register(){
  const [message,setMessage]=useState("")
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })
    
    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
      console.log("formData:", formData);
       dispatch(registerUser(formData));
       
         setFormData({
            name: "",
            email: "",
            password: "",
                    });
        setMessage("Please verify your email. Check your inbox");
    }

    
    return (
    <div className="min-h-screen bg-slate-950 text-white">
      {message && (
  <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
    {message}
  </div>
)}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur md:grid-cols-2">
          
          {/* Left section */}
          <div className="hidden flex-col justify-between border-r border-slate-800 bg-slate-900/40 p-10 md:flex">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-slate-400 uppercase">
                SyncBoard
              </p>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
                Build together.
                <br />
                Organize better.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Create boards, manage lists, track tasks, and collaborate in
                real time with a workspace that feels focused and simple.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-sm text-slate-300">
                Keep your workflow clean, fast, and easy to manage.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Boards
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Lists
                </span>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Tasks
                </span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Create account</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Start managing your work with SyncBoard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-[0.99]"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <span className="cursor-pointer font-medium text-blue-400 hover:text-blue-300">
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;