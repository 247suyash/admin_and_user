import { decode } from "../../utils/jwt.js";
import message from "../common/messages.js";
import userModel from "../database/models/userModel.js";

/**
 * validate the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validateToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization },
    } = req;
    
    const token = authorization.split(" ")[1];
    
    const { id } = await decode(token);
    
    const userDetails = await userModel
    .findById(id)
    
    if (!userDetails) {
      throw "";
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message:message.UNAUTHORIZED
        
    });
  }
};
