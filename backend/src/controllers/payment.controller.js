import { instance } from "../index.js";
import crypto from "crypto";
import { getUserIdFromToken } from "../utils/getUserId.js";
import Order from "../models/order.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const checkout = async (req,res)=>{
//create an order

   try {
     const token = req.cookies["accessToken"];
     const refreshToken = req.cookies["refreshToken"];
     
    //  if(!token && refreshToken){
    //      const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    //      if(!payload){
    //          res.status(500).json({message:"Server Error"});
    //      }
 
    //      const new_token = jwt.sign({_id:payload._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
 
    //      res.cookie('accessToken',accessToken,{
    //          httpOnly:true,
    //          //sameSite:'None',
    //          maxAge: 60 * 60 * 1000//1 hour max age
    //      })
    //  }
     const userId = getUserIdFromToken(token);
     const products = req.body.products;
     const amount = Number(req.body.amount*100)
 
     const options = {
         amount,
         currency:"INR",
     }
 
     const order = await instance.orders.create(options);
     const newOrder = await Order.create({
         userId,
         products,
         razorpayOrderId:order.id,
         paymentStatus:"pending"
     })
 
     await newOrder.save();
     console.log(newOrder);
 
     res.status(200).json({success:true,order});
   } catch (error) {
        console.log(error);
   }
}
export const paymentVerification = async(req,res)=>{
    try {
        console.log(req.body);
        const token = req.cookies['accessToken'];
        const user_id = getUserIdFromToken(token);
        const user = await User.findById(user_id);
        if(!user){
            return res.status(500).json({message:"internal server error"});
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
                res.status(404).json({message:"No rec found"});
            }
            order.paymentStatus = "paid";
            await order.save();
            console.log("success");

            const productQuantities = order.products.reduce((acc, product) => {
                acc[product.productId] = product.quantity;
                return acc;
            }, {});
            console.log("inside cart details bro");
            console.log(productQuantities);
            // Update user's cart
            user.cart = user.cart.map(item => {
                console.log(item._id);
                console.log(productQuantities);
                if (productQuantities[item._id]) {
                    const remainingQuantity = item.quantity - productQuantities[item._id];
                    console.log(remainingQuantity)
                    if (remainingQuantity > 0) {
                        // Update quantity if not zero
                        return { ...item, quantity: remainingQuantity };
                    }
                    // Else, return null to mark for removal
                    return null;
                }
                return item; // Keep items not in the order
            }).filter(item => item !== null); // Remove items marked as null


            await user.save();

            res.status(200).json({message:"payment Success"});
        }else{
            res.stauts(400).json(response);
        }
    } catch (error) {
        console.log(error);
    }
}