import bcryptjs from "bcryptjs";
import { decode, encode } from "../../utils/jwt.js";
import message from "../common/messages.js";
import userModel from "../database/models/userModel.js";
import jwt from "jsonwebtoken";

/**
 * login a user 
 * @param { req, res }
 * @returns JsonResponse
 */
const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json(
                {
                    errors: { message: message.USER_NOT_FOUND }
                });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res
            .status(422)
            .json({
                errors: { message: message.PASSWORD_NOT_MATCH }
            });
    }
    return res.status(200).json(
        {
            message: message.LOGIN_SUCCESS,
            token: `Bearer ${await encode({
                id: user._id,
            })}`
        }
    );
}



/**
 * user registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 10);

    // save the data in database of user 
    await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    return res.status(200).json(
        { message: message.USER_REGISTRATION }
    );
}
/**
 * find email and create jwt token
 * @param { req, res }
 * @returns JsonResponse
 */
const verify = async (req, res) => {
    try {
        const {
            headers: { authorization },
        } = req;
        if (!authorization) {
            return res.status(404).json({
                message:message.UNAUTHORIZED,
            })
        }
        const idToken = authorization.split(" ")[1];
        
        const { id } = await decode(idToken);
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(422).json({
                errors: { message: message.USER_NOT_FOUND }
            });
        }

        const secret = process.env.JWT_SECRET + user.id;
        const payLoad = {
            id: user.id
        }
        const token = jwt.sign(payLoad, secret, { expiresIn: '5m' })
        const link = `${process.env.VERIFY_PATH}/${user.id}/${token}`

        return res.status(200).send(link);
    } catch (error) {
        return res.status(500).json({
            errors: { message: message.UNAUTHORIZED }
        });;
    }
}

/**
 * email verify using jwt token
 * @param { req, res }
 * @returns JsonResponse
 */
const emailVerification = async (req, res) => {
    const { id, token } = req.params;
    const user = await userModel.findOne({ _id: id });

    // check if this id exist in database 
    if (id !== user.id) {
        return res.status(422).json(
            { message: message.USER_NOT_FOUND }
        );
    }

    // we have a valid id, and we have a valid user with this id
    const secret = process.env.JWT_SECRET + user.id
    try {
        const payLoad = jwt.verify(token, secret)
        return res.status(200).json(
            { message: message.VERIFY_SUCCESS }
        );

    } catch (error) {
        return res.status(500).json(
            { message: message.INVALID_TOKEN }
        );
    }
}


const AuthController = {
    login,
    register,
    verify,
    emailVerification
}
export default AuthController;