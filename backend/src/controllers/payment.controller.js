import { instance } from "../index.js";
import crypto from "crypto";
import { getUserIdFromToken } from "../utils/getUserId.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import sendEmail from "../utils/SendMail.js";

export const checkout = async (req,res)=>{

   try {
     const token = req.cookies["accessToken"];
     const refreshToken = req.cookies["refreshToken"];
     const userId = getUserIdFromToken(token);
     const user = await User.findById(userId);
     if(!user){
        return res.status(200).json({message:"No user Found"});
     }
     const products = req.body.products;
     console.log(products);
     const amount = Number(req.body.amount*100);
 
     const options = {
         amount,
         currency:"INR",
     }
 
     const order = await instance.orders.create(options);
     console.log(products);
     const newOrder = await Order.create({
         userId,
         products,
         razorpayOrderId:order.id,
         paymentStatus:"pending"
     }) 
     console.log(newOrder);
     await newOrder.save();
 
     res.status(200).json({success:true,order});
   } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log(error);
   }
}

export const verifypayment = async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        let body = razorpay_order_id+'|'+razorpay_payment_id;

        const expectedSignature = crypto.create('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
        const isAuthentic = expectedSignature === razorpay_signature;

        if(isAuthentic){
            const order = Order.findOne({razorpayOrderId:razorpay_order_id});
            order.paymentStatus = "paid";
            await order.save();
            res.status(200).json({message:"payment Success"});
        }else{
            res.status(500).json({message:"Invalid signature"});
        }
    } catch (error) {
        console.log(error);
        res.stauts(500).json({message:"Internal Server Error or payment cant be verfied"});
    }
}

export const paymentVerification = async(req,res)=>{
    try {
        const token = req.cookies['accessToken'];
        const user_id = getUserIdFromToken(token);
        const user = await User.findById(user_id);
        if(!user){
            return res.status(500).json({message:"No user Found",redirectUrl:"/login"});
        }
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        let body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    
        const isAuthentic = expectedSignature === razorpay_signature
    
        var response = {"signatureIsValid":"false"}
        if(expectedSignature === razorpay_signature){
            response = {"signatureIsValid":"true"}
        }
        
        if(isAuthentic){
            const order = await Order.findOne({razorpayOrderId:razorpay_order_id});
            if(!order){
                res.status(500).json({message:"No rec found"});
            }
            console.log(order);
            order.paymentStatus = "paid";
            await order.save();
            if(order.flag == 1)user.cart = [];
            await user.save();
            sendEmail({user:user.username,state:user.address.state,city:user.address.city,pin:user.address.pin},order);
            res.status(200).redirect(process.env.FRONT_URL);
        }else{
            res.status(400).json({message:"Cant verify the payment"});
        }
    } catch (error) {
        res.status(500).json({message:"Cant verify the payment"});
    }
}