import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    images: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    mobileNumber: {
        type: String,
        unique: true,
    },
    propertiesNumber: {
        type: Number,
        required: true,
    },
    address: {
        location: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true,
            trim: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        }
    },
    socialMediaUrl: {
        facebook: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: true
        },
        twitter: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);