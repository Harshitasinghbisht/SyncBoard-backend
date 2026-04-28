import { Server } from "socket.io"

let io;
 export const initSocket=(server)=>{
    io = new Server(server,{
        cors:{
            origin: process.env.FRONTEND_BASE_URL,
            credentials: true,
        }
    })
 

 io.on("connection",(socket)=>{
    console.log("socket connected",socket.id);

    socket.on("joinBoard",(boardId)=>{
        socket.join(boardId);
        console.log(`User joined board ${boardId}`)
    })

    socket.on("leaveBoard",(boardId)=>{
        socket.leave(boardId)
    })

    socket.on("disconnect",()=>{
        console.log(`Socket diconnect ${socket.id}`)
    })
 })
return io;
 }

 export const getIO=()=>{
    if(!io){
        throw new Error("Socket.io not initilized");
        
    }
    return io;
 }