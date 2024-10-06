import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    viewProperties: {
        type: Number,
        required: true,
        maxlength: 20
    },
    ownProperties: {
        type: Number,
        required: true,
        maxlength: 20
    },
    investProperty: {
        type: Number,
        required: true,
        maxlength: 40
    },
    status: {
        type: String,
        required: true,
        maxlength: 30
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
    },
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);