import  message  from "../common/messages.js";
import category from '../database/models/category.js'
/**
 * add category code 
 * @param { req, res }
 * @returns JsonResponse
 */
const categoryAction = async (req, res) => {
    try {
        const { name } = req.body;
        const categorys = await category.create({
            name
        })
        return res.status(200).json({
            message:message.CATEGORY_SUCCESS,
            category:categorys
        })
    } catch (error) {
        return res.status(401).json(
            { message: message.CATEGORY_ERROR }
        );
    }
}
export default {
    categoryAction
}