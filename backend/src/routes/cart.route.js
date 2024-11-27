import { Router } from "express";
import { addToCart,removeFromCart } from "../controllers/cart.controller.js";

const router = Router();

router.route("/add").post(addToCart);
router.route("/remove").post(removeFromCart);

export default router;