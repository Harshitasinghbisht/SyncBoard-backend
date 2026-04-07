import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { loginUser } from "../Thunks/authThunks.js";

function Login(){
    const dispatch=useDispatch();
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
        dispatch(loginUser(formData))
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