import express from "express";
import category from "../../contrallers/category.js";
import { handleValidationErrors } from "../../middleware/validation.js";
import { categoryValidate } from "../../validators/category.js";

const categoryRouter = express.Router();

categoryRouter.post("/category",
    categoryValidate,
    handleValidationErrors,
    category.categoryAction
)

export default categoryRouter;