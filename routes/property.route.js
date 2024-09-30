import express from "express";
import { createProperty, deletePropertyById, getProperties, updatePropertyById } from "../controllers/property.controller.js";

const router = express.Router();

router.post("/", createProperty);
router.get("/", getProperties);
router.delete("/", deletePropertyById);
router.put("/", updatePropertyById);

export default router;