import { Server } from "socket.io"

let io;
 export const initSocket=(server)=>{
    io = new Server(server,{
        cors:{
            origin: [
        "http://localhost:5173",
         "https://sync-board-v1.vercel.app"
      ],
            credentials: true,
        }
    })
 

 io.on("connection",(socket)=>{
   
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