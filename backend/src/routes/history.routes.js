import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import getBoardActivities from "../controllers/history.controller.js";

const historyRouter=express.Router();

historyRouter.get("/:boardId/activity",isLoggedIn, getBoardActivities);

export default historyRouter;