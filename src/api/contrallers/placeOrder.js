import message from "../common/messages.js";
import cart from "../database/models/cart.js";
import ordered from "../database/models/ordered.js";
import product from "../database/models/product.js";
import userModel from "../database/models/userModel.js";
/**  
 * order place code 
 * @param { req, res }
 * @returns JsonResponse
 */
const orderAction = async (req, res) => {
    try {
        const { user, billingAddress, shippingAddress } = req.body
        const userId = await userModel.findById({ _id: user })
        if (!userId) {
            return res.status(404).json({
                message: message.USER_NOT_FOUND
            })
        }
        const cartId = await cart.findOne({ user: user })
        if (!cartId) {
            return res.status(404).json({
                message: message.CART_PRODUCT_NOT_FOUND
            })
        }
        let totalAmount = 0;
        cartId.cartItems.map((value) => {
            return totalAmount += value.productPrice * value.quantity;
        })
        const placeOrder = await ordered.create({
            userId:cartId.user,
            shippingAddress,
            billingAddress,
            purchaseItems:cartId.cartItems,
            totalAmount:totalAmount
           
        })
        await cart.findByIdAndRemove(cartId)

        return res.status(200).json({
            message: message.PLACE_ORDER_SUCCESS,
            placeOrder:placeOrder
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        })
    }
}

/**
* add review  code 
* @param { req, res }
* @returns JsonResponse
*/
const reviewAction = async (req, res) => {
    try {
        const { productId, userId ,review } =req.body
        const existence = await product.findById(productId)
        if(!existence){
            return res.status(404).json({
                message: message.PRODUCTS_NOT_FOUND
            });
        }
        const userExist =await userModel.findById(userId)
        if(!userExist){
            return res.status(404).json({
                message: message.USER_NOT_FOUND
            });
        }
        const reviews = await product.findOneAndUpdate
        ({ _id : existence.id },
            { "$push": { "reviewProduct":{ userId:userId ,description:review }} }, { new: true })
        return res.status(200).json({
            message:"Review is add successfully",
            review:reviews
        })

    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}
/**
* get place proder code 
* @param { req, res }
* @returns JsonResponse
*/
const orderPage = async (req,res)=>{
  try {
    const {userId} =req.body  
    const userExist =await ordered.findOne({userId:userId})
    if(!userExist){
        res.status(404).json({
         message:message.PLACE_ORDER_NOT_FOUND
        })
    }
    return res.status(200).json({
        message:message.GET_PLACE_ORDER_SUCCESS,
        placeOrder:userExist
    })
  } catch (error) {
      
  }
}
const orderController = {
    orderAction,
    reviewAction,
    orderPage
}
export default orderController;