import express from "express";
import { createAgent, deleteAgentById, getAgents, updateAgentById } from "../controllers/agent.controller.js";
import uploadImage from "../services/upload.service.js";

const router = express.Router();

router.post("/", uploadImage.single("image"), createAgent);
router.get("/", getAgents);
router.delete("/", deleteAgentById);
router.put("/", updateAgentById);

/**
 * @swagger
 * /api/agents:
 *   post:
 *     summary: Create a new agent
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the agent
 *               email:
 *                 type: string
 *                 description: Email of the agent
 *               mobileNumber:
 *                 type: string
 *                 description: Mobile number of the agent
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image of the agent
 *     responses:
 *       201:
 *         description: Agent created successfully
 *       500:
 *         description: Server error
 */

export default router;
