import message from "../common/messages.js"
import product from "../database/models/product.js"
import categorys from '../database/models/category.js'


/**
 * get products code 
 * @param { req, res }
 * @returns JsonResponse
 */
const productpage =async (req,res)=>{
    try {
        const {query:{categories}} =req;
        let filter = {};
    
        if (categories) {
            filter = { category:categories.split(',') }
        }
    
        // categorywise data will show
        const productList = await product.findOne(filter).populate('category');
    
        if (!productList) {
            return res.status(500).json({
                message: message.PRODUCTS_NOT_FOUND
            })
        }
    
        return res.status(200).json({
            message:message.PRODUCT_GET_SUCCESS,
            productList:productList
        });;
    
    } catch (error) {
        return res.status(500).json({
            message:message.ERROR_MESSAGE
        });
    }
}
    /**
 * add product code 
 * @param { req, res }
 * @returns JsonResponse
 */
const productAction = async (req, res) => {
    try {
        const { name, description, salePrice, mrp, category } = req.body;
        const categoryId = await categorys.findById(category)
        console.log("categoryId",categoryId)
        if(!categoryId){
            return res.status(200).json({
                message:message.CATEGORY_NOT_FOUND
            })
        }
        const products = await product.create({
            name,
            salePrice,
            mrp,
            category,
            description
        })
        return res.status(200).json({
            message: message.PRODUCT_SUCCESS,
            product:products
        })
    } catch (error) {
        return res.status(500).json({
            message: message.PRODUCT_ERROR
        })
    }
}
export default {
    productAction,
    productpage
}
