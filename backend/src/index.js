import dotenv from 'dotenv';
import express from "express";
import db from './utils/db.js';
import cors from "cors";
import cookieParser from 'cookie-parser';
import http from "http";
import { initSocket } from './utils/socket.js';


//importing all the routes

import router from "./routes/user.routes.js"
import boardRouter from './routes/board.routes.js';
import listRouter from './routes/list.routes.js';
import cardRouter from './routes/card.routes.js';


dotenv.config()
const app=express();
const server=http.createServer(app);

app.use(cors({
    origin:process.env.FRONTEND_BASE_URL,
    credentials:true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
    allowedHeaders:['Content-Type','Authorization']
}));   // for the cors error solution due to front end and backend located in 
// differnt place due to which error came

app.use(express.json()); //is a middleware in Express.js used to parse JSON data sent in the request body.
app.use(express.urlencoded({extended:true}));   //is a middleware in Express.js used to parse URL-encoded data sent from forms.
app.use(cookieParser());
const port=process.env.PORT || 3000;
//connection to db
db();

app.use("/api/v1/user",router);
app.use("/api/v1/boards",boardRouter);
app.use("/api/v1/lists",listRouter);
app.use("/api/v1/cards",cardRouter);

initSocket(server);

server.listen(port,()=>{
    console.log(`app listning to port http://localhost:${port}`);
    
})


