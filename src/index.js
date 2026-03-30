import dotenv from 'dotenv';
import express from "express";
import db from './utils/db.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


//importing all the routes

import router from "./routes/user.routes.js"
import boardRouter from './routes/board.routes.js';
import listRouter from './routes/list.routes.js';


dotenv.config()
const app=express();

app.use(cors({
    origin:process.env.BASE_URL,
    credentials:true,
    method:['GET','POST','DELETE','OPTIONS'],
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
app.use("/api/v1/lists",listRouter)

app.listen(port,()=>{
    console.log(`app listning to port http://localhost:${port}`);
    
})


