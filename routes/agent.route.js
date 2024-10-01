import express from "express";
import { createAgent, deleteAgentById, getAgents, updateAgentById } from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/", createAgent);
router.get("/", getAgents);
router.delete("/", deleteAgentById);
router.put("/", updateAgentById);

export default router;