import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// connectDB to connect mongoDB with mongoose
const connectDB = async function(){
    try{    
        console.log(`${process.env.MONGO_URL}/${DB_NAME}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log(`\nMongoDb connected ${connectionInstance.connection.host}`);
    }catch(err){
        console.log("Error connecting to database by mongoose"+err);
    }
}

export default connectDB;