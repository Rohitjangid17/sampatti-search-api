import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    image: {
        type: String,
        default: ""
    },
    blogInfo: {
        title: {
            type: String,
            required: true,
            maxlength: 100
        },
        tags: {
            type: [String],
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        }
    },
    userInfo: {
        name: { 
            type: String,
            required: true,
            maxlength: 70
        },
        date: {
            type: Date,
            required: true,
        },
        userDetail: {
            type: String,
            required: true,
            maxlength: 400
        }
    }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);