import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_secret,
});

export default async function uploadPhoto(photo: any): Promise<string> {
  const resizedBuffer = await sharp(photo.buffer)
    .resize(1024, 1024, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toBuffer();

  const base64Image = resizedBuffer.toString("base64");

  const image = await cloudinary.uploader.upload(
    `data:${photo.mimetype};base64,${base64Image}`,
    {
      resource_type: "image",
      folder: "blogs",
      public_id: `${photo.originalname.split(".")[0]}-${Date.now()}`,
    }
  );

  return image.secure_url;
}
