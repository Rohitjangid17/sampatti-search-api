import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import multer from 'multer';

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, mobileNumber, password, role, profilePicture, address, lastLogin, dateOfBirth, isVerified, isBlocked } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            mobileNumber,
            password: hashedPassword,
            role,
            profilePicture,
            address,
            lastLogin,
            dateOfBirth,
            isVerified,
            isBlocked
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Signin
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Create a password reset token
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Error sending password reset email:", error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
}

// Update Settings
export const updateSettings = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update the user with the provided updates
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'Settings updated successfully', user });
    } catch (error) {
        console.error('Error updating settings:', error.message); // Log the error message
        res.status(500).json({ error: error.message });
    }
}

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Get List of Users
export const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const users = await User.find().select('-password')
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        res.json({
            users,
            total: totalUsers,
            page,
            totalPages: Math.ceil(totalUsers / limit)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
