import express from "express";
import { createHistoryLog } from "../utils/HistoryService.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import {getBoardActivities} from "../controllers/board.controller.js"

const historyRouter=express.Router();

historyRouter.get("/:boardId/activity", (req, res, next) => {
    console.log("History route hit");
    next();
}, isLoggedIn, getBoardActivities);

export default historyRouter;