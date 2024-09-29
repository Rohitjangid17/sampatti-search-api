import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        validate: {
            validator: (v) => {
                return /^\d{10}$/.test(v); // Simple validation for 10-digit numbers
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: 'Role must be either user or admin'
        },
        default: "user", // Default role should be user for new accounts
    },
    profilePicture: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    lastLogin: {
        type: Date,
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: (v) => {
                return v <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);