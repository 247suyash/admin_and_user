import express from "express";
import product from "../../contrallers/product.js";
import { handleValidationErrors } from "../../middleware/validation.js";
import { productValidate } from "../../validators/product.js";

const productRouter = express.Router();

productRouter.post("/product",
    productValidate,
    handleValidationErrors,
    product.productAction
)
productRouter.get("/product",product.productpage)

export default productRouter;