import { body } from "express-validator"
import userAdmin from "../database/models/adminModel.js";

/**
 * Login Validations
 * */
export const LoginValidation = [

    body("email").not().isEmpty().withMessage('Please enter email address').trim().isEmail().withMessage("Please enter valid email address.").trim(),
    body("password").trim().notEmpty().withMessage('Please enter password.').isLength({ min: 6 }).withMessage("Password must be at least 6 character long.").not().matches(/^$|\s+/).withMessage('White space not allowed')
];
export const adminRegisterValidation = [
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("email")
        .not()
        .isEmpty()
        .withMessage('Enter a email')
        .trim()
        .isEmail()
        .withMessage("Please enter valid email address.")
        .trim()
        .custom(async (value) => {
            const user = await userAdmin.findOne({ email: value });
            if (user) {
              throw new Error("Email is already taken");
            }
        }),
        body("password").trim().notEmpty().withMessage('Please enter password.').isLength({ min: 6 }).withMessage("Password must be at least 6 character long.").not().matches(/^$|\s+/).withMessage('White space not allowed'),

    body("contact").trim().notEmpty().withMessage("Contact number is required").isLength({min : 10}).withMessage("Enter a proper contact"),
    body("city").trim().notEmpty().withMessage("Enter a city name"),
];