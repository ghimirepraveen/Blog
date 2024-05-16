require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

async function uploadPhoto(photo: string, userId: string) {
  await cloudinary.api.delete_resources_by_prefix(`rentNow/${userId}/`);
  const result = await cloudinary.uploader.upload(photo, {
    folder: `Blog/${userId}/`,
  });
  return result.secure_url;
}

export default uploadPhoto;
