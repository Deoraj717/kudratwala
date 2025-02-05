import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    image:
    {
        type:String
    },
    description:{
        type:String
    },
    plant_type:{
        type:String 
    },
    area:{
        type:String
    },
    stock:{
        type:Number,
        required:true
    },
    tips:{
        type:String
    }
})

const Product = mongoose.model("product",productSchema);
export default Product;