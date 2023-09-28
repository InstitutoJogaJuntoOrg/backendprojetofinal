const multer = require("multer");
const path = require("path");

const uploadsFolder = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsFolder),

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${fileExt}`);
  },
});

const fileHandler = multer({
  storage,
  dest: uploadsFolder,
});

module.exports = fileHandler;
