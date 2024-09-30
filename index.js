import express from "express";
import mongoose, { version } from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// import routes
import userRoutes from './routes/user.route.js';
import propertyRoutes from "./routes/property.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

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
    .then(console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err.message));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API');
});

app.listen(process.env.PORT, () => {
    console.log("server is running");
});