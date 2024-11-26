
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const agentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "agents", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // Allowed file types
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize to 500x500
  },
});

const uploadAgentImage = multer({ storage: agentStorage });

export default uploadAgentImage;


// import multer from "multer";
// import path from "path";

// // Configure Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/agents");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueSuffix);
//   },
// });

// const uploadImage = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Only JPEG and PNG files are allowed"));
//     }
//     cb(null, true);
//   },
// });

// export default uploadImage;