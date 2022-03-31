import { body } from "express-validator";
import userModel from "../database/models/userModel.js";

export const LoginValidation = [

  body("email").not().isEmpty().withMessage('Please enter email address').trim().isEmail().withMessage("Please enter valid email address.").trim(),
  body("password").trim().notEmpty().withMessage('Please enter password.').isLength({ min: 6 }).withMessage("Password must be at least 6 character long.").not().matches(/^$|\s+/).withMessage('White space not allowed')
];
export const RegisterValidation = [
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
            const user = await userModel.findOne({ email: value });
            if (user) {
              throw new Error("Email is already taken");
            }
        }),
        body("password").trim().notEmpty().withMessage('Please enter password.').isLength({ min: 6 }).withMessage("Password must be at least 6 character long.").not().matches(/^$|\s+/).withMessage('White space not allowed'),

];