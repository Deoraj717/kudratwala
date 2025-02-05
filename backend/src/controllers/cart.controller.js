import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import Product from "../models/product.model.js";
import { getUserIdFromToken } from "../utils/getUserId.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToCart = asyncHandler(async (req, res) => {
    try {
      const {_id, quantity , price } = req.body;
      const token = req.cookies['accessToken'];
      const userId = getUserIdFromToken(token);

      const product = await Product.findById(_id);
      console.log("product : ");
      console.log(product);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      if (product.stock < quantity) {
        return res.status(404).json(new ApiResponse(404,"Product out of stock"));
      }
  
      // Find the user
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json(new ApiResponse(404,"No user found"));
      }
  
      // Check if the product is already in the user's cart
      const cartItem = user.cart.find(item => item._id.equals(_id));
      if (cartItem) {
        cartItem.quantity += parseInt(quantity, 10);
      } else {
        // Add new product to cart
        user.cart.push({ _id, quantity ,price });
      }
  
      // Reduce product stock
      product.stock -= quantity;
      await product.save();
      await user.save();
      console.log(user)
      res.status(200).json(new ApiResponse(200,user.cart,"Product added to cart"));
  
    } catch (error) {
      console.log(error)
      throw new ApiError(500,"server error");
    }
});

const removeFromCart = asyncHandler(async(req,res)=>{
  try {
    console.log(req.body);
    const { productId } = req.body;
    console.log(productId);
    // Find the user
    const token = req.cookies['accessToken'];
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user.cart);
    const cartItem = user.cart.find(item => item._id.toString() === productId);

    console.log(cartItem);
    if (!cartItem) {
      return res.status(400).json({ error: 'Product not found' });
    }

    // Find the product by ID to restore the stock
    const product = await Product.findById(cartItem._id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Restore the stock
    product.stock += cartItem.quantity;

    console.log("YES");

    // Remove the product from the cart
    user.cart = user.cart.filter(item => item._id.toString() !== productId);
    console.log(user.cart)
    // Save the updated product and user
    await product.save();
    await user.save();

    res.status(200).json(new ApiResponse(200,user.cart,"Poduct removed form cart"));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ApiResponse(500,"server error in removing from cart"));
  }
});

export {addToCart,removeFromCart};