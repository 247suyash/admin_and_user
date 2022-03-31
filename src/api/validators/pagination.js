import { body } from "express-validator";

export const paginationValidation = [
    body("page")
        .not().isEmpty()
        .withMessage('Please enter page number'),
    body("size")
        .trim()
        .notEmpty()
        .withMessage('Please enter size .')

]