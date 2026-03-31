import express from "express";
import { deleteList, updateList } from "../controllers/list.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import listAccessable from "../middlewares/isListAccessable.middleware.js";

const listRouter=express.Router();

listRouter.put("/:listId",isLoggedIn,listAccessable, updateList);
listRouter.delete("/:listId",isLoggedIn,listAccessable,deleteList);

export default listRouter; 