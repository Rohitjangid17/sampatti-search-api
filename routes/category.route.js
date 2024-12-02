import express from "express";
import {
    createCategory,
    deleteCategoryById,
    getCategory,
    updateCategoryById
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.delete("/", deleteCategoryById);
router.put("/", updateCategoryById)

export default router;