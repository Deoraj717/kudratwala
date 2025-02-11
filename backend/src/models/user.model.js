import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "./product.model.js";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        username:{
            type : String,
            required : true,
            unique : true,
        },
        address:{
            city:{type:String,required:true},
            state:{type:String,required:true},
            pin:{type:String,required:true}
        },
        password:{
            type : String,
            required : true
        },
        email:{
            type:String,
            validate:{
                validator:function(email){
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                },
                message:props=>`${props.value} is not a valid email address!!`
            }
        },
        phone:{
            type:String,
            required:true,
            validate:{
                validator:function(phone_number){
                    return /^[1-9]\d{9}$/.test(phone_number);
                },
                message : props =>  `${props.value} is not a valid phone number!!`
            }
        },
        cart:[
            {
                productId:{type:Schema.Types.ObjectId,ref:Product},
                quantity:{type:Number,default:1},
                price:{type:Number,default:0}
            }
        ],
        refreshToken:{
            type : String
        },
        products:[
            {
                type:Schema.Types.ObjectId,
                ref:Product
            }
        ]
    },{
        timestamps : true
    }
)

userSchema.pre("save",async function(next){
    //if password is not modified ie suppose user only changes username or avatar 
    //then just return after calling next middleware
    if(!this.isModified("password")){
        next();
        return;
    }

    this.password = await  bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    console.log(this.password)
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAcessToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = new mongoose.model("User",userSchema)
export default User;