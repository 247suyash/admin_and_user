import express from "express";
import cartController from "../../contrallers/cart.js";
import { validateToken } from "../../middleware/userAuth.js";

const cartRouter = express.Router();


cartRouter.post('/addtocart',cartController.cartAction)

export default cartRouter;
