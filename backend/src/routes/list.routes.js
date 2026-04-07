import express from "express";
import { deleteList, updateList ,reOrderList} from "../controllers/list.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import authorizeListAction from "../middlewares/isAuthorizeListAction.middleware.js";

const listRouter=express.Router();

listRouter.patch("/:listId/reorder",isLoggedIn,authorizeListAction("updateList"),reOrderList);
listRouter.patch("/:listId",isLoggedIn, authorizeListAction("updateList"), updateList);
listRouter.delete("/:listId",isLoggedIn, authorizeListAction("deleteList"),deleteList);

export default listRouter; 