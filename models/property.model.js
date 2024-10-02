import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
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
    propertyFor: {
        type: [String],
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
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);