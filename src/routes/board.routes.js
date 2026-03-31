import express from "express";
import { createBoard, getAllBoard,getSingleBoard,deleteBoard,addMember,removeMember,getAllMember } from "../controllers/board.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createList, getAllList, reOrderList } from "../controllers/list.controller.js";
import boardMemberOrOwner from "../middlewares/isBoardmemberOrOwner.middleware.js";
 
const boardRouter=express.Router();

boardRouter.post("/",isLoggedIn,createBoard);
boardRouter.get("/",isLoggedIn,getAllBoard);
boardRouter.get("/:boardId",isLoggedIn,getSingleBoard);
boardRouter.delete("/:boardId",isLoggedIn,deleteBoard);
boardRouter.post("/:boardId/members",isLoggedIn,boardMemberOrOwner,addMember);
boardRouter.delete("/:boardId/members/:memberId",isLoggedIn,boardMemberOrOwner,removeMember);
boardRouter.get("/:boardId/members",isLoggedIn,boardMemberOrOwner,getAllMember)

//List routes

boardRouter.post("/:boardId/lists",isLoggedIn,boardMemberOrOwner,createList);
boardRouter.get("/:boardId/lists",isLoggedIn,boardMemberOrOwner,getAllList);
boardRouter.put("/:boardId/lists/reorder",isLoggedIn,boardMemberOrOwner,reOrderList);

export default boardRouter;


