const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "proyectoBackend",
        allowedFormats: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg", "webp"]
    }
})

const upload = multer({ storage });

module.exports = upload;