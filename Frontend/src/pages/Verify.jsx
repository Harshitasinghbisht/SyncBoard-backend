import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyUser } from "../Thunks/authThunks";

function Verify(){
    const [status,setStatus]=useState("loading");
    const dispatch=useDispatch();
    const {token}=useParams();
    useEffect(()=>{
       if(token){
         dispatch(verifyUser(token));
         setStatus("success")
       }
       else{
        setStatus("error")
       }
    },[dispatch , token])
    return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      {status === "loading" && <p>Verifying...</p>}
      {status === "success" && <p>Email verified successfully </p>}
      {status === "error" && <p>Invalid or expired link </p>}
    </div>
    )
}

export default Verify;