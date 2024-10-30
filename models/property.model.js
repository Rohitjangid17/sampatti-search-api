import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    featureImage: {
        type: string,
        default: ""
    },
    images: {
        type: [String],
        default: [],
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    squareFoot: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    address: {
        country: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
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
    },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);