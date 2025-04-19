const cloudinary = require("cloudinary").v2;

const deleteFile = async (url) => {
    const array = url.split("/");
    const name = array.at(-1).split(".")[0]
    
    let public_id= `${array.at(-2)}/${name}`;
    
    await cloudinary.uploader.destroy(public_id);
    console.log("Imagen eliminada en Cloudinary");
}

module.exports = { deleteFile }