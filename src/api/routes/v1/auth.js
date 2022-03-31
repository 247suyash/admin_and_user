import express from "express";
import data from "../../contrallers/adminData.js";
import  AuthController  from "../../contrallers/auth.js";
import { validateToken } from "../../middleware/auth.js";
import { handleValidationErrors } from "../../middleware/validation.js";
import { adminRegisterValidation, LoginValidation } from "../../validators/auth.js";
import { paginationValidation } from "../../validators/pagination.js";

const authRouter = express.Router();

authRouter.post("/login", LoginValidation,handleValidationErrors ,AuthController.login)
authRouter.post ("/register",adminRegisterValidation,handleValidationErrors, AuthController.register)
authRouter.post("/data",validateToken,paginationValidation,handleValidationErrors , data)

export default authRouter;
