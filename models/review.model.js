import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    propertyAddress: {
        type: String,
        required: true,
        maxlength: 200
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    review: {
        title: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
            type: String,
            maxlength: 500
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);