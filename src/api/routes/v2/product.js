import express from "express";
import userProduct from "../../contrallers/userProduct.js";

const userProductRouter = express.Router();

userProductRouter.get('/product',userProduct.productPage)
userProductRouter.get("/card/:id",userProduct.cardPage)
export default userProductRouter;
