import { response } from "express";
import Agent from "../models/agent.model.js";

// create agent
export const createAgent = async (req, res) => {
    try {
        if (!req.body.name) return res.status(400).json({ response: false, message: "Name is required" });
        if (!req.body.email) return res.status(400).json({ response: false, message: "Email is required" });
        if (!req.body.mobileNumber) return res.status(400).json({ response: false, message: "Mobile number is required" });
        if (!req.body.propertiesNumber) return res.status(400).json({ response: false, message: "Property number is required" });

        const existingAgent = await Agent.findOne({
            $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
        });

        if (existingAgent)
            return res.status(400).json({ response: false, message: "Email or mobile number already in use" });

        // Validate propertiesNumber (must be a positive number)
        if (isNaN(+req.body.propertiesNumber) || +req.body.propertiesNumber <= 0)
            return res.status(400).json({ response: false, message: "Properties number must be a positive number" });

        const agent = new Agent(req.body);
        if (req.file) { agent.image = req.file.path; }
        await agent.save();
        res.status(201).json({ response: true, message: "Agent created successfully" });
    } catch (error) {
        return res.status(500).json({ response: false, message: "Something went wrong", error: error.message });
    }
}

// get all agents or agent by id
export const getAgents = async (req, res) => {
    try {
        const { id } = req.query;

        // check id query if exist then get single agent
        if (id) {
            const agent = await Agent.findById(id);
            if (!agent) return res.status(404).json({ response: false, message: "Agent not found" });
            return res.status(200).json(agent);
        }

        // if id does not provide then get all the agents
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const agents = await Agent.find().skip((page - 1) * limit).limit(limit);
        const totalAgent = await Agent.countDocuments();

        res.status(200).json({ response: true, agents, total: totalAgent, page, totalPage: Math.ceil(totalAgent / limit) });
    } catch (error) {
        return res.status(500).json({ response: false, message: "Something went wrong", error: error.message });
    }
}

// delete agent by id
export const deleteAgentById = async (req, res) => {
    try {
        const { id } = req.query;

        const agent = await Agent.findByIdAndDelete(id);
        if (!agent) return res.status(404).json({ response: false, message: "Agent not found" });
        res.status(200).json({ response: true, message: "Agent delete successfully" });
    } catch (error) {
        return res.status(500).json({ response: false, message: "Something went wrong", error: error.message });
    }
}

// update agent by id
export const updateAgentById = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.mobileNumber || !req.body.propertiesNumber) {
            if (!req.body.name) return res.status(400).json({ response: false, message: "Name is required" });
            if (!req.body.email) return res.status(400).json({ response: false, message: "Email is required" });
            if (!req.body.mobileNumber) return res.status(400).json({ response: false, message: "Mobile number is required" });
            if (!req.body.propertiesNumber) return res.status(400).json({ response: false, message: "Property number is required" });
        } else {
            const { id } = req.query;
            const agentBody = req.body;

            const existingAgent = await Agent.findOne({
                $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
            });

            if (existingAgent)
                return res.status(400).json({ response: false, message: "Email or mobile number already in use" });

            // Validate propertiesNumber (must be a positive number)
            if (isNaN(+req.body.propertiesNumber) || +req.body.propertiesNumber <= 0)
                return res.status(400).json({ response: false, message: "Properties number must be a positive number" });

            // find agent by id and update
            const agent = await Agent.findByIdAndUpdate(id, agentBody, { new: true });
            if (!agent) return res.status(404).json({ response: false, message: "Agent not found" });

            res.status(200).json({ response: true, message: "Agent updated successfully", agent });
        }
    } catch (error) {
        return res.status(500).json({ response: false, message: "Something went wrong", error: error.message });
    }
}