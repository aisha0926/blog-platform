import { v2 as cloudinary } from 'cloudinary';

export default async function Cloudinary(req, res, next) {
  try {
    const imageFile = req.file;

    const image = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'products',
      width: 2048,
      crop: 'scale',
    });

    req.cloudinary = image.secure_url;

    next();
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
