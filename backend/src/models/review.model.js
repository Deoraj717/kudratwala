import mongoose from "mongoose";
import product from "./product.model.js"
import user from "./user.model.js"
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    product_id : {
        type : Schema.Types.ObjectId,
        ref : product
    },
    userName:{
        type:String
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : user
    },
    rating : {
        type : Number
    },
    description : {
        type : String
    }
},{
    timestamps : true
})

const Review = mongoose.model("Review",reviewSchema);
export default Review;