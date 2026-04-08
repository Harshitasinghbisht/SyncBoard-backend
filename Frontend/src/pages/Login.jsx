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

    const handleSubmit=(e)=>{
        e.preventDefault();
      const result=  dispatch(loginUser(formData));
         if (result.meta.requestStatus === "fulfilled") {
    navigate("/dashboard");
  } else {
    console.log("Login failed");
  }
    }
    
    return(
        <form
        onSubmit={handleSubmit}
        >
            <input
            type="text"
            placeholder="Enter Email..."
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
             <input
            type="password"
            placeholder="Enter Password..."
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
            <button>
                {loading ? "Loading..." : "Login"}
                </button>
                 {error && <p>{error}</p>}
      {isAuthenticated && <p>Welcome {user?.name}</p>}
        </form>
    )
}
export default Login;