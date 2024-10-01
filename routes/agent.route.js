import express from "express";
import { createAgent, deleteAgentById, getAgents, updateAgentById } from "../controllers/agent.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAgent);
router.get("/", getAgents);
router.delete("/", authMiddleware, deleteAgentById);
router.put("/", authMiddleware, updateAgentById);

export default router;