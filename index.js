import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import multer from "multer";

// Import routes
import userRoutes from './routes/user.route.js';
import propertyRoutes from "./routes/property.route.js";
import agentRoutes from "./routes/agent.route.js";
import reviewRoutes from "./routes/review.route.js";
import orderRoutes from "./routes/order.route.js";
import customerRoutes from "./routes/customer.route.js";
import countryRoutes from "./routes/country.route.js";
import stateRoutes from "./routes/state.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use("/uploads", express.static("uploads"));

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
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API');
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});