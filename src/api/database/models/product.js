import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    salePrice: { type: Number, required: true, default: 0 },
    mrp: { type: Number, required: true, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    productImage: [
        new Schema(
            {
                files: {
                    type: Schema.Types.String,
                    required: false
                }
            },
           
        ),
    ]

});
export default mongoose.model("product", productSchema);