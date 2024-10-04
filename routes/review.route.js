import express from "express";
import { createReview, deleteReviewById, getReviews, updateReviewById } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.delete("/", deleteReviewById);
router.put("/", updateReviewById);

export default router;