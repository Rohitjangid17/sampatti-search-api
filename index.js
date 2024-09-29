import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from './routes/user.route.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err.message);
});

// Routes
app.use("/api/users", userRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Property Management API');
});

app.listen(process.env.PORT, () => {
    console.log("server is running");
});