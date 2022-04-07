import express from "express";
import orderController from "../../contrallers/placeOrder.js";
import userProduct from "../../contrallers/userProduct.js";

const userProductRouter = express.Router();

userProductRouter.get('/product',userProduct.productPage)
userProductRouter.post('/purchase',orderController.orderAction)
export default userProductRouter;
