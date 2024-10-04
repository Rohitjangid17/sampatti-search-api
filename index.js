import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from 'fs';
import path from 'path';

// Import routes
import userRoutes from './routes/user.route.js';
import propertyRoutes from "./routes/property.route.js";
import agentRoutes from "./routes/agent.route.js";
import reviewRoutes from "./routes/review.route.js"

dotenv.config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Using an absolute path as a fallback
const uploadsDir = path.resolve('uploads/agents');

// Create uploads/agents directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    try {
        fs.mkdirSync(uploadsDir, { recursive: true });
    } catch (error) {
        console.error(error.message);
    }
}

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use("/uploads/agents", express.static(uploadsDir)); // Serve static files

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sampatti Search API",
            version: "1.0.0"
        },
        servers: [
            {
                url: "https://sampatti-search-api.vercel.app/api-docs/"
            }
        ]
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err.message));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/reviews", reviewRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API');
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});