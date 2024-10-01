import Agent from "../models/agent.model.js";

// create agent
export const createAgent = async (req, res) => {
    try {
        const agentBody = req.body;
        const agent = new Agent({ ...agentBody });
        await agent.save();
        res.status(201).json({ message: "Agent created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all agents or property by id
export const getAgents = async (req, res) => {
    try {
        const { id } = req.query;

        // check id query if exist then get single agent
        if (id) {
            const agent = await Agent.findById(id);
            if (!agent) return res.status(404).json({ message: "Agent not found" });
            return res.status(200).json(agent);
        }

        // if id does not provide then get all the agents
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const agents = await Agent.find().skip((page - 1) * limit).limit(limit);
        const totalAgent = await Agent.countDocuments();

        res.status(200).json({ agents, total: totalAgent, page, totalPage: Math.ceil(totalAgent) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete agent by id
export const deleteAgentById = async () => {
    try {
        const { id } = req.query;

        const agent = await Agent.findByIdAndDelete(id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });
        res.status(200).json({ message: "Agent delete successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update agent by id
export const updateAgentById = async () => {
    try {
        const { id } = req.query;
        const agentBody = req.body;

        // find agent by id and update
        const agent = await Agent.findByIdAndUpdate(id, agentBody, { new: true });
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        res.status(200).json({ message: "Agent updated successfully", agent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}