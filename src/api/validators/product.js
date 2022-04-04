import { body } from "express-validator";

export const productValidate = [
    body("name").not().isEmpty().withMessage("Name of product is required"),
    body("description").not().isEmpty().withMessage("Description of product is required"),
    body("salePrice").not().isEmpty().withMessage("SalePrice of product is required"),
    body("mrp").not().isEmpty().withMessage("Mrp of product is required"),
    body("category").not().isEmpty().withMessage("Category of product is required"),
]