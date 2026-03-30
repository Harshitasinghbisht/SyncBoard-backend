import express from "express";
import { deleteList, updateList } from "../controllers/list.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import isListAccessable from "../middlewares/isListAccessable.middleware.js";

const listRouter=express.Router();

listRouter.put("/:listId",isLoggedIn,isListAccessable, updateList);
listRouter.delete("/:listId",isLoggedIn,isListAccessable,deleteList);

export default listRouter;