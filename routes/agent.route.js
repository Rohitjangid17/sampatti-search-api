import express from "express";
import { createAgent, deleteAgentById, getAgents, updateAgentById } from "../controllers/agent.controller.js";
import uploadImage from "../services/upload.service.js";

const router = express.Router();

router.post("/", uploadImage.single("image"), createAgent);
router.get("/", getAgents);
router.delete("/", deleteAgentById);
router.put("/", updateAgentById);


export default router;
