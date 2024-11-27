import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {writeReview,getProducts,getProduct,addProduct,removeProduct} from "../controllers/product.controller.js";

const router = Router();
router.route("/getproducts").get(getProducts);
router.route("/getproduct/:id").get(getProduct);
router.route("/add").post(upload.single('image'),addProduct);
router.route("/remove").get(removeProduct);
router.route("/review").post(writeReview);

export default router;