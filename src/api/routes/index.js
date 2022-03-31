import { Router } from "express";
import authRouter from "./v1/auth.js";
import userRouter from "./v2/auth.js";

const router = Router();

router.use("/admin", authRouter); //Admin route

router.use('/user',userRouter);  // user route

export default router;
