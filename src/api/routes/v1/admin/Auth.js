
import express from "express";
import  AuthController  from "../../../contrallers/Auth.js";
import { handleValidationErrors } from "../../../middleware/Validation.js";
import { LoginValidation } from "../../../validators/Auth.js";

const router = express.Router();

router.post("/login", LoginValidation,handleValidationErrors ,AuthController.login)

export default router;
