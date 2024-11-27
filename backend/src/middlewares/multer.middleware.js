import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log("multer");
        console.log(file);
        cb(null,"./public/temp")//place where image will be temporarily stored
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)//unique file name
    }
})

export const upload = multer({storage});