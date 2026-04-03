import express from "express";
import { createBoard, getAllBoard,getSingleBoard,deleteBoard,addMember,removeMember,getAllMember } from "../controllers/board.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createList, getAllList } from "../controllers/list.controller.js";
import authorizeBoardAction from "../middlewares/isAuthorizeBoardAction.middleware.js"
 
const boardRouter=express.Router();

boardRouter.post("/",isLoggedIn,createBoard);
boardRouter.get("/",isLoggedIn,getAllBoard);
boardRouter.get("/:boardId",isLoggedIn,authorizeBoardAction("viewBoard"),getSingleBoard);
boardRouter.delete("/:boardId",isLoggedIn,authorizeBoardAction("deleteBoard"),deleteBoard);
boardRouter.post("/:boardId/members",isLoggedIn,authorizeBoardAction("inviteMember"),addMember);
boardRouter.delete("/:boardId/members/:memberId",isLoggedIn,authorizeBoardAction("removeMember"),removeMember);
boardRouter.get("/:boardId/members",isLoggedIn,authorizeBoardAction("viewBoard"),getAllMember)

//List routes

boardRouter.post("/:boardId/lists",isLoggedIn,authorizeBoardAction("createList"),createList);
boardRouter.get("/:boardId/lists",isLoggedIn,authorizeBoardAction("viewBoard"),getAllList);


export default boardRouter;


