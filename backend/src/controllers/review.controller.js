import Review from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserIdFromToken } from "../utils/getUserId.js";
import mongoose, { isObjectIdOrHexString } from "mongoose";

const getReview = asyncHandler(async(req,res)=>{
    try{
        const id = req.query.id;
        console.log(id);
        const reviews = await Review.find({"product_id":new mongoose.Types.ObjectId(id)});
        const avg_review = await Review.aggregate([
            {
              $match: { product_id: new mongoose.Types.ObjectId(id) }
            },
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$rating" }
              }
            }
          ]);
        console.log(reviews);
        if(!reviews){
            return res.status(500).json(
                new ApiError(500,"Server Error")
            )
        }

        return res.status(200).json(
            new ApiResponse(200,{reviews,avg_review},"Reviews Found")
        )
    }catch(err){
        console.log(err);
        return res.status(500).json(
            new ApiError(500,"Server Error")
        )
    }
})

const addReview  = asyncHandler(async(req,res)=>{
    try{

        console.log("hiii")
        const token = req.cookies['accessToken'];
        const userId = getUserIdFromToken(token);
        console.log(req.body);

        const {productId,reviews,userName} = req.body;

        const review = await Review.create({
            product_id:productId,
            user_id:userId,
            userName,
            rating:reviews.rating,
            description:reviews.description

        })
        console.log(review);

        await review.save();
        console.log(review);

        return res.status(200).json(
            new ApiResponse(200,review,"Rreview added")
        )

    }catch(err){
        console.log(err);
        return res.status(500).json(
            new ApiError(500,"Server Error")
        )
    }
})

export {addReview,getReview}