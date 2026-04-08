import api from "./api.js"

const registerService=async(userData)=>{
        const response=await api.post("/register",userData);
              return response.data;
    }

const loginService=async(userData)=>{
    const responce=await api.post("/login",userData);
    return responce.data;
}

const getCurrentUserService=async()=>{
        const responce=await api.get("/me");
        return responce.data;
}

const logoutService=async()=>{
     const responce=await api.get("/logout")
        return responce.data;
}

const verifyService=async(token)=>{
        const responce=await api.get(`/verify/${token}`)
        return responce.data;
} 

export {registerService,getCurrentUserService,loginService,logoutService,verifyService};