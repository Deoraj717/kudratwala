import mongoose, { mongo } from "mongoose";
import User from "./user.model.js";
import Product from "./product.model.js ";

const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Product
            },
            quantity:{
                type:Number
            },
            price:{
                type:Number
            },
            name:{
                type:String
            },
            img:{
                type:String
            },
        },
    ],
    razorpayOrderId:String,
    paymentStatus:{
        type:String,
        default:"pending"
    },
    flag:{
        type:Boolean,
        default:0
    }
},{
    timestamps : true
})

const Order = mongoose.model("Order",OrderSchema);
export default Order;