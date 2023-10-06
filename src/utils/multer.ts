import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}_${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });
