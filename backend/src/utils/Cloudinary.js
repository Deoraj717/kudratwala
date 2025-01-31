import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async (localFile) => {
    try{
        
        if(!localFile)return null

        const res = await cloudinary.uploader.upload(localFile,{
            resource_type : "auto"
        })

        console.log("Cloudinary me upload ho gai hai");

        if (fs.existsSync(localFile)) {
            fs.unlinkSync(localFile);
            console.log("Local file deleted successfully.");
        }

        return res.url;
    }catch(err){
        if (fs.existsSync(localFile)) {
            fs.unlinkSync(localFile);
            console.log("Local file deleted successfully.");
        }
        return null;
    }
}

export {uploadCloudinary};