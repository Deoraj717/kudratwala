import {Router} from "express";
import { getFromCart, registerUser } from "../controllers/user.controller.js";
import {loginUser,registerSeller} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getCart").get(getFromCart)
router.route("/register_seller").post(registerSeller);

export default router;