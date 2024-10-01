// const agents = await Agent.find({ createdBy: req.userId });
// const properties = await Property.find({ createdBy: req.userId });


import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Store user ID in request
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}