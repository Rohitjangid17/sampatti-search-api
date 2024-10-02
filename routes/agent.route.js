import express from "express";
import { createAgent, deleteAgentById, getAgents, updateAgentById } from "../controllers/agent.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createAgent);
router.get("/", getAgents);
router.delete("/", deleteAgentById);
router.put("/", updateAgentById);

export default router;