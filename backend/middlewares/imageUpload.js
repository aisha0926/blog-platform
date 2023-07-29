import multer from "multer";

// Set up Multer
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file is an image
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed (jpg, jpeg, png)"));
  }
  cb(null, true);
};

export const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024, // 200 KB limit
  },
  fileFilter: fileFilter,
});
