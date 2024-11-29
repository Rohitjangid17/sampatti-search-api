import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        maxlength: 100
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true,
        maxlength: 20
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "on-leave"],
        default: "active",
    },
    agentType: {
        type: String,
        enum: ["residential", "commercial", "rental", "broker"],
        required: true,
    },
    agentRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    languages: {
        type: [String],
        default: ["English"],
    },
    propertiesNumber: {
        type: Number,
        required: true,
        maxlength: 5
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
            match: [/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/, "Please enter a valid URL"],
        },
        instagram: {
            type: String,
            match: [/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/, "Please enter a valid URL"],
        },
        twitter: {
            type: String,
            match: [/^https?:\/\/(www\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/, "Please enter a valid URL"],
        }
    },
    certifications: {
        type: [String],
        default: [],
    },
    experience: {
        type: Number,
        default: 0,
    },
    bio: {
        type: String,
        maxlength: 500,
        trim: true,
    },
    profileViews: {
        type: Number,
        default: 0,
    },
    specializations: {
        type: [String],
        enum: ["apartments", "houses", "offices", "land"],
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    commissionRate: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    // assignedManager: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Manager",
    // },
}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);
