import bcryptjs from "bcryptjs";
import message from "../common/messages.js";
import adminUser from "../database/models/adminModel.js";
import { decode, encode } from '../../utils/jwt.js'
import adminModel from "../database/models/adminModel.js";

/** 
 * admin registration code 
 * @param { req, res }
 * @returns JsonResponse
 */
export const register = async (req, res) => {
  const { firstName, lastName, email, password, contact, city } = req.body
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
  console.log("user", user)
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
  console.log("chackID", user._id)
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
 * Profile Picture Change
 * @param { req, res }
 * @returns JsonResponse
 */
const profileChange = async (req, res) => {
  try {
    const {
      headers: { authorization },
    } = req;
   
    if (!authorization) {
      return res.status(404).json({
        message: message.UNAUTHORIZED,
      })
    }
    const idToken = authorization.split(" ")[1];

    const { id } = await decode(idToken);
    const { file } = req;
    await adminModel.findOneAndUpdate({ _id: id },
      { $set: { profileImage: file.filename } }, { new: true })
    return res.status(200).json(
      {
        message: message.UPLOAD_SUCCESS
      })
  } catch (e) {
    return res.status(404).json({
      message: message.ERROR_MESSAGE,
    })
  }
}

const AuthController = {
  login,
  register,
  profileChange
}
export default AuthController;
