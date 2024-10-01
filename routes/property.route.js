import express from "express";
import { createProperty, deletePropertyById, getProperties, updatePropertyById } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProperty);
router.get("/", getProperties);
router.delete("/", authMiddleware, deletePropertyById);
router.put("/", authMiddleware, updatePropertyById);

export default router;