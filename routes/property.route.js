import express from "express";
import { createProperty, deletePropertyById, getProperties, updatePropertyById } from "../controllers/property.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getProperties);
router.delete("/", deletePropertyById);
router.put("/", updatePropertyById);

export default router;