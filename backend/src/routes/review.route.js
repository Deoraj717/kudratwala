import { Router } from "express";
import { addReview,getReview } from "../controllers/review.controller.js";

const router = Router();

router.route("/getreview").get(getReview);
router.route("/postreview").post(addReview);
export default router;