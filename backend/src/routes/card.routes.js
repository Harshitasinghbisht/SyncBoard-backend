import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createCard,getAllCard,updateCard,deleteCard,moveCard } from "../controllers/card.controller.js";
import authorizeCardAction from "../middlewares/isAuthorizeCardAction.middleware.js";
import authorizeListAction from "../middlewares/isAuthorizeListAction.middleware.js";

const cardRouter= express.Router();

cardRouter.post("/:listId/cards",isLoggedIn, authorizeListAction("createCard"),createCard);
cardRouter.get("/:listId",isLoggedIn,authorizeListAction("viewBoard"),getAllCard);
cardRouter.patch("/:cardId",isLoggedIn,authorizeCardAction("updateCard"),updateCard);
cardRouter.delete("/:cardId",isLoggedIn,authorizeCardAction("deleteCard"),deleteCard);
cardRouter.patch("/:cardId/move",isLoggedIn,authorizeCardAction("moveCard"),moveCard)

export default cardRouter; 