import { v2 as cloudinary } from 'cloudinary';

export default async function ImageUpload(req, res) {
  try {
    const imageFile = req.file;

    const image = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'products',
      width: 2048,
      crop: 'scale',
    });

    image
      ? res.status(200).send({
          message: 'Successfully uploaded image',
          url: image.secure_url,
        })
      : res.status(404).send({ message: 'Cannot find url' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
