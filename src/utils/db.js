import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db=()=>{
    mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database is connected")
})
.catch((err)=>{
    console.log("database is not connected to the sever")
})
}


export default db;