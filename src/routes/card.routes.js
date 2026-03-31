import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import listAccessable from "../middlewares/isListAccessable.middleware.js";
import { createCard,getAllCard,updateCard,deleteCard,moveCard } from "../controllers/card.controller.js";
import cardAccessable from "../middlewares/isCardAccessable.middleware.js";

const cardRouter= express.Router();

cardRouter.post("/:listId",isLoggedIn,listAccessable,createCard);
cardRouter.get("/:listId",isLoggedIn,listAccessable,getAllCard);
cardRouter.put("/:cardId",isLoggedIn,cardAccessable,updateCard);
cardRouter.delete("/:cardId",isLoggedIn,cardAccessable,deleteCard);
cardRouter.put("/move/:cardId",isLoggedIn,cardAccessable,moveCard)

export default cardRouter;