import message from "../common/messages.js"
import product from "../database/models/product.js"
import categorys from '../database/models/category.js'


/**  
 * get products code 
 * @param { req, res }
 * @returns JsonResponse
 */
const productpage = async (req, res) => {
    try {
        const { query: { categories } } = req;
        let filter = {};

        if (categories) {
            filter = { category: categories.split(',') }
        }

        // get product list according categorywise 
        const productList = await product.find(filter).populate('category');

        if (!productList) {
            return res.status(500).json({
                message: message.PRODUCTS_NOT_FOUND
            })
        }

        return res.status(200).json({
            message: message.PRODUCT_GET_SUCCESS,
            productList: productList
        });;

    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
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
        const filesName = req.files;
        const file = req.body;

        const categoryId = await categorys.findById(file.category)
        let productImage = [];
        filesName.map((data) => {
            productImage.push({ files: data.filename })
            console.log("productImages", productImage)
        })
        if (!categoryId) {
            return res.status(200).json({
                message: message.CATEGORY_NOT_FOUND
            })
        }
        const products = await product.create({
            name: file.name,
            description: file.description,
            salePrice: file.salePrice,
            mrp: file.mrp,
            category: categoryId,
            productImage,
        })
        return res.status(200).json({
            message: message.PRODUCT_SUCCESS,
            product: products

        })
    } catch (error) {
        return res.status(500).json({
            message: message.PRODUCT_ERROR,
            error: error
        })
    }
}

export default {
    productAction,
    productpage,
}
