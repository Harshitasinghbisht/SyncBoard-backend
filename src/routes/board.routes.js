import express from "express";
import { createBoard, getAllBoard,getSingleBoard,deleteBoard,addMember,removeMember,getAllMember } from "../controllers/board.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {isBoardMemberOrOwner} from "../middlewares/isBoardmemberOrOwner.middleware.js"
import { createList, getAllList, reOrderList } from "../controllers/list.controller.js";
 
const boardRouter=express.Router();

boardRouter.post("/",isLoggedIn,createBoard);
boardRouter.get("/",isLoggedIn,getAllBoard);
boardRouter.get("/:boardId",isLoggedIn,getSingleBoard);
boardRouter.delete("/:boardId",isLoggedIn,deleteBoard);
boardRouter.post("/:boardId/members",isLoggedIn,isBoardMemberOrOwner,addMember);
boardRouter.delete("/:boardId/members/:memberId",isLoggedIn,isBoardMemberOrOwner,removeMember);
boardRouter.get("/:boardId/members",isLoggedIn,isBoardMemberOrOwner,getAllMember)

//List routes

boardRouter.post("/:boardId/lists",isLoggedIn,isBoardMemberOrOwner,createList);
boardRouter.get("/:boardId/lists",isLoggedIn,isBoardMemberOrOwner,getAllList);
boardRouter.put("/:boardId/lists/reorder",isLoggedIn,isBoardMemberOrOwner,reOrderList);

export default boardRouter;


