import {Router} from "express";
import { update,getUser,getFromCart, registerUser,logOutUser, getUserOrders,checkSeller } from "../controllers/user.controller.js";
import {loginUser,registerSeller} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getCart").get(getFromCart);
router.route("/update").post(update);
router.route("/getUser").get(getUser);
router.route("/register_seller").post(registerSeller);
router.route("/logout").get(logOutUser);
router.route("/orders").get(getUserOrders);
router.route("/checkSeller").get(checkSeller);

export default router;