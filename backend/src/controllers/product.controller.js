import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getUserIdFromToken } from "../utils/getUserId.js";
import Seller from "../models/seller.model.js";
import { uploadCloudinary } from "../utils/Cloudinary.js";
import mongoose from "mongoose";
import Review from "../models/review.model.js";

function stripNonAlphabets(input) {
    return input.replace(/[^a-zA-Z]/g, '');
}
function stripNonNumbers(input) {
    return input.replace(/[^0-9]/g, '');
}
const getProducts = asyncHandler(async(req,res)=>{
    try {
        const filter = req.query.filter ? req.query.filter : {};
        const {category,priceRange} = filter;
        let query = {};
        if (category && category!='All') {
            query.plant_type = category;
        }
        if (priceRange) {
            query.price = {$gte:Number(priceRange[0]),$lte:Number(priceRange[1])};
        }
        var start = req.query.page;
        const products = await Product.find(query).skip(start*10).limit(10);
        return res.status(200).json(new ApiResponse(200,products,"Products found"));
    }catch (error) {
        console.log(error);
        throw new ApiError(500," cant fetch products");
    }

})
const getProduct = asyncHandler(async(req,res)=>{
    try {
        let product_id = req.params.id;

        const product = await Product.findById(product_id);

        if(!product)return res.status(500).json(new ApiResponse(500,"No Product found"))

        return res.status(200).json(new ApiResponse(200,product,"Product found"));
    }catch (error) {
        console.log(error);
        throw new ApiError(500,"server error cant fetch product with given id");
    }

})
const addProduct = asyncHandler(async(req,res)=>{
    try {

        const token = req.cookies['accessToken'];
        const userId = getUserIdFromToken(token);

        console.log(userId);

        const seller = await Seller.findOne({user_id:userId});

        if(!seller)throw new ApiError(401,"No seller data");
        console.log(seller);

        let {product_name,price,description,stock,tips,area,plant_type} = req.body;

        const localFilePath = req.file.path;
        console.log(localFilePath);
        const cloudinaryUrl = await uploadCloudinary(localFilePath);

        //adding to mongo server
        const product = await Product.create({
            product_name:product_name.toLowerCase(),
            description,
            stock,
            image:cloudinaryUrl,
            price,
            area,
            tips,
            plant_type
        })

        await product.save()

        const updatedSeller = await Seller.findByIdAndUpdate(
            seller._id, 
            { $push: { products: product._id } }, 
            { new: true }
        );

        console.log("plant uploaded to database");

        return res.status(200).json(new ApiResponse(200,product,"product successfully added"));

    } catch (error) {
        console.log(error);
        throw new ApiError(500,"cant add produt");
    }
})
const removeProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.body();//product id
        const token = req.cookies['accessToken'];
        const userId = getUserIdFromToken(token);

        const seller = await seller.findByName({user_id:userId});
        if (!seller) {
            console.log('Seller not found for the given userId');
            throw new ApiError(500,"Seller not found");
        }

        const result = await seller.updateOne(
            { user_id: userId },
            { $pull: { product_id: id } }
        );

        if(!result)throw new ApiError(500,"Cant delete product");


        const deleted_product = await Product.deleteOne({_id:id});
        if(!deleted_product)throw new ApiError(500,"Cant delete product");

        return res.status(200).json(new ApiResponse(200,deleted_product,"product deleted"));
        
    } catch (error) {
        console.log(error);
        throw new ApiError(500,"cant remove produt");
    }
})
const writeReview = asyncHandler(async(req,res)=>{
    try {
        const {rating,description,_id} = req.body;
        const userId = await getUserIdFromToken(token);
        const review = await Review.create({
            rating,
            description,
            product_id:_id,
            user_id:userId
        })
        await review.save();
        console.log("review saved");

        return res.status(200).json(new ApiResponse(200,review,"Review added"));
    } catch (error) {
        console.log(error);
    }
})


export {writeReview,getProducts,getProduct,addProduct,removeProduct};