import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import {ApiError} from "./utils/errorHandler.js"
import { ApiResponse } from "./utils/ApiResponse.js"
import passport from "passport"
import strategy from "./utils/jwtStrategy.js"
import { getUserIdFromToken } from "./utils/getUserId.js"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static(("public")))
app.use(cookieParser())
passport.use(strategy)
app.use(passport.initialize())

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import User from "./models/user.model.js";
import paymentRoute from "./routes/payment.route.js";
import reviewRouter from "./routes/review.route.js";

app.use("/users",userRouter);
app.use("/products", productRouter);
app.use("/payments",paymentRoute);
app.use("/cart",passport.authenticate('jwt',{session:false}) ,cartRouter);
app.use("/review",reviewRouter);
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statuscode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
        });
    }
    res.status(500).json({ message: "Internal Server Error" });
});

app.get("/getkey",async(req,res)=>{
    try {
        console.log(req.cookies);
        res.status(200).json({key:process.env.RAZORPAY_API_KEY})
    } catch (error) {
        
    }
})
app.get("/getName",async (req,res)=>{
    try {
        console.log(req.cookies);
        const token = req.cookies['accessToken'];
        console.log(token);
        const userId = await getUserIdFromToken(token);
        
        const user = await User.findById(
            userId,
        );
    
        return res.status(200).json(new ApiResponse(200,user))
    } catch (error) {
        console.log(error);
    }
})

export {app}