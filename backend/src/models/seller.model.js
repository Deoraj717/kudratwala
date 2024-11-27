import mongoose from "mongoose";
import user from "./user.model.js";
import product from "./product.model.js";

const sellerSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true
    },
    shop:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:product,
            required:true
        }
    ]
})

const seller = mongoose.model("seller",sellerSchema);
export default seller;