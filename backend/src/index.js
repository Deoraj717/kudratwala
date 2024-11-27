import dotenv from "dotenv";
import connectDB from "./db/connect_database.js";
import { app } from "./app.js";
import Razorpay from "razorpay"

export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{

    app.listen(`${process.env.PORT}`||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    });
    console.log("Server listening")

}).catch((err)=>{

    console.log("Mongo db connection failed "+err);
    
})