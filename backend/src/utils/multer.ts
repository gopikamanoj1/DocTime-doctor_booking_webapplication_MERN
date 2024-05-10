import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname); // Get file extension
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

export { upload }; // Export for use in other parts of the app
