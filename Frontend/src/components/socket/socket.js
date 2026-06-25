import {io} from "socket.io-client";

export const socket=io( "https://syncboard-backend-fgmb.onrender.com",{
    withCredentials:true
})