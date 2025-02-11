import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getUserIdFromToken } from "../utils/getUserId.js";
import Seller from "../models/seller.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

const registerUser = asyncHandler(async(req,res,next)=>{
    try {
        console.log("registration started");
    
        const {username,password,email,phone,address} = req.body;
        console.log(req.body);
    
        if(!password||password.length<8){
            throw new ApiError(400,"password length must be atleast 8");
        }
    
        const existing_user = await User.findOne({
            $or: [{username}]
        });
    
        if(existing_user){
            throw new ApiError(400,"user already exists");
        }
    
        const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex_email.test(email)){
            throw new ApiError(400,"email not correct");
        }
    
        const regex_phone = /^\d{10}$/;
        if(!regex_phone.test(phone)){
            throw new ApiError(400,"phone number not valid");
        }

        const user = await User.create({
            username:username.toLowerCase(),
            password,
            email,
            phone,
            address
        })
    
        const accessToken = await user.generateAcessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save()
    
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            sameSite:'None',
            maxAge: 60 * 60 * 1000//1 hour max age
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });
        //check if user is created or not
        const created_user = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if(!created_user){
            throw new ApiError(500,"registration falied");
        }
    
        return res.status(200).json(
            "Registration successful"
        )
    } catch (error) {
        console.log(error);
        next(error);
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    try {
        const {username,password} = req.body;
    
        const user = await User.findOne({username});
    
        if(!user){
            return res.status(404).json(
                new ApiError(404,"No user found")
            )
        }
        const iscorrect = await user.isPasswordCorrect(password);

        if(!iscorrect){
            return res.status(400).json(
                new ApiError(400,"Incorrect Password")
            )
        }
    
        const accessToken = await user.generateAcessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save()
        console.log(accessToken);
    
        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            maxAge: 60 * 60 * 1000//1 hour max age
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });

        const user_for_frontend = {
            userName:user.username,
        }
    
        return res.status(200).json(
            new ApiResponse(200,user_for_frontend,"login successful")
        )
    } catch (error) {
        console.log(error)
    }
    
})

const getUser = asyncHandler(async(req,res)=>{
    try {
        const token = req.cookies["accessToken"]
        const userId = getUserIdFromToken(token);
        const user = await User.findById(userId);
        if(user)return res.status(200).json(user);
        else throw new ApiError(404,"No user Found")
    } catch (error) {
        return res.status(404).json("No user found");
        next(error);
    }
})

const logOutUser = asyncHandler(async(req,res)=>{
    try{
        console.log(req);
        const token = req.cookies["accessToken"]
        const userId = getUserIdFromToken(token)
        
        const USER = await User.findById(userId)
        if(!USER){
            return res.status(404).json(new ApiResponse(404,{},"No USER found"));
        }

        USER.refreshToken = null;
        await USER.save();
        res.cookie('accessToken',null,{
            httpOnly:true,
            maxAge: 60 * 60 * 1000//1 hour max age
        })

        res.cookie("refreshToken", null, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 * 1000,
        });

        return res.status(200).json(new ApiResponse(200,{},"logged out successfully"));

    }catch(err){
        console.log(err);
        return res.status(404).json(new ApiResponse(404,"Error logging out"))
    }
})

const checkSeller = asyncHandler(async(req,res)=>{
    try{
        const token = req.cookies['accessToken'];
        if(!token)return res.status(500).json(
            new ApiResponse(400,"No seller found")
        )
        const userId = await getUserIdFromToken(token);
        const seller  = await Seller.findOne({user_id:userId});
        if(seller){
            return res.status(200).json(new ApiResponse(200,seller,"Seller found"));
        }else{
            throw new ApiError(404,"No seller found");
        }
    }catch(err){
        console.log("No seller found");
        next(err);
    }
})

const registerSeller = asyncHandler(async(req,res)=>{
    try {
        const token = req.cookies['accessToken'];
        const userId = await getUserIdFromToken(token);
        console.log(req.body)
        const {shop,city,state,pin} = req.body.formData;
        const seller  = await Seller.findOne({user_id:userId});
        if(seller)return res.status(200).json(
            new ApiResponse(200,created_seller,"Registration successful")
        )
        const new_seller = await Seller.create({
            user_id:userId,
            shop,
            city,
            state,
            pin
        })
    
        const created_seller = await Seller.find({user_id:new_seller.user_id});
    
        if(!created_seller){
            throw new ApiError(500,"registration falied");
        }
        
        return res.status(200).json(
            new ApiResponse(200,created_seller,"Registration successful")
        )
    } catch (error) {
        console.log(error);
        next(error);
    }

})

const getFromCart = asyncHandler(async(req,res)=>{
    try {
        const token = req.cookies['accessToken']
        console.log(token);
        const userId = getUserIdFromToken(token)
        console.log("user : ",userId);
    
        const USER = await User.findById(userId)
        if(!USER){
            throw new ApiError(404,"No user found");
        }
        const cartItems = USER.cart
        console.log(cartItems)

        const updatedCart = await Promise.all(
            cartItems.map(async (item)=>{
                const   product = await Product.findById(item._id)
                return {_id:item._id,price:item.price,quantity:item.quantity,name:product.product_name,img:product.image}
            })
        );
        console.log(updatedCart)

        if(!cartItems){
            throw new ApiError(404,"No items in your cart");
        }
        return res.status(200).json(new ApiResponse(200,updatedCart,"Cart items found"));
    } catch (error) {
        console.log(error)
        next(error);
    }
})

const getUserOrders = async (req, res) => {
    try {
        const token = req.cookies["accessToken"];
        console.log("YES");
        const userId = getUserIdFromToken(token);
        const orders = await Order.find({ userId,paymentStatus:"paid"});
        orders.forEach(order => console.log(order));    
        if(!orders)throw new ApiError(404,"No orders found");
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const update = async(req,res)=>{
    try {
        const token = req.cookies["accessToken"];
        const userId = getUserIdFromToken(token);
        const updates = req.body;
        const req_updates = {};
        if(!userId)throw new ApiError(404,"No user found");
        const user = await User.findById(userId);
        Object.keys(updates).forEach(key=>{
            if(updates[key]!=''){
                req_updates[key] = updates[key];
            }
        })
    
        if(Object.keys(req_updates).length>0){
            const updated_user = await User.findByIdAndUpdate(
                userId,
                {$set:req_updates},
                {new:true}
            );
            return res.status(200).json(updated_user);
        }else{
            return res.status(200).json("Updated");
        }
    } catch (error) {
        console.log(error);
    }
}

export {update,getUser,checkSeller,getFromCart,registerSeller,registerUser,loginUser,logOutUser,getUserOrders};