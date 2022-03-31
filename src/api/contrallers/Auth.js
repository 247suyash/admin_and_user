import bcryptjs from "bcryptjs";
import message from "../common/messages.js";
import adminUser from "../database/models/adminModel.js";
import { encode } from '../../utils/jwt.js'

/** 
 * admin registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
 export const register = async (req, res) => {
  const { firstName, lastName, email, password, contact, city} = req.body
  // save the data in database of admin 
  await adminUser.create({
      firstName,
      lastName,
      email,
      password,
      contact,
      city,
  });
  return res.status(200).json(
      { message: message.USER_REGISTRATION }
  );
}
/**
 * login a user and generate JWT token
 * @param { req, res }
 * @returns JsonResponse
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await adminUser.findOne({ email });

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
  console.log("chackID" ,user._id)
  return res.status(200).json(
    {
      message: message.LOGIN_SUCCESS,
      token: `Bearer ${await encode({
        id: user._id,
      })}`
    }
  );
}


const AuthController = {
  login,
  register
}
export default AuthController;
