import { Router } from "express";
import authRouter from "./v1/auth.js";
import userRouter from "./v2/auth.js";
import categoryRouter from './v1/category.js'
import productRouter from "./v1/product.js";
import userProductRouter from "./v2/product.js";
import cartRouter from "./v2/cart.js";
const router = Router();

router.use("/admin", authRouter); //Admin route
router.use(categoryRouter)
router.use(productRouter)
router.use('/user',userRouter);  // user route
router.use('/user',userProductRouter)
router.use('/user',cartRouter)
export default router;
