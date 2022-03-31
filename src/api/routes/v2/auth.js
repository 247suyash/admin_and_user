import express from "express";
import  AuthController  from "../../contrallers/userAuth.js";
import { validateToken } from "../../middleware/userAuth.js";
import { handleValidationErrors } from "../../middleware/validation.js";
import { LoginValidation, RegisterValidation } from "../../validators/userAuth.js";

const userRouter = express.Router();

userRouter.post("/login" ,LoginValidation,handleValidationErrors, AuthController.login)
userRouter.post ("/register",RegisterValidation,handleValidationErrors, AuthController.register)

userRouter.post('/verify',validateToken,AuthController.verify)
userRouter.get("/verify/:id/:token",AuthController.emailVerification)

export default userRouter;
