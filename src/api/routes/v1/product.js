import express from "express";
import product from "../../contrallers/product.js";
// import { handleValidationErrors } from "../../middleware/validation.js";
import { productValidate } from "../../validators/product.js";
import { validateToken } from "../../middleware/auth.js";
import { upload } from "../../middleware/profilePicture.js";

const productRouter = express.Router();

productRouter.post("/product",validateToken,
    productValidate,
    // handleValidationErrors,
    upload.array("file",10),
    product.productAction
)
productRouter.get("/product",validateToken,product.productpage)

export default productRouter;