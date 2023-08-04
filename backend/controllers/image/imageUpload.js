import { v2 as cloudinary } from 'cloudinary';

export default async function ImageUpload(req, res) {
  try {
    
    const imagesArray = Promise.all(
      req.files.map(async (el) => {
        const upload = await cloudinary.uploader.upload(el.path, {
          folder: 'products',
          width: 2048,
          crop: 'scale',
        });
        return upload.secure_url;
      })
    );



    const result = await imagesArray;

 result
      ? res.status(200).send({
          message: 'Successfully uploaded image',
          url: result,
        })
      : res.status(404).send({ message: 'Cannot find url' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
}
