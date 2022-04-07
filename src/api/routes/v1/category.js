import express from "express";
import category from "../../contrallers/category.js";
import { handleValidationErrors } from "../../middleware/validation.js";
import { categoryValidate } from "../../validators/category.js";
import { validateToken } from "../../middleware/auth.js";

const categoryRouter = express.Router();

categoryRouter.post("/category",validateToken,
    categoryValidate,
    handleValidationErrors,
    category.categoryAction
)

export default categoryRouter;